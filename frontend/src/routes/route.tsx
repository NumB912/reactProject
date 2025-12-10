import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../pages/root";

import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";

import Hotels from "../pages/Service/hotel/Hotels";
import HotelDetail from "../pages/Service/hotel/HotelDetail";
import Book_Hotel from "../pages/Service/hotel/HotelBook";
import Payment_Hotel from "../pages/Service/hotel/HotelPayment";

import RentalCars from "../pages/Service/car/RentalCars";
import RentalCarsDetail from "../pages/Service/car/rentalCarsDetail";
import BookCar from "../pages/Service/car/BookCar";
import PaymentCar from "../pages/Service/car/PaymentCar";

import Tours from "../pages/Service/tour/tours";
import TourDetail from "../pages/Service/tour/tourDetail";
import BookTour from "../pages/Service/tour/TourBook";
import Payment_Tour from "../pages/Service/tour/TourPayment";

import InfoClient from "../pages/profile/InfoClient/profile";

import FoundServiceReviews from "../pages/ReviewAndPost/Reviews/SearchServiceReviews";
import PostReviews from "../pages/ReviewAndPost/Reviews/PostReviews";
import SearchServicePostPhoto from "../pages/ReviewAndPost/Photos/SearchServicePostPhoto";
import PostPhoto from "../pages/ReviewAndPost/Photos/PostPhoto";
import React from "react";
import Reviews from "../pages/profile/InfoClient/ReviewPost/Reviews";
import Photos from "../pages/profile/InfoClient/PhotoPost/Photos";
import Trips from "../pages/profile/InfoClient/Trips";
import Favorites from "../pages/profile/InfoClient/Favorites";
import Booking from "../pages/profile/InfoClient/Booking";
import ResetPasswordPage from "../pages/profile/Auth/resetPassword";
import Become_supplier from "../pages/profile/InfoClient/become_supplier/become_supplier";
import AdminLayout from "../layout/admin/layout";
import { AdminDashboard } from "../component/admin/admin";
import SupplierManagement from "../pages/admin/adminSupplierManagement";
import UserManagement from "../pages/admin/adminUserManagement";
import ServiceManagement from "../pages/admin/serviceManagement";
import ApprovalManagement from "../pages/admin/aproveBecomeSupplier";
import Dashboard from "../pages/admin/dashboard";
import Document_become_supplier from "../pages/profile/InfoClient/document_become_supplier";
import { SupplierDashboard } from "../component/supplier/supplier";
import SupplierLayout from "../layout/supplier/layout";
import ServiceManagementSupplier from "../pages/supplier/serviceManagement";
import ServiceItemManagement from "../pages/supplier/serviceItemManagement";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "Home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },

      { path: "hotels", element: <Hotels /> },
      { path: "hotels/:hotelID", element: <HotelDetail /> },
      { path: "hotels/:hotelID/booking/:roomID", element: <Book_Hotel /> },
      { path: "/payment/:id", element: <Payment_Hotel /> },

      { path: "rentalcar", element: <RentalCars /> },
      { path: "rentalCar/:rentalCarID", element: <RentalCarsDetail /> },
      { path: "rentalCar/:rentalCarID/Booking", element: <BookCar /> },
      {
        path: "rentalCar/:rentalCarID/Booking/payment",
        element: <PaymentCar />,
      },

      { path: "Tours", element: <Tours /> },
      { path: "Tours/:tourID", element: <TourDetail /> },
      { path: "Tours/:tourID/Booking", element: <BookTour /> },
      { path: "Tours/:tourID/Booking/payment", element: <Payment_Tour /> },

      {
        path: "become-supplier",
        element: <Become_supplier />,
      },
      {
        path: "profile/",
        element: <InfoClient />,
        children: [
          { index: true, element: <Booking /> },
          { path: "favorites", element: <Favorites /> },
          { path: "bookings", element: <Booking /> },
           { path: "become_supplier", element: <Document_become_supplier /> },
        ],
      },
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "WriteReview", element: <FoundServiceReviews /> },
      { path: "WriteReview/:id", element: <PostReviews /> },
      { path: "PostPhotos", element: <SearchServicePostPhoto /> },
      { path: "PostPhotos/:id", element: <PostPhoto /> },
    ],
  },

   {
    path: "/admin",
    element: <AdminLayout><AdminDashboard /></AdminLayout>,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <UserManagement /> },
      { path: "suppliers", element: <SupplierManagement /> },
      { path: "services", element: <ServiceManagement /> },
      { path: "approvals", element: <ApprovalManagement /> },
    ],
  },

     {
    path: "/supplier",
    element: <SupplierLayout><SupplierDashboard /></SupplierLayout>,
    children: [
       { index: true, element: <Navigate to="/supplier/services" /> },
      { path: "services", element: <ServiceManagementSupplier /> },
      { path: "serviceItems", element: <ServiceItemManagement /> },
    ],
  },



]);

export default router;
