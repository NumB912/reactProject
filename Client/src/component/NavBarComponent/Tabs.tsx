import React from 'react'
import { Link, NavLink } from 'react-router'

interface TabsProp{
    classNameContainerStyle?:string;
    contentNaigationStyle?:string;
    onClose?:()=>void;
}

const Tabs = ({classNameContainerStyle,contentNaigationStyle,onClose}:TabsProp) => {
    const navArrs = [{
        navigationID: 1,
        contentNavigation: "Home",
        urlNavigation: "/Home"
    },
    {
        navigationID: 2,
        contentNavigation: "About",
        urlNavigation: "/About"
    },
    {
        navigationID: 3,
        contentNavigation: "Services",
        urlNavigation: "/Service"
    },
    {
        navigationID: 4,
        contentNavigation: "Contact",
        urlNavigation: "/Contact"
    },
    ]

    return (
        <div className={`${classNameContainerStyle}`}>
            {
                navArrs.map((item, index) => {
                    return (
                        <NavLink
                            key={index}
                            to={item.urlNavigation}
                            className={({ isActive }) =>
                                `${contentNaigationStyle} ${isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`
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