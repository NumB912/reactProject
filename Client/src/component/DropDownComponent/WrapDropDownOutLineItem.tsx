import React, { useEffect, useRef } from "react";
interface WrapDropDownOutLineItemProp {
  children: React.ReactNode;
  handleClickOutSide: () => void;
  handleShow:()=>void;
  className?:string
}
const WrapDropDownOutLineItem = ({
  children,
  handleShow,
  handleClickOutSide,
  className
}: WrapDropDownOutLineItemProp) => {
  const ref = useRef<HTMLDivElement>(null);
useEffect(() => {
  const close = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      handleClickOutSide();
    }
  };

  document.addEventListener("mousedown", close);
  return () => {
    document.removeEventListener("mousedown", close);
  };
}, []);

  return (
    <div
      className={` ${className} relative p-1.5 flex items-center justify-center gap-3 rounded-full  border border-gray-400 cursor-pointer
        min-xl:min-w-48`}
      onClick={handleShow}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default WrapDropDownOutLineItem;
