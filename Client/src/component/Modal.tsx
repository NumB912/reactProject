import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
<div
  onClick={onClose}
  className="fixed inset-0 flex items-center justify-center z-50">
  <div className="absolute inset-0 bg-black opacity-30"></div>
  <div
    onClick={(e) => e.stopPropagation()}
    className="relative bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
  >
    <button
      onClick={onClose}
      className="absolute top-5 right-5 text-gray-500 hover:text-red-500 text-xl"
    >
      ×
    </button>
    {children}
  </div>
</div>

  );
};

export default Modal;
