import { Bell, LogOut, Menu, Search, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { Link } from "react-router";
import useStateLogin from "../../store/LoginStore/login_store";
import MenuProfile from "../navigation-bar/Menu/MenuProfile";
import { Button } from "../UI";
import logo from "../../assets/logo.png";
import {
  HelpOutline,
  PersonOutline,
  RateReviewOutlined,
  SettingsOutlined,
  StorefrontOutlined,
} from "@mui/icons-material";
import LoginModal from "../../pages/profile/Auth/AuthModal";
interface sideBarProp {
  sideBarOpen: boolean;
  setSidebarOpen: (sideBarOpen: boolean) => void;
}

const Header = ({ sideBarOpen, setSidebarOpen }: sideBarProp) => {
  const { isShow, setShow, user_id } = useStateLogin();
  const [isOpenProfileTab, setIsOpenProfileTab] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const menuItems: {
    label: string;
    icon: React.ReactNode;
    path: string;
    onHandle: () => void;
  }[] = [
    {
      icon: <PersonOutline />,
      label: "Hồ sơ cá nhân",
      path: "/profile",
      onHandle: () => {
        setShow(false);
      },
    },
  ];


  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="w-full flex justify-between items-center bg-white sticky top-0 border-b border-gray-200 shadow-sm text-sm max-md:hidden p-3 z-50">
        <div className="w-[256px] flex justify-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-20" />
          </Link>
        </div>

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

                
              </button>
              <MenuProfile
                open={isOpenProfileTab}
                anchorE1={profileRef.current}
                menuItems={menuItems}
                onClose={() => setIsOpenProfileTab(false)}
              />
            </div>
          ) : (
            <Button className="bg-black text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-all duration-300" onClick={() => setShow(true)}>
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
      <LoginModal open={isShow} onClose={() => setShow(false)} logo={logo} />
    </header>
  );
};

export default Header;
