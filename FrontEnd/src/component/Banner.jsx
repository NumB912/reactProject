import React from 'react'
import imgPic from '/src/assets/1000_F_819405928_oazziidHQmjeH8dx6CTtIzragN8AbJXa.jpg';
const Banner = () => {
  return (
    <div className='w-full flex justify-center min-lg:order-2 ='>
        <img className="w-full min-lg:w-7/12 min-lg:rounded-2xl" src={imgPic} alt='Banner' />
    </div>
  )
}

export default Banner