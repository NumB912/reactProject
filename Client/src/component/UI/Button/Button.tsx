import React from "react";

type variant = "contained" | "danger" | "primary" | "secondary" | "outline";
type type = "button" | "submit" | "reset" | undefined;
type rounded = "none" | "sm" | "md" | "lg" | "full";
type size = "sm" | "md" | "lg";
export interface ButtonProp {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  type?: type;
  variant?: variant;
  rounded?: rounded;
  size?: size;
}

const variantClasses: Record<variant, string> = {
  primary: "bg-black text-white hover:bg-black",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-500 hover:bg-gray-100",
  contained: "bg-gray-800 text-white hover:bg-gray-900",
};

const roundedClasses: Record<rounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const sizeClasses: Record<size, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const Button: React.FC<ButtonProp> = ({
  children,
  onClick,
  className = "text-white font-bold hover:bg-gray-800 hover:scale-95 active:scale-90 active:bg-gray-900 bg-black",
  style,
  variant = "primary",
  type = "button",
  rounded = "md",
  size = "md",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer rounded-full hover:scale-95 active:scale-90 transition-all duration-400 ease-in-out ${sizeClasses[size]} ${roundedClasses[rounded]} ${variantClasses[variant]} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
