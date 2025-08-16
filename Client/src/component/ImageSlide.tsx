import React, { useEffect, useState } from "react";
import { Image } from "../model/image";


interface ImageSlideProps {
    images: Image[];
}

const ImageSlide = ({ images }: ImageSlideProps) => {
    const [mainImg,setMainImage] = useState<string|null>(null);
    
  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0].url);
    }
  },[images])

  return (
    <div className="img-slide">
      <div className="photoMain w-full h-[600px] overflow-hidden">
        <img
          src={
            mainImg || "https://www.kayak.com/rimg/himg/b0/2c/df/leonardo-878836-186563354-395441.jpg?width=1366&height=768&crop=true"
          }
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

     <div className="grid grid-cols-4 w-full gap-2 mt-5">
        <div className="traveler overflow-hidden">
          <img
            src={
              "https://www.kayak.com/rimg/himg/b0/2c/df/leonardo-878836-186563354-395441.jpg?width=1366&height=768&crop=true"
            }
            className="max-w-[300px] h-full object-cover rounded-lg"
          />
        </div>
        <div className="RoomSuite overflow-hidden">
          <img
            src={
              "https://content.r9cdn.net/rimg/himg/b7/96/b8/leonardo-878836-186563362-407114.jpg?width=500&height=350&xhint=1620&yhint=1000&crop=true"
            }
            className="max-w-[300px] h-full object-cover rounded-lg"
          />
        </div>
        <div className="video overflow-hidden">
          <img
            src={
              "https://images.trvl-media.com/lodging/9000000/8090000/8082700/8082639/33e6873e.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
            }
            className="max-w-[300px] h-full object-cover rounded-lg"
          />
        </div>
      </div>

    </div>
  );
};

export default ImageSlide;
