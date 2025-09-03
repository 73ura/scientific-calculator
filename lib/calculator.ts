/**
 * 関数電卓のコア計算ロジック
 */

export type Operation = '+' | '-' | '*' | '/' | '√' | '^' | '%';

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: Operation | null;
  waitingForNewValue: boolean;
}

export class Calculator {
  private state: CalculatorState = {
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
  };

  /**
   * 現在の表示値を取得
   */
  getDisplay(): string {
    return this.state.display;
  }

  /**
   * 数値を入力
   */
  inputNumber(num: string): void {
    if (this.state.waitingForNewValue) {
      this.state.display = num;
      this.state.waitingForNewValue = false;
    } else {
      this.state.display = this.state.display === '0' ? num : this.state.display + num;
    }
  }

  /**
   * 小数点を入力
   */
  inputDecimal(): void {
    if (this.state.waitingForNewValue) {
      this.state.display = '0.';
      this.state.waitingForNewValue = false;
    } else if (this.state.display.indexOf('.') === -1) {
      this.state.display += '.';
    }
  }

  /**
   * 演算子を設定
   */
  setOperation(operation: Operation): void {
    const currentValue = parseFloat(this.state.display);

    if (this.state.previousValue === null) {
      this.state.previousValue = currentValue;
    } else if (this.state.operation && !this.state.waitingForNewValue) {
      const result = this.calculate();
      this.state.display = this.formatResult(result);
      this.state.previousValue = result;
    } else {
      this.state.previousValue = currentValue;
    }

    this.state.operation = operation;
    this.state.waitingForNewValue = true;
  }

  /**
   * 計算を実行
   */
  calculate(): number {
    const currentValue = parseFloat(this.state.display);
    const previousValue = this.state.previousValue;

    if (previousValue === null || this.state.operation === null) {
      return currentValue;
    }

    switch (this.state.operation) {
      case '+':
        return previousValue + currentValue;
      case '-':
        return previousValue - currentValue;
      case '*':
        return previousValue * currentValue;
      case '/':
        if (currentValue === 0) {
          throw new Error('ゼロで割ることはできません');
        }
        return previousValue / currentValue;
      case '^':
        return Math.pow(previousValue, currentValue);
      case '%':
        if (currentValue === 0) {
          throw new Error('ゼロで割ることはできません');
        }
        return previousValue % currentValue;
      default:
        return currentValue;
    }
  }

  /**
   * 平方根を計算
   */
  calculateSquareRoot(): void {
    const currentValue = parseFloat(this.state.display);
    if (currentValue < 0) {
      throw new Error('負の数の平方根は計算できません');
    }
    const result = Math.sqrt(currentValue);
    this.state.display = this.formatResult(result);
    this.state.waitingForNewValue = true;
  }

  /**
   * 等号を押した時の処理
   */
  equals(): void {
    if (this.state.operation && this.state.previousValue !== null) {
      const result = this.calculate();
      this.state.display = this.formatResult(result);
      this.state.previousValue = null;
      this.state.operation = null;
      this.state.waitingForNewValue = true;
    }
  }

  /**
   * クリア
   */
  clear(): void {
    this.state = {
      display: '0',
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
    };
  }

  /**
   * 最後の入力を削除
   */
  backspace(): void {
    if (this.state.display.length > 1) {
      this.state.display = this.state.display.slice(0, -1);
    } else {
      this.state.display = '0';
    }
  }

  /**
   * 結果をフォーマット
   */
  private formatResult(result: number): string {
    // 非常に大きな数や小さな数の場合は指数表記を使用
    if (Math.abs(result) >= 1e15 || (Math.abs(result) < 1e-10 && result !== 0)) {
      return result.toExponential(10);
    }
    
    // 小数点以下が長すぎる場合は丸める
    const rounded = Math.round(result * 1e10) / 1e10;
    return rounded.toString();
  }
}
