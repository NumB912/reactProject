import React, { useEffect, useRef, useState } from "react";
import { Image } from "../../model/image";
import Icon from "./Icon";
import { IconName } from "@fortawesome/fontawesome-svg-core";

type variant = "primary" | "outline" | "text";
type rounded = "none" | "sm" | "md" | "lg" | "full" ;


interface InputBarProps {
  placeholder?: string;
  onToggle?: () => void;
  onChange?: (value: string) => void;
  variant?: variant;
  rounded?: rounded;
  nameIcon?: IconName;
}

const roundedClasses:Record<rounded, string> = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
}

const variantClasses:Record<variant, string> = {
  primary: "bg-primary text-white placeholder-white px-4 py-2",
  outline: "border border-gray-300 bg-white text-black placeholder-gray-500 pl-10 pr-4 py-3",
  text: "text-black placeholder-gray-500 px-4 py-2",
}

const InputBar: React.FC<InputBarProps> = ({
  placeholder,
  onChange,
  rounded="full",
  variant="outline",
  nameIcon,
  }) => {
  const searchInput = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative w-full" ref={searchInput}>
      <div className=" w-full flex justify-center items-center">
        {nameIcon && <Icon name={nameIcon} size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 `} />}
        <input
          type="text"
          placeholder={placeholder || "Search for a service..."}
          className={`w-full ${roundedClasses[rounded]} ${variantClasses[variant]}`}
          onChange={(e) => {
            onChange?.(e.target.value)
          }}
        />
      </div>
    </div>
  );
};

export default InputBar;
