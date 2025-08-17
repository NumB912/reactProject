import React, { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { postPhoto, Review } from "../model/review";
import IconButton from "./UI/Button/IconButton";
import StarRatingStatic from "./UI/StarRatingStatic";

interface ModalSlideImageProps {
  onClose: () => void;
  isOpen: boolean;
  reviewsAndPostPhoto: (Review|postPhoto)[];
}

const ModelMoreInfoImage = ({
  onClose,
  isOpen,
  reviewsAndPostPhoto,
}: ModalSlideImageProps) => {
  const [indexReview, setIndexReview] = useState(0);
  const [indexImage, setIndexImage] = useState(0);
  const [indexImgTotal, setIndexImageTotal] = useState(1);
  const item = useMemo(() => reviewsAndPostPhoto[indexReview], [reviewsAndPostPhoto, indexReview]);
  const totalImg = reviewsAndPostPhoto.reduce((total, cur) => {
    return total + (cur.images?.length || 0);
  }, 0);
  const lenReview = reviewsAndPostPhoto.length;
  const lenImg = item?.images?.length ?? 0;
  console.log(reviewsAndPostPhoto)
  const handlePrevImage = () => {
    if (indexImage > 0) {
      setIndexImage((prev) => prev - 1);
      setIndexImageTotal((prev) => prev - 1);
    } else if (indexReview > 0) {
      const prevReview = reviewsAndPostPhoto[indexReview - 1];
      setIndexReview(indexReview - 1);
      setIndexImage(prevReview.images.length - 1);
      setIndexImageTotal((prev) => prev - 1);
    }
  };

  const handleNextImage = () => {
    if (indexImage < lenImg - 1) {
      setIndexImage((prev) => prev + 1);
      setIndexImageTotal((prev) => prev + 1);
    } else if (indexReview < reviewsAndPostPhoto.length - 1) {
      setIndexReview(indexReview + 1);
      setIndexImage(0);
      setIndexImageTotal((prev) => prev + 1);
    }
  };


  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrevImage, handleNextImage]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} tickExit={false}>
      {item && (
        <div className="grid grid-cols-[400px_1fr]">
          <div className="w-full flex flex-col p-3 max-w-sm relative">
            <div className="flex gap-2 w-full items-center">
              <img
                src={
                  item.user?.avatar?.url || "https://via.placeholder.com/45"
                }
                className="rounded-full aspect-square object-cover w-[45px]"
              />
              <div>
                <p className="font-bold text-md">{item.user?.name}</p>
                <p className="text-[12px] text-gray-400">
                  {item.createAt.toDateString()}
                </p>
              </div>
            </div>
      {/* {      <div className="flex flex-col gap-2 mt-3">
              <div>
                <p className="text-md font-semibold">{item.title}</p>
                <StarRatingStatic starNumber={item.rating} />
              </div>
              <p className="text-md text-gray-800">{item.comment}</p>
            </div>} */}

            <div className="flex flex-col gap-2 mt-3">
                <p className="text-lg font-semibold">{item.images[indexImage].description}</p>
                <span className="font-semibold">Date Posted</span><p className="text-sm text-gray-300">{item.createAt.toDateString()}</p>
            </div>
          </div>

          <div className="photoMain w-full relative max-w-3xl">
            <img
              loading="lazy"
              src={
                item.images?.[indexImage]?.url ||
                "https://via.placeholder.com/600x400"
              }
              className="w-full max-h-[700px] min-h-[600px] h-full object-cover rounded-lg"
            />
            <div className="bg-black/80 absolute bottom-0 right-0 m-3 p-3 rounded-lg">
              <p className="text-white">
                {indexImgTotal}/{totalImg}
              </p>
            </div>
            {indexImgTotal-1 >0 && (
              <IconButton
                icon="arrow-left"
                iconSize={16}
                variant="outline"
                typeButton="text"
                onClick={handlePrevImage}
                className="p-4 aspect-square absolute m-3 top-1/2 -translate-y-1/2"
              />
            )}

            {indexImgTotal < totalImg && (
              <IconButton
                icon="arrow-right"
                iconSize={16}
                variant="outline"
                typeButton="text"
                onClick={handleNextImage}
                className="p-4 aspect-square absolute m-3 top-1/2 -translate-y-1/2 right-0"
              />
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ModelMoreInfoImage;
