import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from '../calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('初期状態', () => {
    it('初期表示は0である', () => {
      expect(calculator.getDisplay()).toBe('0');
    });
  });

  describe('数値入力', () => {
    it('単一の数値を入力できる', () => {
      calculator.inputNumber('5');
      expect(calculator.getDisplay()).toBe('5');
    });

    it('複数の数値を入力できる', () => {
      calculator.inputNumber('1');
      calculator.inputNumber('2');
      calculator.inputNumber('3');
      expect(calculator.getDisplay()).toBe('123');
    });

    it('0から始まる数値は正しく処理される', () => {
      calculator.inputNumber('0');
      calculator.inputNumber('5');
      expect(calculator.getDisplay()).toBe('5');
    });
  });

  describe('小数点入力', () => {
    it('小数点を入力できる', () => {
      calculator.inputNumber('1');
      calculator.inputDecimal();
      expect(calculator.getDisplay()).toBe('1.');
    });

    it('小数点は一度だけ入力できる', () => {
      calculator.inputNumber('1');
      calculator.inputDecimal();
      calculator.inputDecimal();
      expect(calculator.getDisplay()).toBe('1.');
    });

    it('新しい値の入力時に小数点から始められる', () => {
      calculator.inputNumber('5');
      calculator.setOperation('+');
      calculator.inputDecimal();
      expect(calculator.getDisplay()).toBe('0.');
    });
  });

  describe('四則演算', () => {
    it('足し算ができる', () => {
      calculator.inputNumber('5');
      calculator.setOperation('+');
      calculator.inputNumber('3');
      calculator.equals();
      expect(calculator.getDisplay()).toBe('8');
    });

    it('引き算ができる', () => {
      calculator.inputNumber('10');
      calculator.setOperation('-');
      calculator.inputNumber('3');
      calculator.equals();
      expect(calculator.getDisplay()).toBe('7');
    });

    it('掛け算ができる', () => {
      calculator.inputNumber('4');
      calculator.setOperation('*');
      calculator.inputNumber('5');
      calculator.equals();
      expect(calculator.getDisplay()).toBe('20');
    });

    it('割り算ができる', () => {
      calculator.inputNumber('15');
      calculator.setOperation('/');
      calculator.inputNumber('3');
      calculator.equals();
      expect(calculator.getDisplay()).toBe('5');
    });

    it('小数点を含む計算ができる', () => {
      calculator.inputNumber('1');
      calculator.inputDecimal();
      calculator.inputNumber('5');
      calculator.setOperation('+');
      calculator.inputNumber('2');
      calculator.inputDecimal();
      calculator.inputNumber('3');
      calculator.equals();
      expect(calculator.getDisplay()).toBe('3.8');
    });
  });

  describe('べき乗計算', () => {
    it('べき乗ができる', () => {
      calculator.inputNumber('2');
      calculator.setOperation('^');
      calculator.inputNumber('3');
      calculator.equals();
      expect(calculator.getDisplay()).toBe('8');
    });

    it('小数のべき乗ができる', () => {
      calculator.inputNumber('4');
      calculator.setOperation('^');
      calculator.inputNumber('0');
      calculator.inputDecimal();
      calculator.inputNumber('5');
      calculator.equals();
      expect(calculator.getDisplay()).toBe('2');
    });
  });

  describe('剰余計算', () => {
    it('剰余が計算できる', () => {
      calculator.inputNumber('10');
      calculator.setOperation('%');
      calculator.inputNumber('3');
      calculator.equals();
      expect(calculator.getDisplay()).toBe('1');
    });

    it('小数の剰余が計算できる', () => {
      calculator.inputNumber('5');
      calculator.inputDecimal();
      calculator.inputNumber('5');
      calculator.setOperation('%');
      calculator.inputNumber('2');
      calculator.equals();
      expect(calculator.getDisplay()).toBe('1.5');
    });
  });

  describe('平方根計算', () => {
    it('平方根が計算できる', () => {
      calculator.inputNumber('16');
      calculator.calculateSquareRoot();
      expect(calculator.getDisplay()).toBe('4');
    });

    it('小数の平方根が計算できる', () => {
      calculator.inputNumber('2');
      calculator.inputDecimal();
      calculator.inputNumber('25');
      calculator.calculateSquareRoot();
      expect(calculator.getDisplay()).toBe('1.5');
    });

    it('負の数の平方根はエラーになる', () => {
      calculator.inputNumber('-4');
      expect(() => calculator.calculateSquareRoot()).toThrow('負の数の平方根は計算できません');
    });
  });

  describe('エラーハンドリング', () => {
    it('ゼロ除算でエラーが発生する', () => {
      calculator.inputNumber('5');
      calculator.setOperation('/');
      calculator.inputNumber('0');
      expect(() => calculator.equals()).toThrow('ゼロで割ることはできません');
    });

    it('剰余計算でのゼロ除算でエラーが発生する', () => {
      calculator.inputNumber('5');
      calculator.setOperation('%');
      calculator.inputNumber('0');
      expect(() => calculator.equals()).toThrow('ゼロで割ることはできません');
    });
  });

  describe('連続計算', () => {
    it('連続した計算ができる', () => {
      calculator.inputNumber('5');
      calculator.setOperation('+');
      calculator.inputNumber('3');
      calculator.setOperation('*');
      calculator.inputNumber('2');
      calculator.equals();
      expect(calculator.getDisplay()).toBe('16'); // (5+3)*2 = 16
    });

    it('等号を押さずに演算子を変更できる', () => {
      calculator.inputNumber('5');
      calculator.setOperation('+');
      calculator.inputNumber('3');
      calculator.setOperation('*');
      calculator.inputNumber('2');
      calculator.equals();
      expect(calculator.getDisplay()).toBe('16');
    });
  });

  describe('クリア機能', () => {
    it('クリアで初期状態に戻る', () => {
      calculator.inputNumber('123');
      calculator.setOperation('+');
      calculator.inputNumber('456');
      calculator.clear();
      expect(calculator.getDisplay()).toBe('0');
    });
  });

  describe('バックスペース機能', () => {
    it('バックスペースで最後の文字を削除できる', () => {
      calculator.inputNumber('123');
      calculator.backspace();
      expect(calculator.getDisplay()).toBe('12');
    });

    it('最後の文字を削除すると0になる', () => {
      calculator.inputNumber('5');
      calculator.backspace();
      expect(calculator.getDisplay()).toBe('0');
    });
  });

  describe('大きな数値の処理', () => {
    it('非常に大きな数値は指数表記で表示される', () => {
      calculator.inputNumber('10');
      calculator.setOperation('^');
      calculator.inputNumber('15');
      calculator.equals();
      const result = calculator.getDisplay();
      expect(result).toContain('e+');
    });

    it('非常に小さな数値は指数表記で表示される', () => {
      calculator.inputNumber('1');
      calculator.setOperation('/');
      calculator.inputNumber('1000000000000');
      calculator.equals();
      const result = calculator.getDisplay();
      expect(result).toContain('e-');
    });
  });
});
