import React from "react";
import { HeartFavorite } from "../UI";
import { Travel } from "../../interface/Service/TravelInterface";
import { Link } from "react-router";
import StarRatingStatic from "../UI/StarRatingStatic";

export const renderTravelItem = (item: Travel) => (
  <div className="render-item relative">
    <HeartFavorite />
    <Link
      to={`/Tours/${item.id}`}
      className="flex flex-col w-full max-sm:min-w-55 max-lg:min-w-45 aspect-square rounded-2xl border border-gray-300 shadow "
    >
      <div className="img-service w-full h-full">
        <img
          src={
            item.image ||
            "https://imgcdn.tapchicongthuong.vn/tcct-media/21/11/3/du-lich-vung-dong-bang-song-cuu-long.jpg"
          }
          alt=""
          className="w-full h-full rounded-t-md object-cover"
        />
      </div>

      <div className="detail px-3 py-5 rounded-b-md w-full">
        <p className="font-bold text-md overflow-hidden w-full">{item.title}</p>
        <div className="flex items-center *:mr-1 *:text-[16px]">
          <p className="avg">4.1</p>

          <StarRatingStatic starNumber={5} />
          <p className="quantity">(101)</p>
        </div>
      </div>
    </Link>
  </div>
);
