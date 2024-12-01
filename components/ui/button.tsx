import React from 'react';
import { ChevronLeft } from 'lucide-react'

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  leftIcon?: boolean;
}

export function Button({ children, onClick, leftIcon = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
    >
      {leftIcon && <ChevronLeft className="w-4 h-4" />}
      {children}
    </button>
  );
}