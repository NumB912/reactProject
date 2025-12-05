import { useState } from 'react';
import React from 'react';
import {
  Box, Drawer, AppBar, Toolbar, Typography, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, CssBaseline, Divider
} from '@mui/material';
import {
  Dashboard, Flight, Hotel, DirectionsCar, ConfirmationNumber,
  People, Business, RoomService, VerifiedUser, Discount, BarChart, Settings, Logout
} from '@mui/icons-material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 260;

const menu = [
  { text: 'Tổng quan', icon: <Dashboard />, path: '/' },
  { text: 'Chuyến bay', icon: <Flight />, path: '/flights' },
  { text: 'Khách sạn', icon: <Hotel />, path: '/hotels' },
  { text: 'Thuê xe', icon: <DirectionsCar />, path: '/cars' },
  { text: 'Tour & Vé', icon: <ConfirmationNumber />, path: '/tours' },
  { text: 'Khách hàng', icon: <People />, path: '/customers' },
  { divider: true },
  { text: 'Nhà cung cấp', icon: <Business />, path: '/suppliers' },
  { text: 'Dịch vụ NCC', icon: <RoomService />, path: '/supplier-services' },
  { text: 'Amenity Service', icon: <VerifiedUser />, path: '/amenities' },
  { text: 'Khuyến mãi', icon: <Discount />, path: '/promotions' },
  { text: 'Báo cáo', icon: <BarChart />, path: '/reports' },
  { text: 'Cài đặt', icon: <Settings />, path: '/settings' },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: '#00b14f' }}>
        <Toolbar>
          <Typography variant="h6" fontWeight={700}>TRAVELOKA ADMIN</Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': { width: drawerWidth, bgcolor: '#1a1a1a', color: '#fff' },
      }}>
        <Toolbar />
        <List>
          {menu.map((item, i) => item.divider ? (
            <Divider key={i} sx={{ bgcolor: '#333', my: 1 }} />
          ) : (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={currentPath === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  '&.Mui-selected': { bgcolor: '#00b14f', '&:hover': { bgcolor: '#009940' } },
                }}
              >
                <ListItemIcon sx={{ color: currentPath === item.path ? '#fff' : '#aaa' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ bgcolor: '#333' }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: '#aaa' }}><Logout /></ListItemIcon>
              <ListItemText primary="Đăng xuất" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f4f6f9', minHeight: '100vh' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}