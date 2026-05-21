import React from 'react';
import classNames from 'classnames';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={classNames(
      "w-full h-full bg-white flex flex-col relative transition-all duration-300 ease-out animate-fade-in-up", 
      className
    )}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={classNames("p-6 sm:p-8 flex-1 flex flex-col h-full overflow-y-auto hide-scrollbar", className)}>
      {children}
    </div>
  );
};
