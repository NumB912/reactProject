import React from "react";

export interface ButtonProp {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties; 
  type?:"button"|"submit"|"reset"|undefined
}

const Button: React.FC<ButtonProp> = ({
  children,
  onClick,
  className ="text-white font-bold bg-black hover:bg-gray-800 hover:scale-95 active:scale-90 active:bg-gray-900",
  style,
  type="button"
}) => {

  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer rounded-full hover:scale-95 active:scale-90 transition-all duration-400 ease-in-out p-2 ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button
