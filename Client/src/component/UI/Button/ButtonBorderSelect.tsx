import React, { ReactNode } from 'react'
import { buttonSelectProp } from '../../ButtonSelectOne';

interface ButtonBorderSelectProp{
    onClick:(value:buttonSelectProp)=>void;
    className?:string;
    children:React.ReactNode;
    active?:boolean;
    value:buttonSelectProp
}


const ButtonBorderSelect = ({onClick,className,children,active,value}:ButtonBorderSelectProp) => {
  return (
   <button onClick={()=>{
    onClick(value)
   }} className={`min-w-25 p-2 rounded-full cursor-pointer ${className} ${active?"border-black border-2":"border border-gray-200"}`}>
        {children}
   </button>
  )
}

export default ButtonBorderSelect