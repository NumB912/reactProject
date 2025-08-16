import React from "react";

type variant =
  | "contained"
  | "danger"
  | "primary"
  | "secondary"
  | "outline"
  | "custom";
type type = "button" | "submit" | "reset" | undefined;
type rounded = "none" | "sm" | "md" | "lg" | "full";
type typeButton = "filled" | "text" | "custom";

import type { IconName } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon";

export interface IconButtonProp {
  iconSize?: number;
  icon?: IconName;
  color?: string;
  iconColorActive?: string;
  children?: React.ReactNode;
  className?: string;
  typeButton?: typeButton;
  rounded?: rounded;
  active?: boolean;
  variant?: variant;
  onClick?: () => void;
}

const variantClasses: Record<variant, string> = {
  primary: "bg-black text-white hover:bg-black",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-500 hover:bg-gray-100",
  contained: "bg-gray-800 text-white hover:bg-gray-900",
  custom: "",
};

const roundedClasses: Record<rounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const typeClasses: Record<typeButton, string> = {
  filled: "text-white font-bold hover:bg-gray-800 active:bg-gray-900 bg-black",
  text: "text-gray-800 hover:bg-gray-100",
  custom: "",
};

const IconButton = ({
  iconSize = 15,
  icon = "heart",
  children,
  className = "",
  iconColorActive = "text-red-500",
  rounded = "full",
  active = false,
  variant = "primary",
  typeButton = "filled",
  onClick = () => {},
}: IconButtonProp) => {
  return (
    <button
      className={`w-fit flex items-center justify-center gap-2 cursor-pointer 
        ${roundedClasses[rounded]} 
        ${variantClasses[variant]} 
        ${typeClasses[typeButton]}
        ${className}`}
      onClick={onClick}
    >
      <Icon
        name={icon}
        size={iconSize}
        className={active ? iconColorActive : ""}
      />
      {children ? children : ""}
    </button>
  );
};

export default IconButton;
