import React, { useState } from "react";
import SideContentComponent from "./SideContentComponent";
import SideComponent from "./SideComponent";
import { Button, Modal, RadioOption } from "../UI";
import CheckboxOption from "../UI/Option/CheckboxOption";
import DualSlider from "../SliderRangeComponent/DualSlider";
import SliderDual from "../UI/Slider/SliderDual";
import StarRatingComponent from "../StarRatingComponent";
import StarRatingStatic from "../UI/StarRatingStatic";

const SideRentalCarComponent = () => {
  const [selectedAmenity, setselectedAmenity] = useState<string[]>([]);
  const [selectStyles, setSelectStyles] = useState<string[]>([]);
  const [star, setStar] = useState<string>("");

  return (
    <>
      <SideComponent>
        <SideContentComponent label="Price">
          <SliderDual />
        </SideContentComponent>

        <SideContentComponent label="Amenities">
          <CheckboxOption
            id="amenities-radio"
            name="amenities"
            checkedValues={selectedAmenity}
            options={[
              { label: "Wifi", value: "Wifi" },
              { label: "Breakfast", value: "Breakfast" },
              { label: "Parking", value: "Parking" },
              { label: "Pool", value: "Pool" },
            ]}
            onChange={function (
              event: React.ChangeEvent<HTMLInputElement>
            ): void {
              const value = event.target.value;
              setselectedAmenity((prev) =>
                prev.includes(value)
                  ? prev.filter((v) => v !== value)
                  : [...prev, value]
              );
            }}
          />
        </SideContentComponent>

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

        <SideContentComponent label="Style">
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
              { label: "Budget", value: "Budget" },
              { label: "Mid-range", value: "Mid-range" },
              { label: "Luxury", value: "Luxury" },
              { label: "Family-friendly", value: "Family-friendly" },
              { label: "Business", value: "Business" },
              {
                label: "Romantic",
                value: "Romantic",
              },
              {
                label: "Modern",
                value: "Modern",
              },
            ]}
            id={"styles-checkbox"}
          ></CheckboxOption>
        </SideContentComponent>

        <SideContentComponent label="Class">
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
            name={"Hotel class"}
            options={[
              { label: "5 Star", value: "5" },
              { label: "4 Star", value: "4" },
              { label: "3 Star", value: "3" },
              { label: "2 Star", value: "2" },
              { label: "1.5 Star", value: "1.5" },
              {
                label: "1 Star",
                value: "1",
              },
            ]}
            id={"styles-checkbox"}
          ></CheckboxOption>
        </SideContentComponent>
      </SideComponent>
    </>
  );
};

export default SideRentalCarComponent;
