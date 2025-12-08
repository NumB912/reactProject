import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
  HelpOutline,
  Logout,
  PersonAdd,
  PersonOutline,
  RateReviewOutlined,
  Reviews,
  Settings,
  SettingsOutlined,
  StorefrontOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import api from "../../../../API/api";
import useStateLogin from "../../../store/LoginStore/login_store";
import { useNavigate } from "react-router";
interface MenuProfileProp {
  anchorE1: HTMLDivElement | null;
  open: boolean;
  onClose: () => void;
  menuItems?: {
    label: string;
    icon: React.ReactNode;
    path: string;
    onHandle: () => void;
  }[];
}
const MenuProfile = ({
  anchorE1,
  open,
  onClose,
  menuItems=[],
}: MenuProfileProp) => {
  const { logout } = useStateLogin();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const lg = await api
      .post("/authentication/logout/")
      .then((res) => {
        logout();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!menuItems || menuItems.length == 0) {


    menuItems = [
      {
        icon: <PersonOutline />,
        label: "Hồ sơ cá nhân",
        path: "/profile",
        onHandle: () => {onClose();},
      },
      {
        icon: <RateReviewOutlined />,
        label: "Đánh giá của tôi",
        path: "/my-reviews",
        onHandle: () => {
          onClose();
        },
      },
      {
        icon: <StorefrontOutlined />,
        label: "Trở thành nhà cung cấp",
        path: "/become_supplier",
        onHandle: () => {
          onClose();
        },
      },
      {
        icon: <SettingsOutlined />,
        label: "Cài đặt",
        path: "/settings",
        onHandle: () => {
          onClose();
        },
      },
      {
        icon: <HelpOutline />,
        label: "Trợ giúp & Hỗ trợ",
        path: "/help",
        onHandle: () => {
          onClose();
        },
      },
    ];
  }

  return (
    <Menu
      anchorEl={anchorE1}
      id="account-menu"
      open={open}
      onClose={onClose}
      onClick={onClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {menuItems.map((item) => (
        <MenuItem
          onClick={() => {
            item.onHandle();
            navigate(item.path);
            onClose();
          }}
        >
          {item.label}
        </MenuItem>
      ))}

      <MenuItem
        onClick={() => {
          handleLogout();
          onClose();
        }}
      >
        Đăng xuất
      </MenuItem>
    </Menu>
  );
};

export default MenuProfile;
