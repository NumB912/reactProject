import React, { CSSProperties, useState } from 'react'

interface SideContentComponentProp{
    children:React.ReactNode;
    label?:string;
    classNameContent?:string;
    classNameContainer?:string;
    classNameLabel?:string;
    containerStyle?:CSSProperties;
    labelStyle?:CSSProperties;
    contentStyle?:CSSProperties;
}

const SideContentComponent = ({children,label,containerStyle,labelStyle,contentStyle,classNameContainer,classNameContent,classNameLabel}:SideContentComponentProp) => {
  const [isExtend,setIsExtend] = useState<boolean>(false)

  return (
    <div className={`w-full ${classNameContainer}`} style={containerStyle}>
        <div className={`side-label-content flex items-center justify-between gap-5 ${classNameLabel}`} onClick={()=>{setIsExtend(!isExtend)}} >
            <p className='font-semibold text-md' style={labelStyle}>{label}</p>
            <i className={`fa-solid fa-angle-down transition-transform cursor-pointer ${!isExtend?"rotate-180":"rotate-0"}`}></i>
        </div>
        <div className={`content font-bold text-2xl ${classNameContent} ${!isExtend?"":"hidden"}`} style={contentStyle}>
            {children}
        </div>
    </div>
  )
}

export default SideContentComponent