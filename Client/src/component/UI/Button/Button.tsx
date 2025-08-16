import React from "react";

type variant = "contained" | "danger" | "primary" | "secondary" | "outline";
type type = "button" | "submit" | "reset" | undefined;
type rounded = "none" | "sm" | "md" | "lg" | "full";
type size = "sm" | "md" | "lg";
type typeButton = "filled" | "text" | "custom";

export interface ButtonProp {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  type?: type;
  variant?: variant;
  rounded?: rounded;
  size?: size;
  typeButton?: typeButton;
}

const variantClasses: Record<variant, string> = {
  primary: "bg-black text-white hover:bg-black",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 hover:bg-gray-100",
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

const buttonClasses: Record<typeButton, string> = {
  filled: "text-white font-bold hover:bg-gray-800 active:bg-gray-900 bg-black",
  text: "text-gray-800 hover:bg-gray-100",
  custom: "",
};

const Button: React.FC<ButtonProp> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
  rounded = "full",
  size = "md",
  typeButton = "filled",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer hover:scale-95 active:scale-90 transition-all duration-400 ease-in-out  ${buttonClasses[typeButton]} ${sizeClasses[size]} ${roundedClasses[rounded]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
