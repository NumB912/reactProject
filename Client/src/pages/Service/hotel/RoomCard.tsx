import React from "react";
import { Button } from "../../../component/UI";
import { Link, useNavigate } from "react-router";
import { Room } from "../../../model/hotel/hotel";
import { Facility } from "../../../model/facility";
import { am } from "react-router/dist/development/route-data-B9_30zbP";
import Icon from "../../../component/UI/Icon";
interface RoomCardProp {
  room?: Room;
}

const RoomCard = ({ room }: RoomCardProp) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start flex-wrap">
      <img
        src={
          "https://pix10.agoda.net/hotelImages/502321/1125725260/6d6c453ebc4b5bb90036b70a71027ec7.jpg?ce=2&s=414x232"
        }
        className=" w-full"
      />
      <div className=" p-5 w-full rounded-b-xl border border-gray-200">
        <div className="infoRoom ">
          <p className="font-bold pb-3 text-lg">{room?.name}</p>
          <div className="info-room">
            <div className="Amenity flex flex-col text-gray-800 min-h-30">
              <div className="">
                <div>
                  <i className="fa-solid fa-square min-w-8"></i>
                  <span className="text-[12px]">
                    Room area: {room?.area}
                    m²
                  </span>
                </div>
                <div>
                  <i className="fa-solid fa-bed min-w-8"></i>
                  <span className="text-[12px]">
                    Number of beds: {room?.beds.length}
                  </span>
                </div>
              </div>

              {
                room?.facilities.map((facility: Facility) =>
                  facility.amenities.map((amenity) => (
                    <div key={amenity.amenityID}>
                     <Icon name={amenity.icon} size={16} className="mr-1" />
                      <span className="text-[12px]">{amenity.name}</span>
                    </div>
                  ))
                )
              }
              <Link to="#" className="text-blue-400 text-sm">
                More detail <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <div className="price flex justify-start w-full">
            <p className="font-bold text-xl">${room?.price} VND/nightly</p>
          </div>
          <div className="flex *:text-[13px] justify-between">
            <p className="text-red-400">We have 2 left</p>
            <p className="text-green-400">Total includes taxes and fees</p>
          </div>
          <Button
            rounded="md"
            className="w-full bg-black text-white rounded-full p-3"
            onClick={() => {
              navigate("/hotels/123/booking/123");
            }}
          >
            <i className="fa-solid fa-cart-shopping"></i> Book now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
