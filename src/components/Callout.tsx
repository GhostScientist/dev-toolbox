import React from 'react';

interface CalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'success';
  className?: string;
}

export function Callout({ children, type = 'info', className = '' }: CalloutProps) {
  const baseClasses = 'p-4 rounded-lg border-l-4 mb-6';
  const typeClasses = {
    info: 'bg-blue-50 border-blue-400 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    success: 'bg-green-50 border-green-400 text-green-800',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]} ${className}`}>
      {children}
    </div>
  );
}