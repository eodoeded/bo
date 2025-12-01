import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white/20 rounded-none font-inter-light tracking-wide";
  
  const variants = {
    primary: "bg-[#3B3B3B] text-[#E3E3FD] border border-[#FFFFFF4D] hover:bg-[#4B4B4B] shadow-lg shadow-black/20",
    secondary: "bg-transparent text-[#E3E3FD] border border-[#FFFFFF4D] hover:bg-white/5",
    ghost: "bg-transparent text-[#E3E3FD]/60 hover:text-[#E3E3FD] hover:bg-white/5"
  };

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
