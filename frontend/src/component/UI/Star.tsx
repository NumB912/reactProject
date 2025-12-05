import React, { MouseEventHandler } from 'react'
interface StarProp {
    isLight?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void ;
    styleStar?:string;
}
const Star = ({ isLight = false, onMouseEnter,onMouseLeave, onClick,styleStar }: StarProp) => {

    return (
        <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`hover:cursor-pointer *:${styleStar}`}>
            <i className={!isLight ? `fa-solid fa-star` : `fa-solid fa-star text-yellow-400`}></i>
        </div>
    )
}

export default Star