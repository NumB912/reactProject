import React from "react";
import { Button } from "../../../../component/UI";
import IconAndLabel from "../../../../component/UI/IconLabel";

const Ticker = () => {
  return (
    <div className="ticker flex flex-col gap-2">
      <div className="shadow-xl border-gray-200 border p-5 rounded-md">
        <div className="info-ticker max-w-md ">
          <p className="font-bold text-xl mb-5">Chuyến du lịch 2 ngày 3 đêm</p>
          <IconAndLabel
            Label={
              <div className="flex flex-col gap-1">
                <p className="font-bold text-lg">Miễn phí hủy đặt</p>
                <p className="line-clamp-2 text-primary">
                 Bạn có thể hủy đặt vé trong vòng 23h đấy!!!
                </p>
              </div>
            }
            sizeIcon={20}
            name="clock"
            className="text-green-700 mb-5"
            
          />
          <IconAndLabel
          sizeIcon={20}
            Label={
                 <div className="flex flex-col gap-1">
                <p className="font-bold text-lg">Về hành trình sắp tới</p>
                <p className=" line-clamp-2 text-primary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti provident nihil repudiandae nisi, alias, molestiae
                  esse, sint est eligendi laudantium dolorem quisquam tempore
                  voluptas deleniti odit. Praesentium est amet enim?
                </p>
              </div>
            }
            name="check-circle"
            className="text-blue-700"
          />
        </div>

        <div className="price mt-5">
          <p className="font-medium">
            Tổng tiền <span className="text-2xl font-bold">1,000,000 VND</span>
          </p>
          <p className="text-gray-400 text-sm">Đã bao gồm thuế</p>
          <Button className="mt-5 w-full" variant="primary" rounded="sm">
            Chọn loại vé
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
