import React from "react";
import SideContentComponent from "./SideContentComponent";
import CheckBoxOption from "../SideFilterComponent/OptionType/CheckBoxOption";
import SideComponent from "./SideComponent";

const SideHotelComponent = () => {
  function toggleAmenity(arg0: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <SideComponent>
      <SideContentComponent label="Amenities">
        <CheckBoxOption
          handleChange={(valueAmenity: string | number) => {
            toggleAmenity(String(valueAmenity));
          }}
          arr={[
            { id: "CheckBoxAmenties1", value: "Wifi" },
            { id: "CheckBoxAmenties2", value: "Breakfast" },
            { id: "CheckBoxAmenties3", value: "Parking" },
            { id: "CheckBoxAmenties4", value: "Pool" },
          ]}
          checkBoxName="Amenities"
        >
          {(item: string) => <p>{item}</p>}
        </CheckBoxOption>
      </SideContentComponent>

      <SideContentComponent label="Style">
            <CheckBoxOption
              handleChange={(valueAmenity: string | number) => {
                
              }}
              arr={[
                { id: "checkBoxHotelStyle1", value: "Budget" },
                { id: "CheckBoxHotelStyle2", value: "Mid-range" },
                { id: "checkBoxHotelStyle3", value: "Luxury" },
                { id: "CheckBoxHotelStyle4", value: "Family-friendly" },
                { id: "checkBoxHotelStyle5", value: "Business" },
                { id: "CheckBoxHotelStyle6", value: "Romantic" },
                { id: "checkBoxHotelStyle7", value: "Modern" },
              ]}
              checkBoxName="HotelStyle"
            >
              {(item: string) => <p>{item}</p>}
            </CheckBoxOption>
      </SideContentComponent>


        <SideContentComponent label="Hotel class">
            <CheckBoxOption
              handleChange={(valueAmenity: string | number) => {
                
              }}
              arr={[
                { id: "hotelClass1", value: "5 Star" },
                { id: "hotelClass2", value: "4 Star" },
                { id: "hotelClass3", value: "3 Star" },
                { id: "hotelClass4", value: "2 Star" },
                { id: "hotelClass5", value: "1 Star" },
              ]}
              checkBoxName="HotelStyle"
            >
              {(item: string) => <p>{item}</p>}
            </CheckBoxOption>
      </SideContentComponent>
    </SideComponent>
  );
};

export default SideHotelComponent;
