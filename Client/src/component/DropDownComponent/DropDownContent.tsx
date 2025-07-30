import React, { Children } from 'react'

interface DropDownContent{
  isOpen:boolean;
  children:React.ReactNode;
  className:string;
}

const DropDownContent = ({isOpen,children,className}:DropDownContent) => {
  return (
            <div
          className={`bg-white absolute mt-5 top-0 border border-gray-300 left-0 rounded z-20 max-md:w-full ${className} ${isOpen ? "" : "hidden"}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >{children}</div>
  )
}

export default DropDownContent