import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
  Logout,
  PersonAdd,
  Reviews,
  Settings,
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
interface MenuProfileProp {
  anchorE1: HTMLDivElement | null;
  open: boolean;
  onClose: () => void;
}
const MenuProfile = ({ anchorE1, open, onClose }: MenuProfileProp) => {
  const { accessToken, logout } = useStateLogin();

  const handleLogout = async () => {
    const lg = await api
      .post(
        "/authentication/logout/",
        {
          accessToken: accessToken,
        },
        {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        logout();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <MenuItem onClick={onClose}>Hồ sơ</MenuItem>
      <MenuItem onClick={onClose}>Viết đánh giá</MenuItem>

      <MenuItem onClick={onClose}>Thêm hình ảnh</MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          handleLogout();
          onClose();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );
};

export default MenuProfile;
