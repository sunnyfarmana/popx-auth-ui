import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = true,
  className,
  ...props 
}) => {
  const baseClasses = "font-medium rounded-lg py-3 px-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-purple-700 focus:ring-primary shadow-sm shadow-primary/30",
    secondary: "bg-secondary text-slate-800 hover:bg-purple-300 focus:ring-secondary",
  };

  const classes = classNames(
    baseClasses,
    variants[variant],
    fullWidth ? "w-full" : "",
    className
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
