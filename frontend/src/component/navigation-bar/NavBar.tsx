import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Tabs, Modal, Button } from "../UI";
import { GoogleLogin } from "@react-oauth/google";
import useStateLogin from "../../store/LoginStore/login_store";
import SideNavBar from "./SideNavBar";
import { Tab } from "../UI/Tabs";
import DropDownOutLineItem from "../dropdown-component/WrapDropDownOutLineItem";
import Dropdown from "../dropdown-component/Dropdown";
import DropDownContent from "../dropdown-component/DropDownContent";
import ListItem from "../UI/ListItem";
import LoginModal from "../../pages/profile/Auth/AuthModal"; // Your MUI-based modal
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
} from "@mui/icons-material";
import MenuProfile from "./Menu/MenuProfile";

const NavBar = () => {
  const [modalStep] = useState<
    "loginOptions" | "loginEmail" | "forgotPassword"
  >("loginOptions");

  const { isShow, setShow, user_id } = useStateLogin();
  console.log(user_id)
  const [isOpenProfileTab, setIsOpenProfileTab] = useState(false);
  const profileRef = useRef<HTMLDivElement|null>(null);
  const navArrs: Tab[] = [
    {
      navigationID: "1",
      contentNavigation: "Trang chủ",
      urlNavigation: "/Home",
    },
    {
      navigationID: "2",
      contentNavigation: "Giới thiệu",
      urlNavigation: "/About",
    },
    {
      navigationID: "4",
      contentNavigation: "Liên hệ",
      urlNavigation: "/Contact",
    },
  ];

  return (
    <>
      <div className="w-full flex justify-center items-center bg-white sticky top-0 border-b border-gray-200 shadow-sm text-sm max-md:hidden p-3 z-50">
        <div className="w-[256px] flex justify-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-20" />
          </Link>
        </div>

        <Tabs
          activeStyle="bg-gray-200 font-semibold rounded-full px-4"
          elseActiveStyle="hover:bg-gray-100 rounded-full px-4 transition"
          tabs={navArrs}
          classNameContainerStyle="flex gap-3 justify-center items-center w-8/12"
          contentNaigationStyle="py-2"
        />

        <div className="flex items-center gap-4">
          {user_id ? (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setIsOpenProfileTab(!isOpenProfileTab)}
                className="flex items-center gap-3 hover:bg-gray-100 rounded-full px-4 py-2 transition"
              >
                <div className="text-left">
                  <p className="font-bold text-sm">Hi, Guest</p>
                  <p className="text-xs text-gray-500">Welcome back!</p>
                </div>
                <img
                  src={logo}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover border"
                />
              </button>
              <MenuProfile
                open={isOpenProfileTab}
                anchorE1={profileRef.current}
                onClose={() => setIsOpenProfileTab(false)}
              />
            </div>
          ) : (
            <Button
              onClick={() => setShow(true)}
              className="bg-black text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-all duration-300"
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>

      <div className="h-[80px] flex items-center justify-center bg-white shadow-md sticky top-0 md:hidden z-50">
        <SideNavBar />
      </div>

      <LoginModal open={isShow} onClose={() => setShow(false)} logo={logo} />
    </>
  );
};

export default NavBar;
