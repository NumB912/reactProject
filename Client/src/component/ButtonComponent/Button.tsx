import React, { ReactNode, useState } from "react";

export interface Button {
  onClick: () => void;
  children: React.ReactNode;
  className?: string
}


export interface ButtonIcon {
  icon?: ReactNode;
  iconColor?: string;
  children?: React.ReactNode;
  containStyle?: string;
  onClick?: () => void;
}

 const Button = ({ children, onClick, className = "" }: Button) => {

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

 const HeartFavorite = ({ style = "" }) => {
  const [favorite, setFavorite] = useState(false);
  return (
    <div
      className={`cursor-pointer flex bg-white p-2 items-center justify-center absolute top-0 right-0 m-2 rounded-full ${style}`}
      onClick={(e) => {
        e.stopPropagation();
        setFavorite(!favorite);
      }}
    >
      {favorite ? (
        <i className="fa-solid fa-heart text-red-500"></i>
      ) : (
        <i className="fa-regular fa-heart"></i>
      )}
    </div>
  );
};


 const ButtonIcon = ({ icon, children, containStyle, iconColor = "*:text-red-500" }: ButtonIcon) => {
  const [isIconStyle, setIsIconStyle] = useState(false);

  const handleSet = () => {
    setIsIconStyle(!isIconStyle)
  }

  return (
    <button className={`rounded-full border border-gray-200 p-3 w-24 flex items-center gap-2 cursor-pointer ${containStyle}`} onClick={handleSet}>
      {icon && <span className={`${isIconStyle ? iconColor : ""}`}>{icon}</span>}
      {children}
    </button>
  )
}


export { Button, ButtonIcon, HeartFavorite };