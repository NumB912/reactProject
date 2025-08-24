import React, { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { postPhoto, Review } from "../model/review";
import IconButton from "./UI/Button/IconButton";
import StarRatingStatic from "./UI/StarRatingStatic";

interface ModalSlideImageProps {
  onClose: () => void;
  isOpen: boolean;
  reviewsOrPostPhoto: (Review | postPhoto)[];
}

const ModelMoreInfoImage = ({
  onClose,
  isOpen,
  reviewsOrPostPhoto,
}: ModalSlideImageProps) => {
  const [index, setIndex] = useState<number>(0);

  const reviewPostMerge = reviewsOrPostPhoto?.flatMap((item) => {
    return item.images.map((image) => ({ parent: item, child: image }));
  });

  function handlePrevImage() {
    setIndex((prev) => (prev === 0 ? reviewPostMerge.length - 1 : prev - 1));
  }

  function handleNextImage() {
    setIndex((prev) => (prev === reviewPostMerge.length - 1 ? 0 : prev + 1));
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} tickExit={false}>
      {reviewPostMerge?.length > 0 && (
        <div className="grid grid-cols-[400px_1fr]">
          <div className="w-full flex flex-col p-3 max-w-sm relative">
            <div className="flex gap-2 w-full items-center">
              <img
                src={
                  reviewPostMerge[index]?.parent.user?.avatar?.url ||
                  "https://via.placeholder.com/45"
                }
                className="rounded-full aspect-square object-cover w-[45px]"
              />
              <div>
                <p className="font-bold text-md">
                  {reviewPostMerge[index]?.parent.user?.name}
                </p>
                <p className="text-[12px] text-gray-400">
                  {reviewPostMerge[index]?.parent.createAt.toDateString()}
                </p>
              </div>
            </div>
            {
              <div className="flex flex-col gap-2 mt-3">
                <div>
                  <p className="text-md font-semibold">{reviewPostMerge[index].parent?.title}</p>
                  {reviewPostMerge[index].parent?.rating && (
                    <StarRatingStatic starNumber={reviewPostMerge[index].parent?.rating} />
                  )}
                </div>
                <p className="text-md text-gray-800">{reviewPostMerge[index].parent?.comment}</p>
              </div>
            }

            <div className="flex flex-col gap-2 mt-3">
              <p className="text-lg font-semibold">
                {reviewPostMerge[index].child.description}
              </p>
              <span className="font-semibold">Date Posted</span>
              <p className="text-sm text-gray-300">
                {reviewPostMerge[index]?.parent.createAt.toDateString()}
              </p>
            </div>
          </div>

          <div className="photoMain w-full relative max-w-3xl">
            <img
              loading="lazy"
              src={
                reviewPostMerge[index]?.child.url ||
                "https://via.placeholder.com/600x400"
              }
              className="w-full max-h-[700px] min-h-[600px] h-full object-cover rounded-lg"
            />
            <div className="bg-black/80 absolute bottom-0 right-0 m-3 p-3 rounded-lg">
              <p className="text-white">
                {index + 1} / {reviewPostMerge.length}
              </p>
            </div>
            {index > 0 && (
              <IconButton
                icon="arrow-left"
                iconSize={16}
                variant="outline"
                typeButton="text"
                onClick={handlePrevImage}
                className="p-4 aspect-square absolute m-3 top-1/2 -translate-y-1/2"
              />
            )}

            {reviewPostMerge.length - 1 > index && (
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
