import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  styleContainer?: string;
  parentContainerStyle?: string;
  title?: string;
  zIndex?: number;
  tickExit?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  styleContainer,
  parentContainerStyle,
  zIndex = 999,
  title,
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
      className={`fixed inset-0 flex items-center justify-center bg-black/30 w-full h-full ${
        parentContainerStyle ?? ""
      }`}
      style={{ zIndex }}
      onClick={onClose}
    >
      <div
        ref={ref}
        className={`relative bg-white rounded-md shadow-xl overflow-y-auto max-sm:h-full min-sm:max-h-[90vh] max-sm:w-full max-sm:rounded-none p-5 ${
          styleContainer ?? ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center min-sm:hidden">
        <p className="font-bold text-3xl p-2">{title}</p>
        <div className="cursor-pointer p-2 hover:bg-gray-200"            
         onClick={onClose}>     <i
            className="fa-solid fa-x"
          ></i></div>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
