import React, { ReactNode } from 'react'
import { buttonSelectProp } from '../../ButtonSelectOne';

interface ButtonBorderProp{
    onClick:(value:buttonSelectProp)=>void;
    className?:string;
    children:React.ReactNode;
    active?:boolean;
    value:buttonSelectProp
}


const ButtonBorder = ({onClick,className,children,active,value}:ButtonBorderProp) => {
  return (
   <button onClick={()=>{
    onClick(value)
   }} className={`min-w-25 p-2 rounded-full cursor-pointer ${className} ${active?"border-black border-2":"border border-gray-200"}`}>
        {children}
   </button>
  )
}

export default ButtonBorder