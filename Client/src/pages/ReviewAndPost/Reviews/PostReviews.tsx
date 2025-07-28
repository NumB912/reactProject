import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonCircle,
  ButtonIcon,
} from "../../../component/UI";
import { DropDown } from "../../../component";
import ButtonBorder from "../../../component/UI/Button/ButtonBorderSelect";
import ButtonSelectOne, {
  buttonSelectProp,
} from "../../../component/ButtonSelectOne";
import UploadPhotosReview from "../../../component/UploadPhotosReview";
import { Checkbox } from "@mui/material";
import StarRatingComponent from "../../../component/StarRatingComponent";


const PostReviews = () => {
  const [value, setvalue] = useState<buttonSelectProp>();

  return (
    <div className="post-review grid gap-3 w-8/10 justify-center items-center p-5">
      <div className="post-review-rule flex flex-col justify-center items-center">
        <p className="post-review__title font-bold text-6xl">
          Share your experience with this service
        </p>

        <div className="flex gap-3 p-4">
          <div className="post-review__service border border-gray-300 rounded-sm p-4 w-60 m-5 shadow">
            <div className="post-review__service-img">
              <img
                className="object-cover aspect-square"
                src="https://dulichdaiviet.vn/uploaded/tour/mien-tay/tourdulichmientay7ngay6dem.jpg"
                alt="service_img"
              />
            </div>

            <div className="post-review__service-info">
              <p className="post-review__service-name font-bold">
                The Mekong River in Southwest Vietnam
              </p>
              <p className="post-review__service-address text-gray-500">
                Kiên Giang
              </p>
            </div>
          </div>

          <div className="post-review__advice-write-review m-5">
            <p className="advice-about-reviews font-bold text-2xl">
              How to make a great review
            </p>
            <div className="post-review__advice-write-review_should-do w-full">
              <p className="should-do__Title font-bold text-md">
                <i className="fa-solid fa-circle-check"></i> Do
              </p>
              <ul className="list-disc pl-5">
                <li>Get specific - the more details, the better</li>
                <li>Share the good, the bad, and just OK</li>
                <li>Tell us stuff you'd tell your friends</li>
                <li>Sprinkle in a few tips and recs</li>
              </ul>
            </div>
            <div className="post-review__advice-write-review_should-do w-full">
              <p className="should-do__Title font-bold text-md">
                <i className="fa-solid fa-circle-xmark"></i> Don't
              </p>
              <ul className="list-disc pl-5">
                <li>Use profanity, threats, or personal insults</li>
                <li>Include personal info like email or phone numbers</li>
                <li>Write in ALL CAPS</li>
                <li>Share someone else's experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="post-review-content grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-10 *:*:mt-5">
          <div className="post-review-content__rating w-full">
            <p className="post-review-content__rating__title font-bold text-2xl">
              How would you rate your experience?
            </p>
            <StarRatingComponent/>
          </div>

          <div className="post-review-content__title">
            <p className="post-review-content__title_text font-bold text-2xl w-full">
              Your title review
            </p>
            <input
              type="text"
              className="post-review-content__title__input border p-3 rounded-sm w-full"
              placeholder="Give us the gist of your experience..."
            />
          </div>

          <div className="post-review-content__time-signature">
            <p className="post-review-content__time-signature__title font-bold text-2xl ">
              When did you go?
            </p>
            <DropDown
              options={["July 2025", "June 2025", "May 2025"]}
              onClick={() => {}}
            />
          </div>

          <div className="post-review-content">
            <p className="post font-bold text-2xl">Who did you go with?</p>
            <ButtonSelectOne value={value} setValue={setvalue} />
          </div>
        </div>
        <UploadPhotosReview />

        <div className="post-review-content flex gap-10 w-full col-span-2">
          <textarea
            className="min-h-[280px] p-5 border rounded-sm w-1/2"
            placeholder="Tell about your experience..."
          />
          <p className="post-review-content__text-title font-bold text-[4vw] w-1/2">
            Tell us about your experiences
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <div className="check-box *:cursor-pointer flex items-start gap-3">
            <span>
              <input
                type="checkbox"
                name="ti"
                id="td"
                className=" w-5 h-5"
              />
            </span>
            <span className="text-gray-900 text-sm">
              <label htmlFor="td" className="cursor-pointer">
                {" "}
                I certify that this review is based on my own experience and is
                my genuine opinion of this restaurant, and that I have no
                personal or business relationship with this establishment, and
                have not been offered any incentive or payment originating from
                the establishment to write this review. I understand that
                Tripadvisor has a zero-tolerance policy on fake reviews.
              </label>
            </span>
          </div>
          <Button className="w-full" onClick={() => {}}>
            Submit reviews
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostReviews;
