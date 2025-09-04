import React, { useState } from "react";
import { Amenity, Facility } from "../../model/facility";
import Modal from "./Modal";
import Icon from "../UI/Icon";
import IconAndLabel from "../UI/IconLabel";

interface ModalAmenitiesProp {
  facilities?: Facility[];
  onClose: () => void;
  isOpen: boolean;
}

const ModalAmenities = ({
  facilities,
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
        {facilities?.map((facility: Facility) => (
          <div className="my-2 w-md">
            <div className="font-bold my-2">{facility.name}</div>
            {facility.amenities.map((amenity) => {
              return (
                <div className="my-2">
                  <IconAndLabel Label={amenity.name} name={amenity.icon} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ModalAmenities;
