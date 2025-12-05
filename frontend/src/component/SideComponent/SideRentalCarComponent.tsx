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

        <SideContentComponent label="Vehicle Type">
          <CheckboxOption
            id="vehicle-type-checkbox"
            name="vehicleType"
            checkedValues={selectedAmenity}
            options={[
              { label: "Small car", value: "Small car" },
              { label: "Medium car", value: "Medium car" },
              { label: "Large car", value: "Large car" },
              { label: "SUV", value: "SUV" },
              { label: "Minivan", value: "Minivan" },
              { label: "Mid-size Car", value: "Mid-size Car" },
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

        <SideContentComponent label="Rating point">
          <RadioOption
            id="ratingStar-radio"
            name="ratingStar"
            value={star}
            options={[
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

        <SideContentComponent label="Number of Seats">
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
            name={"numberOfSeats"}
            id={"numberOfSeats-checkbox"}
            options={[
              { label: "4 seats", value: "4Seats" },
              { label: "5 seats", value: "5Seats" },
              { label: "6+ seats", value: "6PlusSeats" },
            ]}
          ></CheckboxOption>
        </SideContentComponent>

        <SideContentComponent label="Vehicle information">
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
            name={"Vehicle information"}
            options={[
              { label: "4+ doors", value: "4PlusDoors" },
              { label: "Air conditioning", value: "AirConditioning" },
            ]}
            id={"vehicle-information-checkbox"}
          ></CheckboxOption>
        </SideContentComponent>


                <SideContentComponent label="Electric Vehicle">
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
            name={"Electric Vehicle"}
            options={[
              { label: "Pure electric vehicle", value: "PureElectricVehicle" },
              { label: "Hybrid vehicle", value: "HybridVehicle" },
              { label: "Plug-in hybrid vehicle", value: "PlugInHybridVehicle" },
            ]}
            id={"electric-vehicle-checkbox"}
          ></CheckboxOption>
        </SideContentComponent>
      </SideComponent>
    </>
  );
};

export default SideRentalCarComponent;
