import React, { useRef, useState } from "react";
import Dropdown from "../../../../component/DropDownComponent/Dropdown";
import { ButtonBorder, Modal } from "../../../../component/UI";
import DropDownContent from "../../../../component/DropDownComponent/DropDownContent";
import StarRatingStatic from "../../../../component/UI/StarRatingStatic";
import PostReviewPhoto from "../../../../component/postReviewPhoto";
import { Image } from "../../../../model/image";
import Prompt from "../../../../component/UI/Prompt";
import DeleteReviews from "./DeleteReviews";
interface YourReviewedItemProps {
  image: string;
  titleService: string;
  titleReview: string;
  address: string;
  rating: number;
  contentReview: string;
  postReviewPhotos?: Image[];
}
const ReviewProfileItem = ({
  image,
  titleService,
  address,
  rating,
  titleReview,
  contentReview,
  postReviewPhotos,
}: YourReviewedItemProps) => {
  const [openOption, setOpenOption] = useState<boolean>(false);
  const [isOpenDeleteReview,setIsOpenDeleteReview] = useState<boolean>(false)
  const optionRef = useRef<HTMLDivElement>(null);
  return (
    <div className="w-full border border-gray-100 p-4 rounded-md shadow bg-white flex flex-col gap-2">
      <div className="flex gap-2 w-full relative">
        <img
          src="https://www.animeherald.com/wp-content/uploads/2024/05/Bocchi-the-Rock-003-20240323.jpg"
          className="rounded-full aspect-square object-cover w-[45px]"
        />
        <div className="">
          <p className="font-bold text-md">Sups</p>
          <p className="text-[12px] text-gray-400">23/5/2025</p>
        </div>
        <Dropdown
          className="absolute right-0 flex"
          handleClose={() => setOpenOption(false)}
        >
          <ButtonBorder
            className=""
            onClick={() => {
              setOpenOption(!openOption);
            }}
          >
            <i className="fa-solid fa-ellipsis"></i>
          </ButtonBorder>
          <DropDownContent isOpen={openOption} className="w-fit left-[-150px]">
            <div
              className={`bg-white *:hover:bg-gray-200 *:p-3 border border-gray-200 cursor-pointer *:text-sm rounded-md ${
                openOption ? "" : "hidden"
              }`}
            >
              <button onClick={() => {setIsOpenDeleteReview(!isOpenDeleteReview)}} className="w-full">
                Delete your review
              </button>
              <button onClick={() => {}} className="w-full">
                Share your review
              </button>
              <button onClick={() => {}} className="w-full">
                See detail
              </button>
            </div>
          </DropDownContent>
        </Dropdown>
      </div>

      <DeleteReviews isOpen={isOpenDeleteReview} setIsOpen={()=>{setIsOpenDeleteReview(false)}} />

      <div className="flex flex-col gap-2 mt-1">
        <div>
          <p className="text-md font-bold">{titleReview}</p>
          <p className="text-gray-500 text-sm">10/23/2024</p>
          <StarRatingStatic starNumber={rating} />
        </div>
        <p className="text-md text-gray-800 line-clamp-3">{contentReview}</p>
      </div>

      <PostReviewPhoto photos={postReviewPhotos || []} />

      <div className="w-fit relative flex gap-3 border border-gray-300 p-3 rounded-md">
        <img
          src={image}
          alt={titleService}
          className="object-cover aspect-square w-20 rounded-md"
        />

        <div className="flex flex-col cursor-pointer">
          <p className="font-bold text-md line-clamp-2 hover:underline">
            {titleService}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">{address}</p>
          <div className="flex gap-2 items-center">
            <p className="text-[13px] text-gray-400">4.0</p>
            <StarRatingStatic starNumber={rating} styleStar="text-[13px]" />
            <p className="text-[13px] text-gray-400">(1.000)</p>
          </div>
        </div>
      </div>

      <div className="flex p-2 gap-2 *:cursor-pointer">
        <button className="flex gap-2 items-center hover:bỏ">
          <i className="fa-solid fa-thumbs-up"></i> Like
        </button>
        <button className="flex gap-2 items-center hover:underline">
          <i className="fa-solid fa-heart"></i> Save
        </button>
      </div>
    </div>
  );
};

export default ReviewProfileItem;
