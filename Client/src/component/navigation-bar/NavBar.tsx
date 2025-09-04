import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Tabs, Modal, Button, ButtonBorder } from "../UI";
import { GoogleLogin } from "@react-oauth/google";
import { Login } from "../../pages/Auths/login";
import useStateLogin from "../../store/LoginStore/login_store";
import SideNavBar from "./SideNavBar";
import { Tab } from "../UI/Tabs";
import InputShow from "../UI/Input/InputShow";
import DropDownOutLineItem from "../dropdown-component/WrapDropDownOutLineItem";
import Dropdown from "../dropdown-component/Dropdown";
import ListItem from "../UI/ListItem";
import DropDownContent from "../dropdown-component/DropDownContent";

const NavBar = () => {
  const [error, setError] = useState<string | null>(null);
  const { isShow, setShow, isSuccess, setIsSuccess, login, logout } =
    useStateLogin();
  const [password, setPassword] = useState<string>("");
  const [modalStep, setModalStep] = useState<
    "loginOptions" | "loginEmail" | "forgotPassword"
  >("loginOptions");
  const [isOpenProfileTab, setIsOpenProfileTab] = useState<boolean>(false);
  const profileInfo = useRef<HTMLDivElement>(null);
  const handleLogout = async () => {
    await logout();
    setIsSuccess(false);
  };

  const handleSignIn = async (
    refreshToken: string,
    expireDate: string,
    accessToken: string
  ) => {
    try {
      await login(refreshToken, expireDate, accessToken);
      setIsSuccess(true);
      setShow(false);
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  const handleSignUp = () => {
    // Logic for sign up can be added here
    console.log("Sign up clicked");
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
      navigationID: "4",
      contentNavigation: "Contact",
      urlNavigation: "/Contact",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileInfo.current &&
        !profileInfo.current.contains(event.target as Node)
      ) {
        setIsOpenProfileTab(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpenProfileTab]);

  return (
    <>
      <div className="w-full flex justify-center items-center bg-white sticky top-0 border-gray-200 border-b shadow *:text-sm max-md:hidden p-2 z-50">
        <div className=" max-sm:hidden w-[256px]">
          <img src={logo} alt="Logo" className="w-20 m-auto" />
        </div>
        <Tabs
          activeStyle="bg-gray-200 font-semibold"
          elseActiveStyle="hover:bg-gray-200"
          tabs={navArrs}
          classNameContainerStyle="p-2 flex gap-2 justify-center items-center w-8/12 *:font-thin"
          contentNaigationStyle="p-2"
        />
        <div className="h-full flex items-center justify-between max-sm:hidden">
          <div className="flex items-center justify-center w-full *:rounded-4xl gap-1 *:text-sm">
            <div
              className={`profile-info w-full relative cursor-pointer ${
                !isSuccess ? "hidden" : ""
              }`}
              ref={profileInfo}
            >
              <Dropdown
                className=" w-[256px] right-0"
                handleClose={() => setIsOpenProfileTab(false)}
              >
                <div
                  className="img flex items-center "
                  onClick={() => setIsOpenProfileTab(!isOpenProfileTab)}
                >
                  <p className="font-bold">
                    Hi,<p>Welcome !!</p>
                  </p>
                  <img src={logo} className="max-w-25" />
                </div>

                <DropDownContent
                  isOpen={isOpenProfileTab}
                  className="mt-17 left-1/2 -translate-x-1/2"
                >
                  <ListItem>
                    <Link
                      to={`./Profile/123`}
                      onClick={() => setIsOpenProfileTab(false)}
                      className="w-full"
                    >
                      My profile
                    </Link>
                    <Link
                      to={`./Profile/123/reviews`}
                      onClick={() => setIsOpenProfileTab(false)}
                      className="w-full"
                    >
                      Write reviews
                    </Link>
                    <Link
                      to={`./Profile/123/trips`}
                      onClick={() => setIsOpenProfileTab(false)}
                      className="w-full"
                    >
                      My trips
                    </Link>
                    <Link
                      to={`./Profile/123/bookings`}
                      onClick={() => setIsOpenProfileTab(false)}
                      className="w-full"
                    >
                      Post photo
                    </Link>
                    <div className="w-full" onClick={handleLogout}>
                      sign out
                    </div>
                  </ListItem>
                </DropDownContent>
              </Dropdown>
            </div>
            <div
              className={`${
                isSuccess ? "hidden" : ""
              } signIn  w-[256px] flex justify-center items-center `}
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
                parentContainerStyle=""
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
                        rounded="full"
                        variant="outline"
                        typeButton="text"
                        onClick={() => {
                          handleSignIn(
                            "refreshToken",
                            "expireDate",
                            "accessToken"
                          );
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
                        rounded="full"
                        variant="outline"
                        typeButton="text"
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
                        <InputShow setValue={setPassword} value={password} />
                      </div>
                      <div className="w-full flex justify-between">
                        <button
                          onClick={() => setModalStep("forgotPassword")}
                          className="text-sm text-gray-600 underline cursor-pointer"
                        >
                          Forgot your password?
                        </button>
                        <Button
                          onClick={() => {
                            handleSignIn(
                              "refreshToken",
                              "expireDate",
                              "accessToken"
                            );
                          }}
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

      <div className="w-full h-[80px] justify-center items-center bg-white shadow-md sticky top-0 *:text-sm max-md:flex hidden z-30">
        <SideNavBar />
      </div>
    </>
  );
};

export default NavBar;
