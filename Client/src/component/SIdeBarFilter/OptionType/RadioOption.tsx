import React from "react";
import RatingStar from "./OptionMaterial/StarRatingRadioOption";
import TextRadioOption from "./OptionMaterial/TextRadioOption";
import { FilterItem, FilterOption } from "../../../model/interface/interface_filter";
import { useHotelFilter } from "../../../store/filter_store";

interface Prop {
  arr: FilterOption[];
  nameRadio: string;
  handleChange: (value: string | number) => void;
  children:(star:number|string)=>React.ReactNode;
}
const RadioOption = ({ arr, nameRadio,children, handleChange }: Prop) => {
  return (
    <>
      {arr.map((item, index) => (
        <div className="rating flex items-center gap-2 py-3" key={item.id}>
          <input
            type="radio"
            name={`rating-${nameRadio}`}
            id={`rating-${item.id}`}
            className="checked:bg-gray-500"
            onChange={() => handleChange(item.value)}
          />
          <label
            htmlFor={`rating-${item.id}`}
            className="cursor-pointer flex items-center gap-1"
          >
             {children((item.value))}
          </label>
        </div>
      ))}
    </>
  );
};

export default RadioOption;
