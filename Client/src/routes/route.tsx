import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/root";

import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";


import Hotels from "../pages/Service/hotel/Hotels";
import HotelDetail from "../pages/Service/hotel/hotel_detail";
import Book_Hotel from "../pages/Service/hotel/book_hotel";
import Payment_Hotel from "../pages/Service/hotel/Payment_Hotel";


import RentalCars from "../pages/Service/car/RentalCars";
import RentalCarsDetail from "../pages/Service/car/rentalCarsDetail";
import BookCar from "../pages/Service/car/BookCar";
import PaymentCar from "../pages/Service/car/PaymentCar";


import Tours from "../pages/Service/tour/tours";
import TourDetail from "../pages/Service/tour/tourDetail";
import BookTour from "../pages/Service/tour/TourBook";
import Payment_Tour from "../pages/Service/tour/TourPayment";

import InfoClient from "../pages/Auths/InfoClient/profile";
import Reviews from "../pages/Auths/InfoClient/ReviewPost/Reviews";
import Photos from "../pages/Auths/InfoClient/PhotoPost/Photos";
import Trips from "../pages/Auths/InfoClient/Trips";
import Favorites from "../pages/Auths/InfoClient/Favorites";
import Booking from "../pages/Auths/InfoClient/Booking";

import FoundServiceReviews from "../pages/ReviewAndPost/Reviews/SearchServiceReviews";
import PostReviews from "../pages/ReviewAndPost/Reviews/PostReviews";
import SearchServicePostPhoto from "../pages/ReviewAndPost/Photos/SearchServicePostPhoto";
import PostPhoto from "../pages/ReviewAndPost/Photos/PostPhoto";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "Home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },

      // Hotel Routes
      { path: "hotels", element: <Hotels /> },
      { path: "hotels/:hotelID", element: <HotelDetail /> },
      { path: "hotels/:hotelID/booking/:roomID", element: <Book_Hotel /> },
      { path: "hotels/:hotelID/booking/:roomID/payment", element: <Payment_Hotel /> },

      // Car Routes
      { path: "rentalcar", element: <RentalCars /> },
      { path: "rentalCar/:rentalCarID", element: <RentalCarsDetail /> },
      { path: "rentalCar/:rentalCarID/Booking", element: <BookCar /> },
      { path: "rentalCar/:rentalCarID/Booking/payment", element: <PaymentCar /> },

      // Tour Routes
      { path: "Tours", element: <Tours /> },
      { path: "Tours/:tourID", element: <TourDetail /> },
      { path: "Tours/:tourID/Booking", element: <BookTour /> },
      { path: "Tours/:tourID/Booking/payment", element: <Payment_Tour /> },

      // User Profile (nested route)
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

      // Review and Photo Post
      { path: "WriteReview", element: <FoundServiceReviews /> },
      { path: "WriteReview/:id", element: <PostReviews /> },
      { path: "PostPhotos", element: <SearchServicePostPhoto /> },
      { path: "PostPhotos/:id", element: <PostPhoto /> },
    ],
  },
]);

export default router;
