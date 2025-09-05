import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Icon from "../UI/Icon";

type Variant = "default" | "primary" | "secondary";
type VariantBehind = "default" | "primary" | "secondary";
type Rounded = "default" | "sm" | "md" | "lg" | "xl" | "full";
type Padding = "none" | "sm" | "md" | "lg" | "xl"
type Breakpoint = "sm"|"md"|"lg"|"xl"|"2xl"|"3xl"|"custom"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  tickExit?: boolean;
  variant?: Variant;
  variantBackground?: VariantBehind;
  rounded?: Rounded;
  padding?:Padding;
}

const VariantClasses: Record<Variant, string> = {
  default: "bg-white shadow-xl",
  primary: "bg-black shadow-xl",
  secondary: "bg-blue shadow-xl",
};

const VariantBehind: Record<Variant, string> = {
  default: "bg-black/50",
  primary: "bg-black/50",
  secondary: "bg-blue/50",
};

const PaddingClasses:Record<Padding,string> = {
  none:"p-0",
  sm:"p-3",
  md:"p-6",
  lg:"p-10",
  xl:"p-20"
}

const RoundedClasses: Record<Rounded, string> = {
  default: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};


const Modal = ({
  isOpen,
  onClose,
  children,
  className = "",
  title,
  tickExit = true,
  variant = "default",
  variantBackground = "default",
  rounded="default",
  padding="md",
}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/30 w-full h-full z-50 ${VariantBehind[variantBackground]}`}
      onClick={onClose}
    >
      <div
        ref={ref}
        className={`relative overflow-y-auto max-sm:h-full min-sm:max-h-[90vh] max-sm:w-full max-sm:rounded-none 
          ${PaddingClasses[padding]}
          ${VariantClasses[variant]}
          ${RoundedClasses[rounded]}
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center">
          <p className="font-bold text-3xl p-2">{title}</p>
          <div
            className="cursor-pointer p-2 hover:bg-gray-200"
            onClick={onClose}
          >
            {tickExit ? <Icon name={"x"} /> : ""}
          </div>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
