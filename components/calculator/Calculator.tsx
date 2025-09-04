'use client';

import React, { useState, useEffect } from 'react';
import Display from './Display';
import ButtonGrid from './ButtonGrid';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [expression, setExpression] = useState('0');

  const handleNumber = (num: string) => {
    if (op && prev !== null) {
      // 演算子が入力済みの場合、新しい数字を表示
      setDisplay(display === '0' ? num : display + num);
      setExpression(`${prev} ${op} ${display === '0' ? num : display + num}`);
    } else {
      // 最初の数字入力
      setDisplay(display === '0' ? num : display + num);
      setExpression(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (operation: string) => {
    setPrev(parseFloat(display));
    setDisplay('0');
    setOp(operation);
    setExpression(`${display} ${operation}`);
  };

  const handleEquals = () => {
    if (prev !== null && op) {
      const current = parseFloat(display);
      let result = 0;
      switch (op) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = current !== 0 ? prev / current : NaN; break;
      }
      setDisplay(String(result));
      setExpression(String(result));
      setPrev(null);
      setOp(null);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrev(null);
    setOp(null);
    setExpression('0');
  };

  const handleDecimal = () => {
    if (display.includes('.')) return;
    setDisplay(display + '.');
    if (op && prev !== null) {
      setExpression(`${prev} ${op} ${display}.`);
    } else {
      setExpression(display + '.');
    }
  };

  // キーボード入力の処理
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      // 数字キー (0-9)
      if (key >= '0' && key <= '9') {
        if (op && prev !== null) {
          setDisplay(display === '0' ? key : display + key);
          setExpression(`${prev} ${op} ${display === '0' ? key : display + key}`);
        } else {
          setDisplay(display === '0' ? key : display + key);
          setExpression(display === '0' ? key : display + key);
        }
      }
      // 演算子キー
      else if (key === '+' || key === '-' || key === '*' || key === '/') {
        setPrev(parseFloat(display));
        setDisplay('0');
        setOp(key);
        setExpression(`${display} ${key}`);
      }
      // 小数点
      else if (key === '.') {
        if (display.includes('.')) return;
        setDisplay(display + '.');
        if (op && prev !== null) {
          setExpression(`${prev} ${op} ${display}.`);
        } else {
          setExpression(display + '.');
        }
      }
      // エンターキーまたは=キー
      else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        if (prev !== null && op) {
          const current = parseFloat(display);
          let result = 0;
          switch (op) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': result = current !== 0 ? prev / current : NaN; break;
          }
          setDisplay(String(result));
          setExpression(String(result));
          setPrev(null);
          setOp(null);
        }
      }
      // クリアキー (Escape, Delete, Backspace)
      else if (key === 'Escape' || key === 'Delete' || key === 'Backspace') {
        event.preventDefault();
        setDisplay('0');
        setPrev(null);
        setOp(null);
        setExpression('0');
      }
    };

    // イベントリスナーを追加
    document.addEventListener('keydown', handleKeyPress);

    // クリーンアップ
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [display, prev, op]); // 依存配列に状態を追加



  return (
    <div className="max-w-2xl mx-auto text-center p-8">
      <Display value={expression} />
      <ButtonGrid
        onNumber={handleNumber}
        onOperation={handleOperation}
        onEquals={handleEquals}
        onClear={handleClear}
        onDecimal={handleDecimal}
      />
    </div>
  );
};

export default Calculator;
