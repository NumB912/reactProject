import React from "react";

type Variant = "contained" | "danger" | "primary" | "secondary" | "outline";
type Rounded = "none" | "sm" | "md" | "lg" | "full";
type Size = "sm" | "md" | "lg";
type TypeButton = "filled" | "text" | "custom";

export interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  rounded?: Rounded;
  size?: Size;
  typeButton?: TypeButton;
  disabled?: boolean;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-gray-900",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 text-primary hover:bg-gray-100",
  contained: "bg-gray-800 text-white hover:bg-gray-900",
};

const roundedClasses: Record<Rounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const styleClasses: Record<TypeButton, string> = {
  filled: "font-bold",
  text: "bg-transparent shadow-none hover:bg-gray-100",
  custom: "",
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
  rounded = "full",
  size = "md",
  typeButton = "filled",
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-disabled={disabled}
      aria-busy={loading}
      className={`
        cursor-pointer transition-all duration-300 ease-in-out
        hover:scale-95 active:scale-90
        ${styleClasses[typeButton]}
        ${sizeClasses[size]}
        ${roundedClasses[rounded]}
        ${variantClasses[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
