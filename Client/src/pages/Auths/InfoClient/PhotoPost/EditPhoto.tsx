import React from "react";
import { Button, InputBar, Modal } from "../../../../component/UI";
import { StarRatingStatic } from "../../../../component";
interface EditPhotoProp {
  isOpen: boolean;
  setIsOpen: () => void;
}
const EditPhoto = ({ isOpen, setIsOpen }: EditPhotoProp) => {

    const foundServices = Array.from({ length: 6 }, (_, i) => ({
      id: (i + 1).toString(),
      img: {
        url: `https://static.lag.vn/upload/news/22/11/11/anime-bocchi-the-rock-duoc-yeu-thich-toan-cau-2_WLIW.jpg?w=800&encoder=wic&subsampling=444`,
        description: `Hình ảnh dịch vụ ${i + 1}`,
      },
      nameService: `Dịch vụ du lịch ${i + 1}`,
    }));
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={setIsOpen}
        styleContainer="max-w-4xl w-8/10"
      >
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          <div className="flex gap-2 w-full min-md:col-span-2">
            <img
              src="https://www.animeherald.com/wp-content/uploads/2024/05/Bocchi-the-Rock-003-20240323.jpg"
              className="rounded-full aspect-square object-cover w-[45px]"
            />
            <div className="w-full">
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

            <div className="service flex flex-col gap-2">
              <p className="font-bold text-2xl">See location</p>
              <InputBar onChange={()=>{}} classNameInput="w-full p-2 border border-gray-200 pl-13" classNameContent="top-12" classNameItemFound="flex p-2 gap-2" foundServices={foundServices}/>
              <div>
                <p className="text-md font-bold hover:underline cursor-pointer">
                  Tokyo bocchi of the rock
                </p>
                <p className="location text-sm text-gray-500">Tokyo, kaisen</p>
              </div>
              <img
                src="https://i0.wp.com/wrongeverytime.com/wp-content/uploads/2022/12/December16143612.jpg?resize=1920%2C1080&ssl=1"
                className="w-30 aspect-square object-cover"
              />
              <div className="flex gap-2">
                <p className="text-md text-gray-700">3.5</p>
                <StarRatingStatic starNumber={3} />
                <p className="text-md text-gray-700">1k reviews</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end w-full min-md:col-span-2 mt-5">
            <Button className="w-full min-sm:max-w-[70px] min-sm:min-w-[50px] text-white" variant="primary" size="md">Save</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditPhoto;
