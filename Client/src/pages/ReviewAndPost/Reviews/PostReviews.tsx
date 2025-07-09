import React from 'react'
import { RatingStar } from '../../../component/UI'
import { DropDown } from '../../../component'

interface ReviewPostProp {
  id?: string
}

const PostReviews = ({ id }: ReviewPostProp) => {
  return (
    <div className="post-review grid gap-3 w-8/10 justify-center items-center p-5">

      <div className="post-review-rule flex flex-col justify-center items-center">
        <p className="post-review__title font-bold text-6xl">
          Share your experience with this service
        </p>

        <div className='flex gap-3 p-4'>
          <div className="post-review__service border border-gray-300 rounded-sm p-4 w-60 m-5 shadow">
            <div className="post-review__service-img">
              <img className='object-cover aspect-square' src="https://dulichdaiviet.vn/uploaded/tour/mien-tay/tourdulichmientay7ngay6dem.jpg" alt="service_img" />
            </div>

            <div className="post-review__service-info">
              <p className="post-review__service-name font-bold">The Mekong River in Southwest Vietnam</p>
              <p className="post-review__service-address">Tiền Giang</p>
            </div>
          </div>

          <div className="post-review__advice-write-review m-5">
            <p className='advice-about-reviews font-bold text-2xl'>How to make a great review</p>
            <div className='post-review__advice-write-review_should-do w-full'>
              <p className='should-do__Title font-bold text-md'><i className="fa-solid fa-circle-check"></i> Do</p>
              <ul className='list-disc pl-5'>
                <li>Get specific - the more details, the better</li>
                <li>Share the good, the bad, and just OK</li>
                <li>Tell us stuff you'd tell your friends</li>
                <li>Sprinkle in a few tips and recs</li>
              </ul>
            </div>
            <div className='post-review__advice-write-review_should-do w-full'>
              <p className='should-do__Title font-bold text-md'><i className="fa-solid fa-circle-xmark"></i> Don't</p>
              <ul className='list-disc pl-5'>
                <li>Use profanity, threats, or personal insults
                </li>
                <li>Include personal info like email or phone numbers
                </li>
                <li>Write in ALL CAPS
                </li>
                <li>Share someone else's experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="post-review-content flex flex-col gap-3 ">
          <div className='post-review-content__rating flex flex-col gap-3'>
              <p className='post-review-content__rating__title font-bold text-2xl'>How would you rate your experience?</p>
              <RatingStar stars={5}/>
          </div>

          <div className='post-review-content__time-signature flex flex-col gap-3'>
            <p className='post-review-content__time-signature__title font-bold text-2xl '>When did you go?</p>
              <DropDown options={["July 2025","June 2025","May 2025"]} onClick={()=>{}}/>
          </div>
      </div>
    </div>

  )
}

export default PostReviews