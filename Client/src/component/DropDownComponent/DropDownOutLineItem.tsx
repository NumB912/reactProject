import React from 'react'
interface DropDownOutLineItemProp{
    children:React.ReactNode
    handleOnClick:()=>void;
}
const DropDownOutLineItem = ({children,handleOnClick}:DropDownOutLineItemProp) => {
  return (
    <div className="relative border w-full p-1.5 flex items-center gap-3 rounded-md cursor-pointer
        min-xl:min-w-48" onClick={handleOnClick}>
            {children}
    </div>
  )
}

export default DropDownOutLineItem