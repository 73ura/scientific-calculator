'use client';

import React, { useState } from 'react';
import Display from './Display';
import ButtonGrid from './ButtonGrid';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);

  const handleNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const handleOperation = (operation: string) => {
    setPrev(parseFloat(display));
    setDisplay('0');
    setOp(operation);
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
      setPrev(null);
      setOp(null);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrev(null);
    setOp(null);
  };

  const handleDecimal = () => {
    setDisplay(display.includes('.') ? display : display + '.');
  };



  return (
    <div className="max-w-2xl mx-auto text-center p-8">
      <Display value={display} />
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
