import React, { useEffect } from "react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  styleContainer?: String;
  styleButtonClose?: String;
  parentContainerStyle?: string;
}
const Modal = ({ isOpen, onClose, children,styleButtonClose,styleContainer,parentContainerStyle}: ModalProps) => {
  useEffect(() => {
    console.log(isOpen)
    console.log(document.body.classList)
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;


  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full ${parentContainerStyle}`}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-md shadow-xl overflow-auto ${styleContainer} `}
      >
        <button
          onClick={onClose} 
          className={`absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl ${styleButtonClose}`}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
