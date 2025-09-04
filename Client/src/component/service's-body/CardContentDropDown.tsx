import React, { useState } from "react";
import Icon from "../UI/Icon";

type VariantType = "primary" | "secondary" | "outline";
type RoundedType = "sm" | "md" | "lg" | "xl" | "full" | "none";
type PaddingType = "sm" | "md" | "lg" | "xl" | "full" | "none";
interface CardContentDropDownProp {
  children: React.ReactNode;
  title?: React.ReactNode;
  variant?: VariantType;
  padding?: PaddingType;
  rounded?: RoundedType;
  className?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle?: (open: boolean) => void;
}



const PaddingClasses: Record<PaddingType, string> = {
  sm: "p-3",
  md: "p-5",
  lg: "p-8",
  xl: "p-11",
  full: "p-20",
  none: "p-0",
};

const VariantClasses: Record<VariantType, string> = {
  primary: "bg-blue-50 border-blue-300",
  secondary: "bg-gray-50 border-gray-300",
  outline: "bg-white border-gray-300",
};

const RoundedClasses: Record<RoundedType, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
  none: "rounded-none",
};

const CardContentDropDown = ({
  title,
  children,
  variant = "outline",
  padding = "none",
  rounded = "md",
  className,
  defaultOpen = false,
  open,
  onToggle,
}: CardContentDropDownProp) => {
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleToggle = () => {
    if (!isControlled) setInternalOpen(!isOpen);
    onToggle?.(!isOpen);
  };

  return (
    <div
      className={`
        border h-fit
        ${VariantClasses[variant]}
        ${RoundedClasses[rounded]}
        ${PaddingClasses[padding]}
        ${className ?? ""}
      `}
    >
      <div
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => e.key === "Enter" && handleToggle()}
        className={`flex justify-between items-center hover:bg-gray-100 w-full p-2 cursor-pointer ${RoundedClasses[rounded]}`}
      >
        {title && <div className={`text-md font-medium`}>{title}</div>}
        <Icon
          name="caret-down"
          size={13}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default CardContentDropDown;
