import React, { ReactNode } from 'react'
import { ButtonSelectProp } from '../../ButtonSelectOne';

interface ButtonBorderSelectProp{
    onClick:(value:ButtonSelectProp)=>void;
    className?:string;
    children:React.ReactNode;
    active?:boolean;
    value:ButtonSelectProp
}


const ButtonBorderSelect = ({onClick,className,children,active,value}:ButtonBorderSelectProp) => {
  return (
   <button onClick={()=>{
    onClick(value)
   }} className={`min-w-14 p-2 rounded-full cursor-pointer hover:bg-gray-200 ${className} ${active?"border-black border-2":"border border-gray-300"}`}>
        {children}
   </button>
  )
}

export default ButtonBorderSelect