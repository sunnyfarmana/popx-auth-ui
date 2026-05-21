import React from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md' }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-xl',
    lg: 'w-20 h-20 text-2xl',
  };

  return (
    <div className="relative inline-block">
      <div className={`${sizeClasses[size]} rounded-full bg-secondary flex items-center justify-center text-primary font-bold overflow-hidden border border-dashed border-primary/50 p-1`}>
          <div className="w-full h-full rounded-full overflow-hidden bg-primary/10 flex items-center justify-center text-primary/80">
              {src ? (
                  <img src={src} alt={name} className="w-full h-full object-cover" />
              ) : (
                  <span>{getInitials(name)}</span>
              )}
          </div>
      </div>
      <div className="absolute bottom-0 right-0 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-sm shadow-primary/50 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
      </div>
    </div>
  );
};
