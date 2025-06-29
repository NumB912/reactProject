import './App.css'
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { loadServices} from './pages/Services'
import { loadService } from './pages/Service'
import Service from './pages/Service';
import Root from './pages/Root'
import About from './pages/About'
import Contact from './pages/Contact'
import Hotels from './pages/Hotel/Hotels';
import HotelDetail from './pages/Hotel/hotel_detail';
import RentalCars from './pages/Car/RentalCars';
import RentalCarsDetail from './pages/Car/rentalCarsDetail';
import Book_hotel from './pages/Hotel/book_hotel';
import Payment_Hotel from './pages/Hotel/Payment_Hotel';
import BookCar from './pages/Car/BookCar';
import PaymentCar from './pages/Car/PaymentCar'
import Tour from './pages/Tour/Tours';
import TourDetail from './pages/Tour/TourDetail'
import Book_TOUR from './pages/Tour/TourBook';
import Payment_Tour from './pages/Tour/TourPayment';
import BookTour from './pages/Tour/TourBook';

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
    element:<BookTour/>
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
