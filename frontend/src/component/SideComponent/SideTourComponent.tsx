import React, { useState } from "react";
import SideContentComponent from "./SideContentComponent";
import SideComponent from "./SideComponent";
import { Button, Modal, RadioOption } from "../UI";
import CheckboxOption from "../UI/Option/CheckboxOption";
import DualSlider from "../SliderRangeComponent/DualSlider";
import SliderDual from "../UI/Slider/SliderDual";
import StarRatingComponent from "../StarRatingComponent";
import StarRatingStatic from "../UI/StarRatingStatic";

const SideTourComponent = () => {
  const [selectedAmenity, setselectedAmenity] = useState<string[]>([]);
  const [selectStyles, setSelectStyles] = useState<string[]>([]);
  const [star, setStar] = useState<string>("");

  return (
    <>
      <SideComponent>


        <SideContentComponent label="Rating">
          <RadioOption
            id="ratingStar-radio"
            name="ratingStar"
            value={star}
            options={[
              { label: <StarRatingStatic starNumber={1} />, value: "1" },
              { label: <StarRatingStatic starNumber={2} />, value: "2" },
              { label: <StarRatingStatic starNumber={3} />, value: "3" },
              { label: <StarRatingStatic starNumber={4} />, value: "4" },
              { label: <StarRatingStatic starNumber={5} />, value: "5" },
            ]}
            onChange={function (
              event: React.ChangeEvent<HTMLInputElement>
            ): void {
              setStar(event.target.value);
            }}
          />
        </SideContentComponent>

        <SideContentComponent label="Duration">
          <CheckboxOption
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = event.target.value;
              setSelectStyles((prev) =>
                prev.includes(value)
                  ? prev.filter((v) => v !== value)
                  : [...prev, value]
              );
            }}
            checkedValues={selectStyles}
            name={"styles"}
            options={[
              { label: "1 hour", value: "1Hour" },
              { label: "1-4 hours", value: "2Hour" },
              { label: "Than 4 hours", value: "more4Hour" },
            ]}
            id={"duration-checkout"}
          ></CheckboxOption>
        </SideContentComponent>
      </SideComponent>
    </>
  );
};

export default SideTourComponent;
