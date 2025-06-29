import React from "react";
import RatingStar from "./OptionMaterial/StarRatingRadioOption";
import TextRadioOption from "./OptionMaterial/TextRadioOption";
import { FilterItem, FilterOption } from "../../../model/interface/interface_filter";
import { useHotelFilter } from "../../../store/FilterStore/filter_store";

interface Prop {
  options: FilterOption[];
  nameRadio: string;
  handleChange: (value: string | number) => void;
  children: (star: number | string) => React.ReactNode;

}
const RadioOption = ({ options, nameRadio, children, handleChange }: Prop) => {
  return (
    <>
      {options.map((item, index) => (
        <div className="rating flex items-center gap-2 py-3" key={item.id}>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name={`rating-${nameRadio}`}
              value={item.value}
              defaultChecked={item.value==options[0].value}
              onChange={() => handleChange(item.value)}
              className="accent-black w-4 h-4"
            />
            {children(item.value)}
          </label>
        </div>
      ))}
    </>
  );
};

export default RadioOption;
