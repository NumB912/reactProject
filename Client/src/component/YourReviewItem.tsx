import React, { useEffect, useRef, useState } from "react";
import { ButtonBorder } from "./UI";
import StarRatingStatic from "./UI/StarRatingStatic";
import DropDownOutLineItem from "./DropDownComponent/WrapDropDownOutLineItem";
import DropDownSelect from "./DropDownComponent/DropDownSelect";
import PostReviewPhoto from "./postReviewPhoto";
import Photos from "../pages/Auths/InfoClient/Photos";
import { Image } from "../interface/ImagePhotoUrl";
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionRef.current &&
        !optionRef.current.contains(event.target as Node)
      ) {
        setOpenOption(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full border border-gray-300 p-4 rounded-md shadow-md bg-white">
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

        <div className="top-2 right-2 absolute flex gap-3" ref={optionRef}>
          <div
            className={`bg-white *:hover:bg-gray-200 *:p-3 border border-gray-200 cursor-pointer *:text-sm rounded-md ${
              openOption ? "" : "hidden"
            }`}
          >
            <p>Delete your review</p>
            <p>Share your review</p>
            <p>See detail</p>
          </div>
          <ButtonBorder
            className=""
            onClick={() => {
              setOpenOption(!openOption);
            }}
          >
            <i className="fa-solid fa-ellipsis"></i>
          </ButtonBorder>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        <StarRatingStatic starNumber={rating} />
        <p className="text-md font-bold">{titleReview}</p>
        <p className="text-sm text-gray-800">{contentReview}</p>
      </div>

      <PostReviewPhoto
        photos={postReviewPhotos || []}
      />
    </div>
  );
};

export default YourReviewedItem;
