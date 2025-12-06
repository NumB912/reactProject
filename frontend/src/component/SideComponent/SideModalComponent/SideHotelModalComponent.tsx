import React, { useEffect, useState } from "react";
import SideContentComponent from "../SideContentComponent";
import SliderDual from "../../UI/Slider/SliderDual";
import { Button, Modal, RadioOption } from "../../UI";
import ContentLabel from "../../UI/ContentLabel";
import ButtonSelectOne, { ButtonSelectProp } from "../../ButtonSelectOne";
import StarRatingStatic from "../../UI/StarRatingStatic";
import ButtonSelectMany from "../../ButtonSelectMany";
import DualSlider from "../../SliderRangeComponent/DualSlider";

interface SideHotelModalComponentProp {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
}

const SideHotelModalComponent = ({
  isShow,
  setIsShow,
}: SideHotelModalComponentProp) => {
  const [amenities, setAmenities] = useState<ButtonSelectProp[]>([]);
  const [styles, setSelectStyles] = useState<ButtonSelectProp[]>([]);
  const [star, setStar] = useState<ButtonSelectProp>();
  const [hotelClass, setHotelClass] = useState<ButtonSelectProp[]>([]);
  return (
    <Modal
      title="Filters"
      isOpen={isShow}
      onClose={() => setIsShow(false)}
      styleContainer="rounded w-full h-[calc(100vh-150px)] max-w-[1000px] max-md:max-w-full max-md:h-[calc(100vh-100px)] max-md:h-full flex flex-col"
      parentContainerStyle="max-md:h-full"
    >
      <div className="flex-1 overflow-y-auto px-6 py-2">
        <div className="flex flex-col justify-between items-start w-full gap-4">
          <ContentLabel title="Prices">
            <SliderDual />
          </ContentLabel>

          <ContentLabel title="Amenities">
            <ButtonSelectMany
              options={[
                { id: "1", value: "Wifi" },
                { id: "2", value: "Breakfast" },
                { id: "3", value: "Parking" },
                { id: "4", value: "Pool" },
              ]}
              selected={amenities}
              onChange={setAmenities}
            />
          </ContentLabel>

          <ContentLabel title="Rating">
            <ButtonSelectOne
              options={[
                { id: "5", value: <StarRatingStatic starNumber={5} /> },
                { id: "4", value: <StarRatingStatic starNumber={4} /> },
                { id: "3", value: <StarRatingStatic starNumber={3} /> },
                { id: "2", value: <StarRatingStatic starNumber={2} /> },
              ]}
              onChange={setStar}
              selected={star}
            ></ButtonSelectOne>
          </ContentLabel>

          <ContentLabel title="Hotel class">
            <ButtonSelectMany
              options={[
                { id: "1", value: "1 star" },
                { id: "2", value: "2 star" },
                { id: "3", value: "3 star" },
                { id: "4", value: "4 star" },
                { id: "5", value: "5 star" },
              ]}
              onChange={setHotelClass}
              selected={hotelClass}
            />
          </ContentLabel>

          <ContentLabel title="Style">
            <ButtonSelectMany
              options={[
                { id: "1", value: "Modern" },
                { id: "2", value: "Luxury" },
                { id: "3", value: "Family-Friendly" },
                { id: "4", value: "Bussiness" },
                { id: "5", value: "Budget" },
                { id: "6", value: "Mid-range" },
                { id: "7", value: "Romantic" },
              ]}
              onChange={setSelectStyles}
              selected={styles}
            />
          </ContentLabel>
        </div>
      </div>

      <div className="flex justify-between items-center p-4 border-t border-gray-200 mt-4 gap-4">
        <Button onClick={() => {}} className="w-full">
          Reset
        </Button>
        <Button onClick={() => {}} className="w-full">
          Apply
        </Button>
      </div>
    </Modal>
  );
};

export default SideHotelModalComponent;
