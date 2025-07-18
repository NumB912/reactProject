import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Tabs, Modal, Button, ButtonBorder } from "../UI";
import { GoogleLogin } from "@react-oauth/google";
import { Login } from "../../pages/Auths/login";
import useStateLogin from "../../store/LoginStore/login_store";
import SideNavBar from "./SideNavBar";
import { Tab } from "../UI/Tabs";
import InputShow from "../UI/Input/InputShow";

const NavBar = () => {
  const [error, setError] = useState(null);
  const { isShow, setShow, isSuccess, setIsSuccess, login, logout } =
    useStateLogin();

  const handleLogout = async () => {
    setIsSuccess(false);
    await logout();
  };

  const navArrs: Tab[] = [
    {
      navigationID: "1",
      contentNavigation: "Home",
      urlNavigation: "/Home",
    },
    {
      navigationID: "2",
      contentNavigation: "About",
      urlNavigation: "/About",
    },
    {
      navigationID: "3",
      contentNavigation: "Services",
      urlNavigation: "/Service",
    },
    {
      navigationID: "4",
      contentNavigation: "Contact",
      urlNavigation: "/Contact",
    },
  ];

  const [modalStep, setModalStep] = useState<
    "loginOptions" | "loginEmail" | "forgotPassword"
  >("loginOptions");

const [password,setPassword] = useState<string>("")

  return (
    <>
      <div className="w-full flex justify-center items-center bg-white sticky top-0 *:text-sm max-sm:hidden p-2 z-50">
        <div className="w-3/12 max-sm:hidden">
          <img src={logo} alt="Logo" className="w-20 m-auto" />
        </div>
        <Tabs
          activeStyle="bg-gray-200 font-semibold"
          elseActiveStyle="hover:bg-gray-200"
          tabs={navArrs}
          classNameContainerStyle="p-2 flex gap-2 justify-center items-center w-6/12 *:font-thin"
          contentNaigationStyle="p-2"
        />
        <div className="h-full flex items-center justify-between w-3/12 max-sm:hidden">
          {/* <img className='object-cover w-10 h-10 rounded-full border border-gray-500 hidden' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Bocchi_the_Rock%21_logo.svg/512px-Bocchi_the_Rock%21_logo.svg.png" alt="User Profile" />*}
            {/* <span className='userName hidden'>Username</span> */}
          <div className="signLog rounded-4xl flex items-center justify-center w-full *:rounded-4xl gap-1 *:text-sm">
            <div
              className={`Logout flex gap-2 w-full ${
                !isSuccess ? "hidden" : ""
              } flex-1`}
            >
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
            <div
              className={`${
                isSuccess ? "hidden" : ""
              } w-full flex justify-center items-center`}
            >
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

              <Modal
                parentContainerStyle="w-[1000px] "
                isOpen={isShow}
                onClose={() => {
                  setShow(false);
                  setModalStep("loginOptions");
                }}
              >
                {modalStep === "loginOptions" && (
                  <div className="bg-white p-10 w-full flex flex-col h-[400px] items-center rounded-2xl">
                    <div className="pb-10">
                      <img
                        src={logo}
                        className="w-28 object-cover aspect-square"
                      />
                      <p className="text-4xl font-bold">The world awaits</p>
                      <p className="text-[10px] text-gray-500">
                        Log in to save your trips, book your next adventure, and
                        unlock exclusive deals.
                      </p>
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm text-center mb-2 px-4">
                        {error}
                      </p>
                    )}

                    <div className="flex flex-col w-full gap-3">
                      <Button
                        className="w-full bg-white border border-gray-400 hover:bg-white active:bg-gray-300"
                        style={{ color: "black", padding: "10px" }}
                        onClick={() => {
                        }}
                      >
                        <div className="w-full flex justify-start items-center *:ml-5">
                          <i className="fa-brands fa-google"></i>
                          <span className="text-sm font-mono">
                            Login with Google
                          </span>
                        </div>
                      </Button>

                      <Button
                        className="w-full bg-white border-gray-400 border hover:bg-white active:bg-gray-300"
                        style={{ color: "black", padding: "10px" }}
                        onClick={() => setModalStep("loginEmail")}
                      >
                        <div className="w-full flex justify-start items-center *:ml-5">
                          <i className="fa-solid fa-envelope ml-auto"></i>
                          <span className="text-sm font-mono">
                            Login with Email
                          </span>
                        </div>
                      </Button>
                    </div>
                  </div>
                )}

                {modalStep === "loginEmail" && (
                  <div className="bg-white p-10 w-full flex flex-col items-center rounded relative">
                    <div className="pb-10 text-center">
                      <img
                        src={logo}
                        className="w-28 object-cover aspect-square mx-auto"
                      />
                      <p className="text-3xl font-bold">The world awaits</p>
                      <p className="text-[10px] text-gray-500">
                        Log in to save your trips, book your next adventure, and
                        unlock exclusive deals.
                      </p>
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm text-center mb-2 px-4">
                        {error}
                      </p>
                    )}

                    <div className="flex flex-col w-full gap-3">
                      <div className="w-full">
                        <p className="font-semibold text-[10px] mb-1">
                          Email address
                        </p>
                        <input
                          className="border border-gray-300 p-1.5 w-full text-sm"
                          type="email"
                          placeholder="Email address"
                        />
                      </div>
                      <div className="w-full">
                        <p className="font-semibold text-[10px] mb-1">
                          Password
                        </p>
                      <InputShow setValue={setPassword} value={password}/>
                      </div>
                      <div className="w-full flex justify-between">
                        <button
                          onClick={() => setModalStep("forgotPassword")}
                          className="text-sm text-gray-600 underline cursor-pointer"
                        >
                          Forgot your password?
                        </button>
                        <Button
                          onClick={() => {}}
                          className="p-[10px] text-[13px] w-1/3"
                        >
                          Login
                        </Button>
                      </div>
                    </div>

                    <ButtonBorder
                      className="absolute top-3 left-3"
                      onClick={() => setModalStep("loginOptions")}
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </ButtonBorder>
                  </div>
                )}

                {modalStep === "forgotPassword" && (
                  <div className="bg-white p-10 w-full flex flex-col items-center rounded relative ">
                    <div className="pb-5">
                      <img
                        src={logo}
                        className="w-28 object-cover aspect-square"
                      />
                      <p className="text-3xl font-bold mb-5">
                        Forgot your password?
                      </p>
                      <p className="text-[10px] text-gray-500">
                        Enter your email address and we’ll send you a link to
                        reset your password.
                      </p>
                    </div>

                    <input
                      className="border border-gray-300 p-2 w-full text-sm mb-4"
                      type="email"
                      placeholder="Enter your email"
                    />
                    <Button className="w-full" onClick={() => {}}>
                      Send Reset Link
                    </Button>
                    <ButtonBorder
                      className="absolute top-3 left-3"
                      onClick={() => setModalStep("loginEmail")}
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </ButtonBorder>
                  </div>
                )}
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
