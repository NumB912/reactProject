import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  styleContainer?: string;
  styleButtonClose?: string;
  parentContainerStyle?: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  styleButtonClose,
  styleContainer,
  parentContainerStyle,
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

  useEffect(() => {
    const handleClose = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
  <div
    className={`fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer
      bg-black/30 transition-all duration-200 w-full ${parentContainerStyle}`}
  >
    <div
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      className={`relative bg-white rounded-md shadow-xl max-h-[90vh] max-sm:w-full ${styleContainer}`}
    >
      {children}
    </div>
  </div>,
  document.body
);
};

export default Modal;
