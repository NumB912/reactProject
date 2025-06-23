import React, { ReactHTMLElement, ReactNode, useState } from 'react'

interface Props {
    icon: ReactNode;
    iconColor:string;
    text: string;
    textStyle: string;
    containStyle:string;
}

const ButtonSet = ({ icon, text,textStyle,containStyle,iconColor="*:text-red-500"}: Props) => {
    const [isIconStyle,setIsIconStyle] = useState(false);

    const handleSet=()=>{
        setIsIconStyle(!isIconStyle)
    }

    return (
        <button className={`rounded-full border border-gray-200 p-3 w-24 flex items-center gap-2 ${containStyle}`} onClick={handleSet}>
            <span className={`${isIconStyle?iconColor:""}`}>{icon}</span>
            <p className={textStyle}>{text}</p>            
        </button>
    )
}

export default ButtonSet