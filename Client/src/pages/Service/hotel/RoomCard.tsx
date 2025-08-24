import React, { useState } from "react";
import { Button } from "../../../component/UI";
import { Link, useNavigate } from "react-router";
import { Room } from "../../../model/hotel/hotel";
import { Facility } from "../../../model/facility";
import { am } from "react-router/dist/development/route-data-B9_30zbP";
import Icon from "../../../component/UI/Icon";
import ModalAmenities from "../../../component/Modal.Amenities";
interface RoomCardProp {
  room?: Room;
}

const RoomCard = ({ room }: RoomCardProp) => {
  const navigate = useNavigate();
  const [seeMore,setSeeMore] = useState<boolean>(false)
  return (
    <div className="flex flex-col items-start flex-wrap">
      <img
        src={
          room?.images[0].url || "https://pix10.agoda.net/hotelImages/502321/1125725260/6d6c453ebc4b5bb90036b70a71027ec7.jpg?ce=2&s=414x232"
        }
        className=" w-full h-[300px] object-cover" 
      />
      <div className=" p-5 w-full rounded-b-xl border border-gray-200">
        <div className="infoRoom ">
          <p className="font-bold pb-3 text-lg">{room?.name}</p>
          <div className="info-room">
            <div className="Amenity flex flex-col text-gray-800 min-h-30">
              <div className="flex flex-col gap-2 text-[14px]">
                <div>
                  <Icon name="square" size={16} className="mr-1"/>
                  <span className="text-[12px]">
                    Room area: {room?.area}
                    m²
                  </span>
                </div>
                <div>
                  <Icon name="bed" size={16} className="mr-1"/>
                  <span className="text-[12px]">
                    Number of beds: {room?.beds.length}
                  </span>
                </div>
              </div>

              <div className="mb-2">       {
                room?.facilities.map((facility: Facility) =>
                  facility.amenities.map((amenity) => (
                    <div key={amenity.amenityID}>
                     <Icon name={amenity.icon} size={16} className="mr-1" />
                      <span className="text-[12px]">{amenity.name}</span>
                    </div>
                  ))
                )
              }</div>
              <Button onClick={()=>{setSeeMore(!seeMore)}} variant="outline" typeButton="text" rounded="lg" className="text-blue-400 text-sm flex items-center gap-2 w-fit mb-3" >
                <p>More detail</p> <Icon name="chevron-circle-right" size={17}/>
              </Button>

              <ModalAmenities facilities={room?.facilities} isOpen={seeMore} onClose={()=>{setSeeMore(false)}}/>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
            <p className="font-bold text-lg">{room?.price.toLocaleString('de-DE')} VND/nightly</p>
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
