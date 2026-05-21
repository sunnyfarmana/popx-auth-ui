import React, { useState } from 'react';
import classNames from 'classnames';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showRequiredIndicator?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  type = 'text',
  className,
  showRequiredIndicator,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={classNames("flex flex-col mb-4", className)}>
      <div className="relative">
        <input
          ref={ref}
          type={inputType}
          placeholder={props.placeholder || " "}
          className={classNames(
            "peer w-full px-4 py-3.5 rounded-lg bg-white border border-slate-200 focus:outline-none focus:ring-0 focus:border-primary transition-all text-slate-800 text-[14px] font-medium placeholder-slate-300",
            error ? "border-red-500 focus:border-red-500" : ""
          )}
          {...props}
        />
        {label && (
          <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs font-semibold text-slate-400 z-10 transition-all duration-200 pointer-events-none peer-focus:text-primary peer-placeholder-shown:text-slate-400">
            {label}
            {showRequiredIndicator && <span className="text-primary ml-0.5">*</span>}
          </label>
        )}
        {isPassword && (
          <button
            type="button"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <span className="text-red-500 text-[11px] font-medium mt-1 px-1">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
