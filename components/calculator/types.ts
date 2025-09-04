export interface DisplayProps {
  value: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'number' | 'operation' | 'clear';
}

export interface ButtonGridProps {
  onNumber: (num: string) => void;
  onOperation: (op: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onDecimal: () => void;
}
