import React from "react";
interface WrapDropDownOutLineItemProp {
  children: React.ReactNode;
  handleOnClick: () => void;
}
const WrapDropDownOutLineItem = ({
  children,
  handleOnClick,

}: WrapDropDownOutLineItemProp) => {
  return (
    <div
      className="relative w-full p-1.5 flex items-center justify-center gap-3 rounded-full  border border-gray-400 cursor-pointer
        min-xl:min-w-48"
      onClick={handleOnClick}
    >
        {children}

    </div>
  );
};

export default WrapDropDownOutLineItem;
