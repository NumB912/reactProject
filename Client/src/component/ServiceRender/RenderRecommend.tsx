import React from "react";
import { Link } from "react-router";
import StarRatingStatic from "../UI/StarRatingStatic";
import { HeartFavorite } from "../UI";



export const RenderRecommend= () => (
  <Link to={`/our/`}
    className={`flex flex-col w-full max-sm:min-w-55 max-lg:min-w-45 aspect-square rounded-2xl border border-gray-300 shadow relative`}
  >
    <div className="image w-full h-full relative">
      <img
        src={
          "https://imgcdn.tapchicongthuong.vn/tcct-media/21/11/3/du-lich-vung-dong-bang-song-cuu-long.jpg"
        }
        alt=""
        className="w-full h-full rounded-md object-cover"
      />
    </div>

    <div className="content-recommend absolute bottom-2 left-2">
        <p className="text-white text-2xl font-bold">South west VietNam</p>
    </div>
  </Link>
);
