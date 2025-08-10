import React, { useEffect, useRef, useState } from "react";
import { ButtonBorder } from "./UI";
import StarRatingStatic from "./UI/StarRatingStatic";
import DropDownOutLineItem from "./DropDownComponent/WrapDropDownOutLineItem";
import DropDownSelect from "./DropDownComponent/DropDownSelect";
import PostReviewPhoto from "./postReviewPhoto";
import Photos from "../pages/Auths/InfoClient/PhotoPost/Photos";
import { Image } from "../interface/ImagePhotoUrl";
import Dropdown from "./DropDownComponent/Dropdown";
import DropDownContent from "./DropDownComponent/DropDownContent";
interface YourReviewedItemProps {
  image: string;
  titleService: string;
  titleReview: string;
  address: string;
  rating: number;
  contentReview: string;
  postReviewPhotos?: Image[];
}

const YourReviewedItem: React.FC<YourReviewedItemProps> = ({
  image,
  titleService,
  address,
  rating,
  titleReview,
  contentReview,
  postReviewPhotos,
}) => {
  const [openOption, setOpenOption] = useState<boolean>(false);
  const optionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full border border-gray-100 p-4 rounded-md shadow bg-white">
      <div className="w-full relative flex gap-3">
        <img
          src={image}
          alt={titleService}
          className="object-cover aspect-square w-20"
        />

        <div className="flex flex-col">
          <p className="font-bold text-md line-clamp-2">{titleService}</p>
          <p className="text-sm text-gray-600 line-clamp-2">{address}</p>
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
          <DropDownContent isOpen={openOption} className="w-[200px] left-[-220px]">
            <div
              className={`bg-white *:hover:bg-gray-200 *:p-3 border border-gray-200 cursor-pointer *:text-sm rounded-md ${
                openOption ? "" : "hidden"
              }`}
            >
              <p>Delete your review</p>
              <p>Share your review</p>
              <p>See detail</p>
            </div>
          </DropDownContent>
        </Dropdown>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        <StarRatingStatic starNumber={rating} />
        <div>        <p className="text-md font-bold">{titleReview}</p>
        <p className="text-gray-500 text-sm">10/23/2024</p></div>
        <p className="text-sm text-gray-800">{contentReview}</p>
      </div>

      <PostReviewPhoto photos={postReviewPhotos || []} />
    </div>
  );
};

export default YourReviewedItem;
