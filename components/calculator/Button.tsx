import React from 'react';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'number' }) => {
  const getButtonStyle = () => {
    const baseStyle = "w-20 h-20 text-2xl border-2 rounded-lg font-bold flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg";
    
    switch (variant) {
      case 'clear':
        return `${baseStyle} bg-orange-500 text-white border-orange-600 hover:bg-orange-600`;
      case 'operation':
        return `${baseStyle} bg-orange-300 text-white border-orange-500 hover:bg-orange-400`;
      default:
        return `${baseStyle} bg-orange-200 text-orange-800 border-orange-400 hover:bg-orange-300`;
    }
  };

  return (
    <button onClick={onClick} className={getButtonStyle()}>
      {children}
    </button>
  );
};

export default Button;
