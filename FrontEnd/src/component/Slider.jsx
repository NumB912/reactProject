import React, { useState } from 'react'
import imgItem from '/src/assets/mientay.webp'

import { useRef } from 'react'

const value = 0

const slider = () => {
    const itemsCurrent = useRef([])
    const sliderRef = useRef(null)
    const [index,setindex] = useState(value)
    const items = [
        { img: imgItem, title: 'Tây Nam Bộ' },
        { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe9P7NqdbNWwueNuGx_RhFWZQBA3N48N4BBA&s', title: 'Đông Bắc' },
        { img: 'https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/shutterstock1303493764huge-1677465237560.jpg', title: 'Miền Trung' },
        { img: 'https://kimlientravel.com.vn/upload/image/up-bai-viet/lao-chai-yen-bai.jpg', title: 'Tây Bắc' },
        { img: 'https://kimlientravel.com.vn/upload/image/up-bai-viet/lao-chai-yen-bai.jpg', title: 'Tây Bắc' },
        { img: 'https://kimlientravel.com.vn/upload/image/up-bai-viet/lao-chai-yen-bai.jpg', title: 'Tây Bắc' },
        { img: 'https://kimlientravel.com.vn/upload/image/up-bai-viet/lao-chai-yen-bai.jpg', title: 'Tây Bắc' },
        { img: 'https://kimlientravel.com.vn/upload/image/up-bai-viet/lao-chai-yen-bai.jpg', title: 'Tây Bắc' },
        { img: 'https://kimlientravel.com.vn/upload/image/up-bai-viet/lao-chai-yen-bai.jpg', title: 'Tây Bắc' },
        { img: 'https://kimlientravel.com.vn/upload/image/up-bai-viet/lao-chai-yen-bai.jpg', title: 'Tây Bắc' },
        { img: 'https://kimlientravel.com.vn/upload/image/up-bai-viet/lao-chai-yen-bai.jpg', title: 'Tây Bắc' },
        { img: 'https://kimlientravel.com.vn/upload/image/up-bai-viet/lao-chai-yen-bai.jpg', title: 'Tây Bắc' },
        { img: 'https://kimlientravel.com.vn/upload/image/up-bai-viet/lao-chai-yen-bai.jpg', title: 'Tây Bắc' },
        { img: 'https://kimlientravel.com.vn/upload/image/up-bai-viet/lao-chai-yen-bai.jpg', title: 'Tây Bắc' },
        { img: 'https://kimlientravel.com.vn/upload/image/up-bai-viet/lao-chai-yen-bai.jpg', title: 'Tây Bắc' },
        { img: 'https://kimlientravel.com.vn/upload/image/up-bai-viet/lao-chai-yen-bai.jpg', title: 'Tây Bắc' },
        { img: 'https://kimlientravel.com.vn/upload/image/up-bai-viet/lao-chai-yen-bai.jpg', title: 'Tây Bắc' },
      ];

      function scrollsmooth(i){
        console.log(i)
        if(i>=0&&i<=itemsCurrent.current.length-1){
          itemsCurrent.current[i].scrollIntoView({ behavior: "smooth", block: "start"})
          setindex(i)
          console.log(index>itemsCurrent.current.length-4)
        }  
      }

      function handleNext(){
        if(index <= 0 ){
          scrollsmooth(index+4)
          return;
        }
        scrollsmooth(index+1)}

      function handlePrev(){
        if(index >= items.length-4){
          scrollsmooth(index-4)
          return;
        }
        scrollsmooth(index-1)
      
      }
    


  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>

        <div className='w-3/4 p-3 flex flex-col min-w-96'>

            <div className='w-full py-2'>
                <p className='text-[3vw] max-sm:text-2xl font-bold'>Explore new places</p>
                <p className='text-sm'>The best places to travel</p>
            </div>

            <div className='flex justify-between items-center mb-2'>
          <button
            className='px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 max-lg:hidden'
            onClick={handlePrev}
            disabled={index<0}
          >
            ← Prev
          </button>
          <button
            className='px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 max-lg:hidden'
            onClick={handleNext}
            disabled={index>=items.length-4}
          >
            Next →
          </button>
        </div>

            <div className='flex gap-2 w-ful *:flex-none shrink-0 *:min-w-40 overflow-x-hidden max-lg:overflow-x-scroll *:snap-start snap-x *:w-1/5 relative *:transition-all *:ease-in-out *:duration-200' ref={sliderRef}>
                {
                    items.map((item,index)=>(
                        <div className='flex relative max-sm:min-w-55 max-md:min-w-45' key={index} ref={(el)=>{itemsCurrent.current[index] = el}}>
                            <img src={item.img} alt="" className='w-full h-auto rounded-md object-cover'/>
                            <p className='text-[20px] font-bold text-white absolute bottom-0 left-0 p-2'>{item.title}</p>
                        </div>
                    ))
                }
            </div>
         
        </div>

    </div>
  )
}

export default slider