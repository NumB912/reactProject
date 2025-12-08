import React, { useState } from "react";
import { Link } from "react-router-dom"; // Fixed import
import IconButton from "../UI/Button/IconButton";
import StarRatingStatic from "../UI/StarRatingStatic";
import { Hotel } from "../../model/hotel/hotel";
import { formatPrice } from "../../utils/format.price";
import { Rating } from "@mui/material";

// Proper base URL (remove trailing slash once)
const BASE_IMAGE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/+$/, "");

const DEFAULT_IMAGE = `${BASE_IMAGE_URL}/upload/service/default/images.png`;

interface RenderTravelItemProps {
  item: Hotel | null | undefined;
}

export const RenderTravelItem = ({ item }: RenderTravelItemProps) => {
  const [active, setActive] = useState(false);

  if (!item) {
    return (
      <div className="relative w-full aspect-square rounded-2xl bg-gray-100 border border-gray-300 flex items-center justify-center">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }

  const firstImage = item.imageServices?.[0]?.image?.url;
  const imageUrl = firstImage
    ? `${BASE_IMAGE_URL}${firstImage.startsWith("/") ? "" : "/"}${firstImage}`
    : DEFAULT_IMAGE;

  return (
    <div className="render-item relative group h-fit">
      <IconButton
        iconColorActive="text-red-500"
        className="absolute top-3 right-3 z-10 p-3 w-10 h-10 bg-white border border-gray-200 
                   opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
        variant="outline"
        typeButton="text"
        active={active}
        // onClick={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   setActive(!active);
        // }}
        // icon={active ? "heart-filled" : "heart"}
        rounded="full"
        iconSize={18}
      />

      <Link
        to={`/hotels/${item.id}`}
        className="block w-full aspect-square rounded-2xl border border-gray-300 
                   overflow-hidden shadow hover:shadow-xl transition-shadow"
      >
        <div className="relative w-full h-2/3 bg-gray-200">
          <img
            src={imageUrl}
            alt={item.service_name || "Hotel"}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_IMAGE;
            }}
          />
        </div>

        <div className="p-4 space-y-2 bg-white">
          <h3 className="font-bold text-md line-clamp-2 ">
            {item.service_name}
          </h3>

          <div className="flex items-center gap-2">
            <span className="font-medium">{item.rating ?? "N/A"}</span>
            <Rating size="small" value={Number(item.rating) || 0}/>
            <span className="text-gray-500">({item.total_reviews || 0})</span>
          </div>

          {item.price_from != null && item.price_to != null && (
            <div className="flex items-end gap-2 mt-1">
              <span className="text-md font-bold text-black-500">
                {formatPrice(item.price_from)}
              </span>
              <span className="text-md text-gray-500">~</span>
              <span className="text-md font-bold text-gray-500 ">
                {formatPrice(item.price_to)}
              </span>
              <span className="text-sm text-gray-600 mb-1">VND</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
