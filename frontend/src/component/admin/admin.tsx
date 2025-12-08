import {
  Users,
  Package,
  CheckSquare,
  UserCheck,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  Home,
  Settings,
  BarChart2,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, Router } from "react-router";
import React from "react";
export const AdminDashboard = () => {
  return (
    <div className="p-5">
      <Outlet />
    </div>
  );
};
