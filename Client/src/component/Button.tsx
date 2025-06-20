import React from "react";

export interface Prop{
    onClick:()=>void;
    children:React.ReactNode;
    className:string
}

const Button = ({ children, onClick, className="" }: Prop) => {

  const combinedClassName = `text-white font-bold bg-black cursor-pointer rounded-full p-3
               hover:scale-95
              transition-all
              duration-300
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

export default Button;
