import { createBrowserRouter } from "react-router-dom";
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
      { path: "rentalCar/:rentalCarID/Booking/payment", element: <PaymentCar /> },

      { path: "Tours", element: <Tours/>},
      { path: "Tours/:tourID", element: <TourDetail /> },
      { path: "Tours/:tourID/Booking", element: <BookTour /> },
      { path: "Tours/:tourID/Booking/payment", element: <Payment_Tour /> },


      {
        path: "Profile/:id",
        element: <InfoClient />,
        children: [
          { index: true, element: <Reviews /> },
          { path: "reviews", element: <Reviews /> },
          { path: "photos", element: <Photos /> },
          { path: "trips", element: <Trips /> },
          { path: "favorites", element: <Favorites /> },
          { path: "bookings", element: <Booking /> },
        ],
      },
      {path:"reset-password",element:<ResetPasswordPage/>},
      { path: "WriteReview", element: <FoundServiceReviews /> },
      { path: "WriteReview/:id", element: <PostReviews /> },
      { path: "PostPhotos", element: <SearchServicePostPhoto /> },
      { path: "PostPhotos/:id", element: <PostPhoto /> },
    ],
  },
]);

export default router;
