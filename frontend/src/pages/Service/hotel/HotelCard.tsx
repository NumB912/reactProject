import { useNavigate } from "react-router";
import React from "react";
import { Button, IconButton, Rating } from "@mui/material";
import { Star } from "@mui/icons-material";
import { FaHeart } from "react-icons/fa";
import { Hotel } from "../../../model/hotel/hotel";

  const BASE_IMAGE_URL =import.meta.env.VITE_API_URL || "http://localhost:3000";
const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  const navigate = useNavigate();

  const images = hotel.imageServices.map((i) => i.image.url);
  const amenities = hotel.amenities_hotels.map((a) => a.amenity.amenity);
  const ratingNum = parseFloat(hotel.rating) || 0;
  const reviewCount = hotel.total_reviews || 0;

  const getRatingInfo = (rating: number) => {
    if (rating >= 4.5) return { text: "Xuất sắc", color: "bg-green-600" };
    if (rating >= 4.0) return { text: "Rất tốt", color: "bg-green-500" };
    if (rating >= 3.5) return { text: "Tốt", color: "bg-blue-500" };
    if (rating >= 3.0) return { text: "Khá", color: "bg-yellow-500" };
    return { text: "Trung bình", color: "bg-orange-500" };
  };

  const ratingInfo = getRatingInfo(ratingNum);

  const formatPrice = (price: string) => {
    const num = parseInt(price);
    if (isNaN(num) || num === 0) return "Liên hệ";
    return new Intl.NumberFormat("vi-VN").format(num) + " VNĐ";
  };

  return (
    <div className="flex gap-4 rounded-xl border border-gray-200 p-4 shadow-md hover:shadow-xl transition-all bg-white">
      <div className="relative w-[250px] shrink-0">
        {images[0] ? (
          <img
            src={`${BASE_IMAGE_URL}${images[0]}`}
            alt={hotel.service_name}
            className="w-full aspect-square object-cover rounded-xl"
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full aspect-square" />
        )}

        <IconButton
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            padding:1.5,
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "grey.200",
            },
          }}
        >
          <FaHeart size={13} />
        </IconButton>

        <div className="absolute bottom-3 left-3 bg-black/80 text-white rounded-lg p-2 sm:hidden">
          <div className="flex items-center gap-1 font-bold">
            <span>{ratingNum.toFixed(1)}</span>
            <Rating value={5} />
          </div>
          <p className="text-xs">{ratingInfo.text}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold line-clamp-2">
            {hotel.service_name}
          </h3>
          {hotel.typeHotel && (
            <p className="text-sm text-gray-600 mt-1">{hotel.typeHotel.type}</p>
          )}
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <i className="fa-solid fa-location-dot text-red-500"></i>
            <span>{`${hotel.location.location}, ${hotel.location.ward.fullName}, ${hotel.location.ward.province.fullName}`}</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 mt-3">
            <span
              className={`px-3 py-1.5 rounded-md text-white font-bold text-sm ${ratingInfo.color}`}
            >
              {ratingNum.toFixed(1)} - {ratingInfo.text}
            </span>
            <div className="flex items-center gap-2">
              <Rating value={5} />
              <span className="text-sm text-gray-500">
                ({reviewCount.toLocaleString("vi-VN")} đánh giá)
              </span>
            </div>
          </div>

          {/* Tiện ích */}
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {amenities.slice(0, 6).map((a, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full border"
                >
                  {a}
                </span>
              ))}
              {amenities.length > 6 && (
                <span className="text-xs text-gray-500">
                  +{amenities.length - 6} tiện ích
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-end mt-6 max-lg:flex-col max-lg:items-start gap-4">
          <div>
            <p className="text-sm text-gray-500">1 đêm, 2 người lớn</p>
            <p className="text-2xl font-bold text-red-600">
              {formatPrice(hotel.price_from)}
              {hotel.price_to !== "0" &&
                hotel.price_to !== hotel.price_from && (
                  <span className="text-lg text-gray-500 ml-2">
                    ~ {formatPrice(hotel.price_to)}
                  </span>
                )}
            </p>
            <p className="text-xs text-gray-500">Đã bao gồm thuế và phí</p>
          </div>

          <Button
            onClick={() => navigate(`/hotels/${hotel.id}`)}
            className="rounded-xl px-8"
          >
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
