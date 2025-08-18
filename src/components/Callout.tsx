import React from 'react';
import { cn } from '@/lib/utils';

interface CalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'success';
  className?: string;
}

export function Callout({ children, type = 'info', className = '' }: CalloutProps) {
  const typeClasses = {
    info: 'bg-blue-500/5 border-blue-500/20 text-blue-700 dark:text-blue-300',
    warning: 'bg-yellow-500/5 border-yellow-500/20 text-yellow-700 dark:text-yellow-300',
    success: 'bg-green-500/5 border-green-500/20 text-green-700 dark:text-green-300',
  };

  return (
    <div className={cn(
      'p-4 rounded-lg border-l-4 mb-6',
      typeClasses[type],
      className
    )}>
      {children}
    </div>
  );
}