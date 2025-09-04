import React from "react";
import { Button } from "../../../component/UI";
import RoomCard from "./RoomCard";
import { Room } from "../../../model/hotel/hotel";

interface RoomsProp {
  rooms: Room[] | undefined;
}

const Rooms = ({ rooms }: RoomsProp) => {
  return (
    rooms && (
      <div className="w-full">
        <p className="text-2xl font-bold">Chọn phòng</p>
        <div className="flex gap-2 *:p-1.5 *:border *:rounded-3xl *:text-[10px] *:font-bold *:border-gray-400 *:max-sm:hidden *:w-[60px] *:text-center py-3">
          <Button
            rounded="full"
            size="sm"
            variant="outline"
            typeButton="filled"
          >
            Tất cả
          </Button>
          <Button rounded="full" size="sm" variant="outline" typeButton="text">
            1 Giường
          </Button>
          <Button rounded="full" size="sm" variant="outline" typeButton="text">
            2 Giường
          </Button>
        </div>
        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-5">
          {rooms.map((room) => {
            return <RoomCard key={room.roomID} room={room} />;
          })}
        </div>
      </div>
    )
  );
};

export default Rooms;
