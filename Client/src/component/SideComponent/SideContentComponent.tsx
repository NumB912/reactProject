import React, { CSSProperties } from 'react'

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
  return (
    <div className={`w-full ${classNameContainer}`} style={containerStyle}>
        <div className={`side-label-content ${classNameLabel}`} >
            <p className='font-bold text-2xl' style={labelStyle}>{label}</p>
        </div>
        <div className={`content ${classNameContent}`} style={contentStyle}>
            {children}
        </div>
    </div>
  )
}

export default SideContentComponent