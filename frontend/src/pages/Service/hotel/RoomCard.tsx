import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../../component/UI";
import { useNavigate } from "react-router-dom";
import Icon from "../../../component/UI/Icon";
import ModalAmenities from "../../../component/modal-content/Modal.Amenities";
import { room } from "../../../model/hotel/room/room";
import { Check } from "@mui/icons-material";

interface RoomCardProp {
  room?: room;
  hotelId?:string;
}

const BASE_IMAGE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";
const FALLBACK_IMAGE =
  "https://pix10.agoda.net/hotelImages/502321/1125725260/6d6c453ebc4b5bb90036b70a71027ec7.jpg?ce=2&s=414x232";

const MAX_VISIBLE_AMENITIES = 3;

const RoomCard = ({ hotelId,room }: RoomCardProp) => {
  const navigate = useNavigate();
  const [seeMore, setSeeMore] = useState(false);

  const mainImage = useMemo(() => {
    const url = room?.imageServiceItems?.[0]?.image?.url;
    return url ? `${BASE_IMAGE_URL}${url}` : FALLBACK_IMAGE;
  }, [room?.imageServiceItems]);
  const { visibleAmenities, hiddenCount } = useMemo(() => {
    if (!room?.amenitiesServiceItems?.length) {
      return { visibleAmenities: [], hiddenCount: 0 };
    }
    const visible = room.amenitiesServiceItems.slice(0, MAX_VISIBLE_AMENITIES);
    const hidden = room.amenitiesServiceItems.length - MAX_VISIBLE_AMENITIES;
    return { visibleAmenities: visible, hiddenCount: hidden > 0 ? hidden : 0 };
  }, [room?.amenitiesServiceItems]);

  if (!room) return null;

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={mainImage}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-5 flex flex-col justify-between flex-1">
          <div>
          <div className="mb-3">
              <h3 className="font-bold text-lg text-gray-900">{room.name}</h3>
            <p className="italic text-sm text-gray-600">{room?.typeRoom?.type}</p>
          </div>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <Icon name="square" size={16} />
                <span className="text-[13px]">Diện tích: {room.area} m²</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="bed" size={16} />
                <span className="text-[13px]">Tối đa {room.max_people} người</span>
              </div>
            </div>

            <div className="space-y-1.5 mb-4">
              {visibleAmenities.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <Check fontSize="small" className="text-green-600 flex-shrink-0" />
                  <span className="text-[13px]">
                    {item.amenityServiceItem.amenity}
                  </span>
                </div>
              ))}

              {hiddenCount > 0 && (
                <button
                  onClick={() => setSeeMore(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2 flex items-center gap-1 transition-colors"
                >
                  +{hiddenCount} tiện ích nữa
                </button>
              )}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="font-bold text-xl text-gray-900 mb-3">
              {room.price} VNĐ <span className="text-sm font-normal text-gray-500">/ đêm</span>
            </p>

            <Button
              rounded="full"
              className="w-full bg-black hover:bg-gray-800 text-white py-3 text-sm font-medium flex items-center justify-center gap-2"
              onClick={() => {
                navigate(`/hotels/${hotelId}/booking/${room.id}`);
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              Đặt phòng ngay
            </Button>
          </div>
        </div>
      </div>

      <ModalAmenities
        amenity={room.amenitiesServiceItems}
        isOpen={seeMore}
        onClose={() => setSeeMore(false)}
      />
    </>
  );
};

export default RoomCard;