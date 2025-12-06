import './App.css'
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import router from './routes/route';


function App() {
 
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
