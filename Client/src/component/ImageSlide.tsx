import React, { useEffect, useState } from "react";
import { Image } from "../model/image";
import IconButton from "./UI/Button/IconButton";
import ReusableSlider from "./SliderComponent/SliderComponent";
import Slider from "react-slick";
import Modal from "./Modal";
import ModelMoreInfoImage from "./modalSlideImage";
import { postPhoto, Review } from "../model/review";

interface ImageSlideProps {
  reviewsAndPhotoData:(Review|postPhoto)[];
}

const ImageReviewSlide = ({ reviewsAndPhotoData }: ImageSlideProps) => {
  const [reviewsAndPhoto,setReviews] = useState<(Review|postPhoto)[]>([])
  const [images,setImages] = useState<Image[]>([])
  const [indexMainImage, setIndexMainImage] = useState<number>(0);
  const [openImage,setOpenImage] = useState<boolean>(false)
  const [mainImg,setMainImg] = useState<Image>()
  
useEffect(() => {
  if (!reviewsAndPhotoData) return;

  setReviews(reviewsAndPhotoData);

  const allImages: Image[] = [];
  for (let it of reviewsAndPhotoData) {
    if (it.images && it.images.length > 0) {
      allImages.push(...it.images); 
    }
  }
  setImages(allImages);
}, [reviewsAndPhotoData]); 

useEffect(() => {
  if (images.length > 0) {
    setMainImg(images[indexMainImage]);
  }
}, [images, indexMainImage]);


  function handleNextImage() {
    if (images.length === 0) {
      return;
    }
    setIndexMainImage((prev) => (prev + 1) % images.length);
  }

  function handlePrevImage() {
    if (images.length === 0) return;

    setIndexMainImage((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));
  }


  return (
    <div className="img-slide">
      {images && (
        <div className="photoMain w-full relative">
          <img
            src={
              mainImg?.url ||
              "https://www.kayak.com/rimg/himg/b0/2c/df/leonardo-878836-186563354-395441.jpg?width=1366&height=768&crop=true"
            }
            className="w-full max-h-[700px] min-h-[600px] h-full object-cover rounded-lg"
            onClick={()=>{setOpenImage(!openImage)}}
          />

          <div className="bg-black/80 absolute text-white right-0 bottom-0 p-4 rounded-2xl m-3">
            <p>
              {indexMainImage + 1}/{images.length}
            </p>
          </div>

          <IconButton
            icon="arrow-left"
            iconSize={16}
            variant="outline"
            typeButton="text"
            className="p-4 aspect-square absolute m-3 top-1/2 -translate-y-1/2"
            onClick={handlePrevImage}
          />
          <IconButton
            icon="arrow-right"
            iconSize={16}
            variant="outline"
            typeButton="text"
            className="p-4 aspect-square absolute m-3 top-1/2 -translate-y-1/2 right-0"
            onClick={handleNextImage}
          />

       <ModelMoreInfoImage isOpen={openImage} onClose={()=>{setOpenImage(false)}} reviewsAndPostPhoto={reviewsAndPhoto}/>
        </div>
      )}
      <div className="grid grid-cols-6 max-lg:grid-cols-3 max-sm:hidden gap-2 mt-2">
        {images &&
          images.slice(0, 6).map((image, idx) => (
            <div className="relative" onClick={()=>{setIndexMainImage(idx)}}>
              <img
                key={idx}
                src={
                  image.url ||
                  "https://www.kayak.com/rimg/himg/b0/2c/df/leonardo-878836-186563354-395441.jpg?width=1366&height=768&crop=true"
                }
                className={`max-w-[300px] w-full aspect-square object-cover cursor-pointer`}
              />
              {idx === 5 && images.length > 6 && (
                <div className="w-full h-full absolute top-0 bg-black/50 flex justify-center items-center">
                  <p className="text-white text-2xl font-bold">
                    {images.length - 6}+
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>


    </div>
  );
};

export default ImageReviewSlide;
