import React from 'react'
import { Link, NavLink } from 'react-router'

interface TabsProp{
    classNameContainerStyle?:string;
    contentNaigationStyle?:string;
    activeStyle:string;
    elseActiveStyle:string;
    onClose?:()=>void;
    tabs:Tab[];
}

export interface Tab{
    navigationID: string,
    contentNavigation: string,
    urlNavigation: string
}

const Tabs = ({classNameContainerStyle,contentNaigationStyle,tabs,activeStyle,elseActiveStyle,onClose}:TabsProp) => {

    return (
        <div className={`${classNameContainerStyle}`}>
            {
                tabs.map((item, index) => {
                    return (
                        <NavLink
                            key={index}
                            to={item.urlNavigation}
                            className={({ isActive }) =>
                                `${contentNaigationStyle} ${isActive ? activeStyle : elseActiveStyle}`
                            }
                            onClick={()=>{onClose?onClose():()=>{}}}
                        >
                            {item.contentNavigation}
                        </NavLink>
                    )
                })
            }
        </div>
    )
}

export default Tabs