import React, { useState } from 'react'
import ButtonBorderSelect from './UI/Button/ButtonBorderSelect';

interface ButtonSelectOneProp{
    setValue:(value:buttonSelectProp)=>void;
    value:buttonSelectProp|undefined
}
export interface buttonSelectProp{
    id:string,
    value:string
}

const ButtonSelectOne = ({setValue,value}:ButtonSelectOneProp) => {

    const buttonArr:buttonSelectProp[] = [{id:"1",value:"Family"},{id:"2",value:"Friends"},{id:"3",value:"Only one"},{id:"4",value:"Couple"},{id:"5",value:"Business"}]

    return (    
        <div className='flex gap-3'>
            {buttonArr.map((item)=>{
                return (
                    <ButtonBorderSelect value={item} onClick={setValue} active={value?.id==item.id}>{item.value} </ButtonBorderSelect>
                )
            })}
        </div>
    )
}

export default ButtonSelectOne