import React, { useState } from "react";
import { Amenity, Facility } from "../../model/facility";
import Modal from "./Modal";
import Icon from "../UI/Icon";
import IconAndLabel from "../UI/IconLabel";
import { amenity } from "../../model/amenity";
import { AmenityServiceItem } from "../../model/hotel/room/room";

interface ModalAmenitiesProp {
  amenity?: AmenityServiceItem[];
  onClose: () => void;
  isOpen: boolean;
}

const ModalAmenities = ({
  amenity,
  isOpen,
  onClose,
}: ModalAmenitiesProp) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      title="Facilities"
      tickExit={true}
      rounded="lg"
      padding="sm"
    >
      <div className="grid grid-cols-2 gap-5 p-5">
        {amenity?.map((item) => (
          <div className="my-2 w-md">
            <div className="font-bold my-2">{item.amenityServiceItems.amenity}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ModalAmenities;
