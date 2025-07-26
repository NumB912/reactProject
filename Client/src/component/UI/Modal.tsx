import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  styleContainer?: string;
  parentContainerStyle?: string;
  zIndex?: number; // thêm zIndex
}

const Modal = ({
  isOpen,
  onClose,
  children,
  styleContainer,
  parentContainerStyle,
  zIndex = 999, // mặc định nếu không truyền
}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/30 transition-all duration-200 w-full ${parentContainerStyle ?? ""}`}
      style={{ zIndex:zIndex }}
      onClick={onClose}
    >
      <div
        ref={ref}
        className={`relative bg-white rounded-md shadow-xl max-h-[90vh] max-sm:w-full ${styleContainer ?? ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
