import React, { ReactNode, useState } from "react";

export interface ButtonProp {
  onClick: () => void;
  children: React.ReactNode;
  className?: string
}

 const Button = ({ children, onClick, className = "" }: ButtonProp) => {

  const combinedClassName = `text-white font-bold bg-black cursor-pointer rounded-full p-3
              hover:bg-gray-800
              active:scale-90
              active:bg-gray-900
              hover:scale-95
              transition-all
              duration-400
              ease-in-out
              ${className}`;

  return (
    <button
      onClick={onClick}
      className={combinedClassName}
    >
      {children}
    </button>
  );
};

export default Button

