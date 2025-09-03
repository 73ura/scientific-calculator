import React from 'react';
import { DisplayProps } from './types';

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="mb-5 text-3xl border-2 border-gray-300 p-4 rounded-xl bg-gray-50 font-bold">
      {value}
    </div>
  );
};

export default Display;
