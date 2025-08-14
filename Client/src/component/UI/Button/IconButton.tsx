import React from "react";


type ButtonType = "bordered" | "filled" | "text";
type Rounded = "sm" | "md" | "lg" | "full";

import type { IconName } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon";

export interface IconButtonProp {
  iconSize?: number;
  icon?: IconName;
  color?:string;
  iconColorActive?: string;
  children?: React.ReactNode;
  className?: string;
  buttonStyle?: ButtonType;
  rounded?: Rounded;
  active?: boolean;
  onClick?: () => void;
}

const buttonClasses = {
  bordered: "border border-gray-200",
  filled: "bg-white",
  text: "text-blue-500",
};

const roundedClasses = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const IconButton = ({
  iconSize = 15,
  icon = "heart",
  children,
  className = "",
  iconColorActive = "text-red-500",
  buttonStyle = "bordered",
  rounded = "full",
  active = false,
  color = "text-black",
  onClick = () => {},
}: IconButtonProp) => {
  return (
    <button
      className={`w-fit flex items-center justify-center gap-2 cursor-pointer 
        ${roundedClasses[rounded]} 
        ${buttonClasses[buttonStyle]} 
        ${className}`}
        onClick={onClick}
    >
      <Icon name={icon} size={iconSize} className={active?iconColorActive:""} />
      {children?children:""}
    </button>
  );
};

export default IconButton;
