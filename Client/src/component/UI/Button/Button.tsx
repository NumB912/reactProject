import React from "react";

export interface ButtonProp {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties; // ✅ thêm prop style
}

const Button: React.FC<ButtonProp> = ({
  children,
  onClick,
  className = "",
  style,
}) => {
  const combinedClassName = `
    text-white font-bold bg-black cursor-pointer rounded-full p-3
    hover:bg-gray-800 hover:scale-95
    active:scale-90 active:bg-gray-900
    transition-all duration-300 ease-in-out
    ${className}
  `;

  return (
    <button
      type="button"
      onClick={onClick}
      className={combinedClassName.trim()}
      style={style} // ✅ áp dụng style truyền vào
    >
      {children}
    </button>
  );
};

export default Button
