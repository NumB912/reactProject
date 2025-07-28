import React, { Children } from 'react'

interface DropDownContent{
  isOpen:boolean;
  children:React.ReactNode;
  className:string;
}

const DropDownContent = ({isOpen,children,className}:DropDownContent) => {
  return (
            <div
          className={`${className} ${isOpen ? "" : "hidden"}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >{children}</div>
  )
}

export default DropDownContent