import React, { useEffect } from "react";

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

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full cursor-pointer
        bg-black/30 transition-all duration-200 ${parentContainerStyle}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-md shadow-xl max-h-[90vh] ${styleContainer}`}
      >
        <div className="sticky w-full top-0">
          <button
            onClick={onClose}
            className={`absolute top-1 right-1 text-gray-500 hover:text-red-500 text-xl cursor-pointer ${styleButtonClose}`}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
