import React from "react";
import { Button } from "../../../component/UI";
import RoomCard from "./RoomCard";
import { room } from "../../../model/hotel/room/room";

interface RoomsProp {
  hotelId:string | undefined,rooms: room[] | undefined;
}

const Rooms = ({hotelId, rooms }: RoomsProp) => {
  return (
    rooms && (
      <div className="w-full">
                  <p className="py-5 font-bold text-2xl">Chọn phòng:</p>
        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-5">
          {rooms.map((room,index) => {
            return <RoomCard key={index} hotelId={hotelId} room={room} />;
          })}
        </div>
      </div>
    )
  );
};

export default Rooms;
