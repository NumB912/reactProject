import React from 'react'
import Logo from '../../../assets/logo.png'
import { Button, ButtonIcon } from '../../../component/ButtonComponent/Button'
import { FaScrewdriver } from "react-icons/fa";
const InfoClient = () => {
  return (
    <div className='grid grid-cols-[400px_1fr] grid-rows-2 justify-center items-center w-8/10 m-2'>
      <div className='profile row-span-2 flex-col flex border border-gray-200 shadow rounded-md p-5'>
        <div className='image-avatar'>
          <img src={Logo}></img>
        </div>
        <div className='flex justify-between items-center'>
          <div className=''> <p className='font-bold text-2xl'>Bocchi of the rock</p>
            <p className='text-sm text-gray-400'>@bocchi112</p>
          </div>
          <div className='editprofile'>
            <button className='font-semibold text-sm border border-gray-300 p-1 cursor-pointer hover:bg-gray-200 rounded-md'><i className="fa-solid fa-gear"></i> Edit profile </button>
          </div>
        </div>
        <div className='flex *:grow *:p-2 border-b border-gray-200 m-2'>
          <p className='font-bold'>follower: 0</p>
          <p className='font-bold'>following: 0</p>
          <p className='font-bold'>Blog: 0</p>
        </div>
        <div className='flex flex-col gap-3'>
          <p className='font-bold'>My Profile</p>
          <div className='email flex items-center gap-2'>
            <i className="fa-solid fa-envelope"></i>
            <p>ExampleEmail@gmail.com</p>
          </div>
          <div className='city flex items-center gap-2'>
            <i className="fa-solid fa-location-dot"></i>
            <p>new York city</p>
          </div>

          <div className='phone flex items-center gap-2'>
            <i className="fa-solid fa-phone"></i>
            <p>0123456789</p>
          </div>
          <div className='content'>
            <p className='font-bold'>About me</p>
            <p className='line-clamp-4'>Thông tin cơ bản:
              Minh sống tại Đà Nẵng, là lập trình viên backend làm việc từ xa cho một startup Singapore. Anh có một con mèo tên là "Docker".

              Tính cách:
              Trầm tính, hướng nội, cầu toàn. Có xu hướng suy nghĩ nhiều, ít nói nhưng khi đã nói thì sâu sắc. Hay tự dằn vặt vì những chuyện nhỏ nhặt. Rất trung thành và sống có trách nhiệm.
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}

export default InfoClient