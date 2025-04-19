import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
import Slider from './component/slider'
const router = createBrowserRouter([
  {
    path:'/',
    element:<Slider/>,
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
    path:"Home",
    element:<Home/>,
   },{
    path:"about",
    element:<About/>,
   },{
    path:"contact",
    element:<Contact/>,
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
