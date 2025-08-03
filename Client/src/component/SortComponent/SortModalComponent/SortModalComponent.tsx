import React, { useState } from "react";
import { Button, Modal, RadioOption } from "../../UI";

interface SortModalComponentProp {
  isShowSort: boolean;
  setIsShowSort: (isShow: boolean) => void;
}

const SortModalComponent = ({
  isShowSort,
  setIsShowSort,
}: SortModalComponentProp) => {

  const [sort, setSort] = useState("price_asc");

  const sortOptions = [
  { value: "price_asc", label: "Giá tăng dần" },
  { value: "price_desc", label: "Giá giảm dần" },
  { value: "rating_desc", label: "Đánh giá cao" },
  { value: "distance_asc", label: "Gần bạn nhất" },
];

  return (
    <Modal
      title="Sort"
      isOpen={isShowSort}
      onClose={() => {
        setIsShowSort(false);
      }}
      styleContainer={
        " rounded-none p-5 w-full h-[calc(100vh-100px)] max-w-[700px] max-md:max-w-full max-md:h-[calc(100vh-100px)] max-md:h-full"
      }
    >
      <div className="flex flex-col justify-between items-start w-full">
        <div className="sortOptions w-full flex flex-col gap-3">
          <RadioOption
            id="sort-radio"
            name="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            options={sortOptions}
          />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 p-4 bottom-0 apply-reset self-end flex justify-between w-full *:w-[300px]">
          <div className="reset">
            <Button onClick={() => {}} className="w-full">
              Reset
            </Button>
          </div>

          <div className="apply">
            <Button onClick={() => {}} className="w-full">
              Apply
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SortModalComponent;
