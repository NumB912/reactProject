import React, { useState } from "react";
import WrapDropDownOutLineItem from "../DropDownComponent/WrapDropDownOutLineItem";
import DropDownContent from "../DropDownComponent/DropDownContent";

const SortHotel = () => {
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [item, setItem] = useState("Recommand");

  const options = ["Recommand", "Option1", "Option2", "Option3", "Option4"];

  return (
    <div>
      <WrapDropDownOutLineItem
        handleClickOutSide={() => setIsOpenSort(false)}
        handleShow={() => setIsOpenSort(!isOpenSort)}
        className="w-fit px-4"
      >
        <div className="w-full font-semibold flex items-center justify-evenly gap-3">
          <i className="fa-solid fa-sort"></i>
          <p>Sort by: {item}</p>
        </div>

        <DropDownContent
          className="bg-white absolute z-20 shadow-md w-full max-w-[250px] transition-all duration-200 mt-15"
          isOpen={isOpenSort}
        >
          {options.map((opt) => (
            <p
              key={opt}
              onClick={() => {
                setItem(opt);
                setIsOpenSort(false);
              }}
              className={`cursor-pointer p-3 hover:bg-gray-200`}
            >
              {opt}
            </p>
          ))}
        </DropDownContent>
      </WrapDropDownOutLineItem>
    </div>
  );
};

export default SortHotel;
