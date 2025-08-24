import React, { useEffect, useState } from "react";
import { Image } from "../model/image";
import IconButton from "./UI/Button/IconButton";
import ReusableSlider from "./SliderComponent/SliderComponent";
import Slider from "react-slick";
import Modal from "./Modal";
import ModelMoreInfoImage from "./Modal.Slide.Image";
import { postPhoto, Review } from "../model/review";

interface ImageSlideProps {
  postPhotos: postPhoto[];
}

const ImageSlide = ({ postPhotos }: ImageSlideProps) => {
  const [postPhoto,setPostPhoto] = useState<postPhoto[]>([])
  const [openImage,setOpenImage] = useState<boolean>(false)
  const [indexMainImage,setIndexMainImage] = useState<number>(0)
  const [images,setImages] = useState<Image[]>([])
  useEffect(() => {

    if(!postPhotos) return;

    setPostPhoto(postPhotos);
    setImages(postPhotos.map((item) => item.images).flat());
  },[])

  function handleNextItem() {
    if (indexMainImage < images.length - 1) {
      setIndexMainImage(indexMainImage + 1);
    }
  }

  function handlePrevItem() {
    if (indexMainImage > 0) {
      setIndexMainImage(indexMainImage - 1);
    }
  }

  return (
    <div className="img-slide">
      {images && (
        <div className="photoMain w-full relative">
          <img
            src={
              images[indexMainImage]?.url ||
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
            onClick={handlePrevItem}
          />
          <IconButton
            icon="arrow-right"
            iconSize={16}
            variant="outline"
            typeButton="text"
            className="p-4 aspect-square absolute m-3 top-1/2 -translate-y-1/2 right-0"
            onClick={handleNextItem}
          />

        <ModelMoreInfoImage isOpen={openImage} onClose={() => { setOpenImage(false) }} reviewsOrPostPhoto={postPhoto} />
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

export default ImageSlide;
