import React from "react";
import { Modal } from "../../../../component/UI";
import { StarRatingStatic } from "../../../../component";
interface ViewDetailPhotoProp {
  isOpen: boolean;
  setIsOpen: () => void;
}
const ViewDetailPhoto = ({ isOpen, setIsOpen }: ViewDetailPhotoProp) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={setIsOpen}
        styleContainer="max-w-[1000px]"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="flex gap-2 col-span-2">
            <img
              src="https://www.animeherald.com/wp-content/uploads/2024/05/Bocchi-the-Rock-003-20240323.jpg"
              className="rounded-full aspect-square object-cover w-[45px]"
            />
            <div className="">
              <p className="font-bold text-md">Sups</p>
              <p className="text-[12px] text-gray-400">23/5/2025</p>
            </div>
          </div>
          <div className="w-full">
            <img
              src="https://www.animeherald.com/wp-content/uploads/2024/05/Bocchi-the-Rock-003-20240323.jpg"
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="info w-full">
            <div className="description">
              <p className="font-bold text-2xl">Description</p>
              <div className="w-full">
                <textarea
                  disabled
                  placeholder="What's this of? Why is this special?"
                  className="w-full border border-gray-300 p-4 bg-gray-50 rounded-md resize-none"
                  value={"City"}
                  rows={4}
                />
              </div>
            </div>
            <div className="service flex flex-col gap-3">
              <div>
                <p className="text-2xl font-bold hover:underline cursor-pointer">Tokyo bocchi of the rock</p>
                <p className="location text-sm text-gray-500">Tokyo, kaisen</p>
              </div>
              <img
                src="https://i0.wp.com/wrongeverytime.com/wp-content/uploads/2022/12/December16143612.jpg?resize=1920%2C1080&ssl=1"
                className="w-50 aspect-square object-cover"
              />
              <div className="flex gap-2">
                <p className="text-md text-gray-700">3.5</p>
                <StarRatingStatic starNumber={3} />
                <p className="text-md text-gray-700">(1000 reviews)</p>
              </div>
            </div>
          </div>

          <div className="flex p-2 gap-2 *:cursor-pointer col-span-2">
            <button className="flex gap-2 items-center">
              <i className="fa-solid fa-thumbs-up"></i> Like
            </button>
            <button className="flex gap-2 items-center">
              <i className="fa-solid fa-heart"></i> Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewDetailPhoto;
