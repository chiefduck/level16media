import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Button component props interface
 * @property variant - Visual style of the button
 * @property size - Size variant of the button
 * @property icon - Whether to show right arrow icon
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
}

/**
 * Reusable Button component with consistent styling
 * Supports multiple variants, sizes, and optional right arrow icon
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = false,
  className = '',
  ...props
}: ButtonProps) {
  // Base styles applied to all button variants
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200';
  
  // Variant-specific styles
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20',
    secondary: 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
  };

  // Size-specific styles
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {icon && <ArrowRight className="ml-2 h-5 w-5" />}
    </button>
  );
}