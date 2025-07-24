import React, { use, useEffect } from 'react'

interface DropdownProps {
    className?:string 
    children: React.ReactNode;
    handleIsOpen?:()=>void;
    IsOpen?:boolean;
    style?: React.CSSProperties;
}


const Dropdown = ({ className, children, handleIsOpen, IsOpen, style }: DropdownProps) => {
  const dropDownRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className={`absolute ${className} ${IsOpen ? '' : 'hidden'}`} ref={dropDownRef} onClick={(e) => {
      e.stopPropagation();
      if (handleIsOpen) {
        handleIsOpen();
      }
    }} style={style}>
      {children}
    </div>
  )
}

export default Dropdown