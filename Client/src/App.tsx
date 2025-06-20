import './App.css'
import Home from './pages/home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { loadServices} from './pages/Services'
import { loadService } from './pages/Service'
import Services from './pages/Services'
import Service from './pages/Service'
import Root from './pages/root'
import About from './pages/about'
import Contact from './pages/contact'
import Hotels from './pages/hotel/Hotels';
import HotelDetail from './pages/hotel/hotel_detail';
import RentalCars from './pages/car/RentalCars';
import RentalCarsDetail from './pages/car/rentalCarsDetail';
import CheckOut from './pages/car/BookCar';
import Book_hotel from './pages/hotel/book_hotel';
import Payment_Hotel from './pages/hotel/Payment_Hotel';
import BookCar from './pages/car/BookCar';
import PaymentCar from './pages/car/PaymentCar'
import Tour from './pages/tour/tours';
import TourDetail from './pages/tour/tourDetail'
import Book_TOUR from './pages/tour/book_tour';
import Payment_Tour from './pages/tour/Payment_Tour';
import {Login} from './pages/Auths/login';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Root/>,
    children:[{
      path:'services',
      element:<Services/>,
      loader:loadServices
    },
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
    element:<Book_hotel/>
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
    element:<Tour/>
   },{
    path:"Tours/:tourID",
    element:<TourDetail/>
   },{
    path:"Tours/:tourID/Booking",
    element:<Book_TOUR/>
   },{
    path:"Tours/:tourID/Booking/payment",
    element:<Payment_Tour/>
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
