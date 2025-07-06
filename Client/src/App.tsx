import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/root';
import Service, { loadService } from './pages/Service';
import React from 'react';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Hotels from './pages/Service/hotel/Hotels';
import HotelDetail from './pages/Service/hotel/hotel_detail';
import Book_Hotel from './pages/Service/hotel/book_hotel';
import Payment_Hotel from './pages/Service/hotel/Payment_Hotel';
import RentalCars from './pages/Service/car/RentalCars';
import RentalCarsDetail from './pages/Service/car/rentalCarsDetail';
import BookCar from './pages/Service/car/BookCar';
import PaymentCar from './pages/Service/car/PaymentCar';
import TourDetail from './pages/Service/tour/tourDetail';
import BookTour from './pages/Service/tour/TourBook';
import Payment_Tour from './pages/Service/tour/TourPayment';
import InfoClient from './pages/Auths/InfoClient/InfoClient';
import Reviews from './pages/Auths/InfoClient/Reviews';
import Photos from './pages/Auths/InfoClient/Photos';
import Trips from './pages/Auths/InfoClient/Trips';
import Favorites from './pages/Auths/InfoClient/Favorites';
import Booking from './pages/Auths/InfoClient/Booking';
import PostReviews from './pages/ReviewAndPost/Reviews/PostReviews';
import PostPhoto from './pages/ReviewAndPost/Photos/PostPhoto';
import Tours from './pages/Service/tour/tours';
const router = createBrowserRouter([
  {
    path:'/',
    element:<Root/>,
    children:[
   {
    path:"service/:serviceID",
    element:<Service/>,
    loader:loadService
   },
   {
    index:true,
    element:<Home/>,
   },{
    path:"about",
    element:<About/>,
   },{
    path:"contact",
    element:<Contact/>,
   },{
    path:"Home",
    element:<Home/>
   },{
    path:"hotels",
    element:<Hotels/>,
   },{
    path:"hotels/:hotelID",
    element:<HotelDetail/>
   },
    {
    path:"hotels/:hotelID/booking/:RoomID",
    element:<Book_Hotel/>
   },{
    path:"hotels/:hotelID/booking/:roomID/payment",
    element:<Payment_Hotel/>
   },
   {
    path:"rentalcar",
    element:<RentalCars/>
   },{
    path:"rentalCar/:rentalCarID",
    element:<RentalCarsDetail/>
   },{
    path:"rentalCar/:rentalCarID/Booking",
    element:<BookCar/>
   },{
    path:"rentalCar/:rentalCarID/Booking/payment",
    element:<PaymentCar/>
   },{
    path:"Tours",
    element:<Tours/>
   },{
    path:"Tours/:tourID",
    element:<TourDetail/>
   },{
    path:"Tours/:tourID/Booking",
    element:<BookTour/>
   },{
    path:"Tours/:tourID/Booking/payment",
    element:<Payment_Tour/>
   },
   {
    path:"Profile/:id",
    element:<InfoClient/>,
    children:[{
      path:"reviews",
      element:<Reviews/>
    },{
      path:"photos",
      element:<Photos/>
    },
  {
      path:"trips",
      element:<Trips/>
    },
  {
      path:"favorites",
      element:<Favorites/>
    },{
      path:"bookings",
      element:<Booking/>
    }]
   },{
    path:"WriteReview/:id",
    element:<PostReviews/>
   },{
    path:"PostPhotos",
    element:<PostPhoto/>
   }
  ]
  }
])

function App() {
 
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
