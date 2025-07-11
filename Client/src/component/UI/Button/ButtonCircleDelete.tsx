import React from 'react'
interface ButtonCircleDeleteProp{
    className?:string,
    onClick:()=>void;
}
const ButtonCircleDelete = ({className,onClick}:ButtonCircleDeleteProp) => {
  return (
    <button className={`bg-black rounded-full w-7 h-7 cursor-pointer ${className}`} onClick={onClick}>
        <i className="fa-solid fa-xmark text-white"></i>
    </button>
  )
}

export default ButtonCircleDelete