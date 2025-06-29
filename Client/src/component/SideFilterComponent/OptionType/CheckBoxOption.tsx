import React from "react";
import { useHotelFilter } from "../../../store/FilterStore/filter_store";
import { FilterOption } from "../../../model/interface/interface_filter";
interface Prop {
  arr: FilterOption[];
  checkBoxName: string;
  handleChange: (value: string | number) => void;
  children: (item: any) => React.ReactNode;
}

const CheckBoxOption = ({ arr, checkBoxName,children, handleChange }: Prop) => {
  return (
    <>
      {arr.map((item, index) => (
        <div className="rating" key={item.id}>
          <div className="flex items-center gap-2 w-full">
            <input
              type="checkbox"
              name={`checkbox-${checkBoxName}`}
              id={`checkbox-${item.id}`}
              onChange={() => handleChange(String(item.value))}
            />
            <label
              htmlFor={`checkbox-${item.id}`}
              className="cursor-pointer text-sm font-normal w-full p-2"
            >
              {children(item.value)}

            </label>
          </div>
        </div>
      ))}
    </>
  );
};

export default CheckBoxOption;
