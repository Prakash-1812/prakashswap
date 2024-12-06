import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  icon: Icon,
  variant = 'primary',
  className = '',
}) => {
  const baseStyles = 'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50',
    secondary: 'bg-white/5 hover:bg-white/10 text-white disabled:opacity-50',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};