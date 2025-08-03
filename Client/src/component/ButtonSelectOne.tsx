import React, { useState } from 'react'
import ButtonBorderSelect from './UI/Button/ButtonBorderSelect';

interface ButtonSelectOneProp{
    onChange:(option:ButtonSelectProp)=>void;
    selected:ButtonSelectProp|undefined;
    options:ButtonSelectProp[];
}
export interface ButtonSelectProp{
    id:string,
    value:React.ReactNode,
}

const ButtonSelectOne = ({selected,onChange,options}:ButtonSelectOneProp) => {



    return (    
        <div className='flex gap-3 flex-wrap'>
            {options.map((option)=>{
                return (
                    <ButtonBorderSelect value={option} onClick={()=>{onChange(option)}} active={selected?.id==option.id}>{option.value} </ButtonBorderSelect>
                )
            })}
        </div>
    )
}

export default ButtonSelectOne