import React from 'react';
import Button from './Button';
import { ButtonGridProps } from './types';

const ButtonGrid: React.FC<ButtonGridProps> = ({
  onNumber,
  onOperation,
  onEquals,
  onClear,
  onDecimal
}) => {
  const renderButton = (char: string, variant: 'number' | 'operation' | 'clear' = 'number') => {
    const handleClick = () => {
      if (char === '=') {
        onEquals();
      } else if (char === '.') {
        onDecimal();
      } else if (isNaN(Number(char))) {
        onOperation(char);
      } else {
        onNumber(char);
      }
    };

    return (
      <Button key={char} onClick={handleClick} variant={variant}>
        {char}
      </Button>
    );
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {/* 1行目 */}
      {['7', '8', '9', '/'].map(char => renderButton(char, char === '/' ? 'operation' : 'number'))}
      
      {/* 2行目 */}
      {['4', '5', '6', '*'].map(char => renderButton(char, char === '*' ? 'operation' : 'number'))}
      
      {/* 3行目 */}
      {['1', '2', '3', '-'].map(char => renderButton(char, char === '-' ? 'operation' : 'number'))}
      
      {/* 4行目 */}
      {['0', '.', '+', '='].map(char => {
        if (char === '=') return renderButton(char, 'operation');
        if (char === '.') return renderButton(char, 'number');
        if (char === '+') return renderButton(char, 'operation');
        return renderButton(char, 'number');
      })}
      
      {/* クリアボタン */}
      <Button onClick={onClear} variant="clear">C</Button>
    </div>
  );
};

export default ButtonGrid;
