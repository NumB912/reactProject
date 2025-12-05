import React from 'react'

interface ButtonBorderProp{
    onClick:()=>void,
    className:string,
    children:React.ReactNode
}

const ButtonBorder = ({onClick,children,className}:ButtonBorderProp) => {
  return (
    <button onClick={onClick} className={`hover:bg-gray-300 bg-white aspect-square rounded-full w-8 h-8 cursor-pointer ${className}`}>
        {children}
    </button>
  )
}

export default ButtonBorder