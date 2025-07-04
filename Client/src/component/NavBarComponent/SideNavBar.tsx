import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import logo from "../../../src/assets/logo.png";
import Tabs, { Tab } from './tabs';
const SideNavBar = () => {
    const [isShowsome, setShowsome] = useState(false);

    useEffect(() => {
        if (isShowsome) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isShowsome]);

        const navArrs:Tab[] = [{
        navigationID: "1",
        contentNavigation: "Home",
        urlNavigation: "/Home"
    },
    {
        navigationID:"2",
        contentNavigation: "About",
        urlNavigation: "/About"
    },
    {
        navigationID: "3",
        contentNavigation: "Services",
        urlNavigation: "/Service"
    },
    {
        navigationID: "4",
        contentNavigation: "Contact",
        urlNavigation: "/Contact"
    },
    ]

    return (
        <>
            <button
                className="w-2/12 hover:bg-gray-200 text-center h-full cursor-pointer"
                onClick={() => {
                    setShowsome(!isShowsome);
                    document.body.style.overflow = "hidden"
                }}
            >
                <i className="fa-solid fa-bars"></i>
            </button>

            <div
                className={`w-3/4 max-[400px]:w-full absolute bg-white h-screen flex-col *:text-black *:text-[13px] top-[0px]
                     transition-[left] ease-in-out duration-300 z-50 pt-10
                     ${isShowsome ? "left-0" : "left-[-100%]"
                    }`}
            >
                <button
                    className="absolute right-0 p-3.5 top-0 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                        setShowsome(!isShowsome);

                    }}
                >
                    <i className="fa-solid fa-x"></i>
                </button>

                <Tabs activeStyle='bg-gray-200 font-semibold' elseActiveStyle='hover:bg-gray-200' tabs={navArrs} onClose={() => setShowsome(!isShowsome)} classNameContainerStyle=" flex w-full flex-col border-t border-gray-200 my-1.5" contentNaigationStyle='p-4' />

            </div>

            <div className="w-8/12 m-auto flex justify-center">
                <img src={logo} alt="Logo" className="w-35" />
            </div>

            <Link className="w-2/12 h-[80px] justify-center items-center bg-white sticky top-0 *:text-sm max-sm:flex hidden *:px-2 hover:bg-gray-200" to={""}>
                <i className="fa-solid fa-user"></i>
            </Link>
        </>
    )
}

export default SideNavBar