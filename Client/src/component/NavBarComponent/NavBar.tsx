import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Tabs,Modal,Button } from "../UI";
import { GoogleLogin } from "@react-oauth/google";
import { Login } from "../../pages/Auths/login";
import useStateLogin from "../../store/LoginStore/login_store";
import SideNavBar from "./SideNavBar";
import { Tab } from "../UI/Tabs";

const NavBar = () => {
  const [error, setError] = useState(null);
  const { isShow, setShow, isSuccess, setIsSuccess, login, logout } = useStateLogin();


  const handleLogout = async () => {
    setIsSuccess(false)
    await logout();
  };

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
      <div className="w-full flex justify-center items-center bg-white sticky top-0 *:text-sm max-sm:hidden p-2 z-50">
        <div className="w-3/12 max-sm:hidden">
          <img src={logo} alt="Logo" className="w-20 m-auto" />
        </div>
        <Tabs activeStyle='bg-gray-200 font-semibold' elseActiveStyle='hover:bg-gray-200' tabs={navArrs} classNameContainerStyle="p-2 flex gap-2 justify-center items-center w-6/12 *:font-thin" contentNaigationStyle="p-2"/>
        <div className="h-full flex items-center justify-between w-3/12 max-sm:hidden">
          {/* <img className='object-cover w-10 h-10 rounded-full border border-gray-500 hidden' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Bocchi_the_Rock%21_logo.svg/512px-Bocchi_the_Rock%21_logo.svg.png" alt="User Profile" />*}
            {/* <span className='userName hidden'>Username</span> */}
          <div className="signLog rounded-4xl flex items-center justify-center w-full *:rounded-4xl gap-1 *:text-sm">
            <div className={`Logout flex gap-2 w-full ${!isSuccess ? "hidden" : ""} flex-1`}>
              <Button
                className={`bg-black text-center *:px-10
                w-1/2
             hover:scale-90
             hover:bg-black
              duration-300
              ease-in-out
            text-white
              font-bold max-w-30`}
                onClick={handleLogout}
              >
                Log out
              </Button>
              <div className="img w-1/2">
                <img src={logo} className="max-w-20" />
              </div>
            </div>
            {/* <Link className=' bg-black text-center w-1/2
             hover:scale-90
             hover:bg-black
              transition-all
              duration-300
              ease-in-out
            text-white
              font-bold
             '>
                Sign up
            </Link> */}
            {/* <Link className=' bg-black text-center w-1/2
             hover:scale-90
             hover:bg-black
              transition-all
              duration-300
              ease-in-out
            text-white
              font-bold
             '>
                Log in
            </Link> */}
            <div className={`${isSuccess ? "hidden" : ""} w-full flex justify-center items-center`}>
              <Button
                className="bg-black text-center w-full max-w-30
              hover:scale-90
             hover:bg-black
              transition-all
              duration-300
              ease-in-out
            text-white
              font-bold"
                onClick={() => {
                  setShow(true);
                }}
              >
                Log in
              </Button>

              <Modal parentContainerStyle={'w-[1000px]'} isOpen={isShow} onClose={() => setShow(false)}>
                <div className="bg-white p-3 w-full flex flex-col h-[300px] items-center justify-center">
                  <img src={logo} className="w-32" />
                  <div className="title text-lg font-semibold my-3">
                    Welcome to Login
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm text-center mb-2 px-4">
                      {error}
                    </p>
                  )}
                  <Login />
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[80px] justify-center items-center bg-white shadow-md sticky top-0 *:text-sm max-sm:flex hidden z-30">
        <SideNavBar />
      </div>
    </>
  );
};

export default NavBar;
