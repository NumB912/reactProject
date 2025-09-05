import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import Comment from "../../Comment";
import { FaHeart } from "react-icons/fa";
import { useTourCalendar, useTravelerTour } from "../../../store";
import { Button, ButtonIcon } from "../../../component/UI";
import Calendar_Tour from "../../../component/calendar/CalendarTour";
import PassengersTour from "../../../component/passenger-content/PassengersTour";
import { StarRatingStatic } from "../../../component";
import IconButton from "../../../component/UI/Button/IconButton";
import InfoContactService from "../../../component/infoService";
import { Tour } from "../../../model/tour/tour";
import { postPhoto, Review } from "../../../model/review";
import ImageSlide from "../../../component/ImageSlide";
import CardContent from "../../../component/service's-body/CardContent";
import IconAndLabel from "../../../component/UI/IconLabel";
import CardContentDropDown from "../../../component/service's-body/CardContentDropDown";
import Icon from "../../../component/UI/Icon";
const TourDetail = () => {
  const { tourID } = useParams();
  const [data, setData] = useState<Tour | undefined>();

  useEffect(() => {
    fetch("/dataTemp/tour/tour.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data[0]);
      });
  }, [tourID]);

  console.log(data?.service.Images[0].createAt);

  return (
    <div className="container py-10 m-10 justify-center flex flex-col items-center p-10">
      <div className="info w-full">
        {data && <InfoContactService service={data.service} />}
        {data?.service.Images && (
          <div className="info-contact">
            <div className="image-slide my-5">
              {data?.service.Images && (
                <ImageSlide postPhotos={data.service.Images} />
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-10 gap-5">
          <div className="infodetail col-span-6 rounded flex-col flex gap-5">
            <CardContent title="Thông tin" variant="outline">
              <p className="text-sm">
                Tour du thuyền Vịnh Hạ Long là trải nghiệm được nhiều du khách
                lựa chọn khi đến với kỳ quan thiên nhiên này. Trên du thuyền,
                bạn sẽ được ngắm nhìn toàn cảnh vịnh với hàng nghìn đảo đá kỳ
                thú, tham quan các hang động nổi tiếng, chèo kayak trên làn nước
                trong xanh, tắm biển và tham gia nhiều hoạt động giải trí hấp
                dẫn. Ngoài ra, du khách còn được thưởng thức các bữa tiệc hải
                sản tươi ngon, tận hưởng hoàng hôn lãng mạn và đêm nhạc sôi động
                trên boong tàu. Đây là lựa chọn lý tưởng để khám phá trọn vẹn vẻ
                đẹp và sự quyến rũ của Vịnh Hạ Long.
              </p>
            </CardContent>

            <CardContent title="Cắc mục cần chú ý" variant="outline">
              <div className="grid grid-cols-5 gap-5">
                <IconAndLabel
                  Label="Đáng nhớ"
                  name="thumbs-up"
                  Direct="column"
                  IconLayout="center"
                  LabelLayout="center"
                />

                <IconAndLabel
                  Label="Cảnh đẹp"
                  name="leaf"
                  Direct="column"
                  IconLayout="center"
                  LabelLayout="center"
                />

                <IconAndLabel
                  Label="Nhiều loại đồ ăn"
                  name="bowl-food"
                  Direct="column"
                  IconLayout="center"
                  LabelLayout="center"
                />

                <IconAndLabel
                  Label="Đánh giá"
                  name="1"
                  Direct="column"
                  IconLayout="center"
                  LabelLayout="center"
                />

                <IconAndLabel
                  Label="Đánh giá"
                  name="people-group"
                  Direct="column"
                  IconLayout="center"
                  LabelLayout="center"
                />
              </div>
            </CardContent>

            <CardContent title="Thông tin tour" variant="outline">
              <div className="grid grid-cols-5 gap-5">
                <IconAndLabel
                  Label="Hủy không rủi ro"
                  name="check"
                  Direct="column"
                  IconLayout="center"
                  LabelLayout="center"
                />

                <IconAndLabel
                  Label="2 tiếng (tối đa)"
                  name="check"
                  Direct="column"
                  IconLayout="center"
                  LabelLayout="center"
                />

                <IconAndLabel
                  Label="Xác nhận ngay lập tức"
                  name="check"
                  Direct="column"
                  IconLayout="center"
                  LabelLayout="center"
                />

                <IconAndLabel
                  Label="Vé di động"
                  name="check"
                  Direct="column"
                  IconLayout="center"
                  LabelLayout="center"
                />
              </div>
            </CardContent>

            <CardContentDropDown title="Lịch trình" variant="outline">
              <div className="p-3">
                <div className="flex gap-4">
                  <div className="literary flex flex-col items-center justify-center">
                    <IconAndLabel
                      Label={<p className="font-bold">2</p>}
                      name="location-dot"
                      className="rounded bg-primary text-white p-2 gap-0 flex-wrap justify-center"
                      IconLayout="center"
                      LabelLayout="center"
                    />
                    <div className="h-full bg-primary w-1"></div>
                  </div>

                  <div className="literary-detail mb-13">
                    <p className="literary-title font-bold">Title literary</p>
                    <p className="text-md">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Eius eligendi at esse, odit rem aut. Sint eos natus facere
                      totam aut recusandae odit nam incidunt excepturi fugiat
                      dolorem, exercitationem deserunt!
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="literary flex flex-col items-center justify-center">
                    <IconAndLabel
                      Label={<p className="font-bold">3</p>}
                      name="location-dot"
                      className="rounded bg-primary text-white p-2 gap-0 flex-wrap justify-center"
                      IconLayout="center"
                      LabelLayout="center"
                    />
                    <div className="h-full bg-primary w-1"></div>
                  </div>

                  <div className="literary-detail mb-13">
                    <p className="literary-title font-bold">Title literary</p>
                    <p className="text-md">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Eius eligendi at esse, odit rem aut. Sint eos natus facere
                      totam aut recusandae odit nam incidunt excepturi fugiat
                      dolorem, exercitationem deserunt!
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="literary flex flex-col items-center justify-center">
                    <Icon
                      size={16}
                      name="flag"
                      className="rounded bg-primary text-white p-2 gap-0 flex-wrap"
                    />
                    <div className="h-full w-1"></div>
                  </div>

                  <div className="literary-detail mb-13">
                    <p className="literary-title font-bold">Title literary</p>
                    <p className="text-md">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Eius eligendi at esse, odit rem aut. Sint eos natus facere
                      totam aut recusandae odit nam incidunt excepturi fugiat
                      dolorem, exercitationem deserunt! Lorem ipsum dolor sit
                      amet consectetur adipisicing elit. Quam doloribus
                      molestias illo eum, animi ullam cum delectus esse tenetur
                      eius possimus aperiam obcaecati, est officiis natus
                      debitis, quis corrupti! Maiores. Lorem ipsum dolor sit
                      amet consectetur adipisicing elit. Eveniet animi in
                      nostrum corrupti, est ullam reprehenderit velit alias
                      inventore voluptate iure fuga harum rem soluta unde
                      incidunt dolores sed neque?
                    </p>
                  </div>
                </div>
              </div>
            </CardContentDropDown>
          </div>

          <div className="col-span-4 border border-gray-200 h-full"></div>
        </div>

        <div className="grid-cols-3 grid gap-5 mt-5 bg-primary/3 p-5 rounded">
          <CardContentDropDown title="Câu hỏi thường gặp">
            <div className="p-3">
              <CardContentDropDown
                title={<p className="text-sm">Làm sao để có thể đặt được</p>}
                className="border-0"
              >
                <div className=" flex flex-col justify-start gap-3 h-full p-3">
                  <IconAndLabel Label="Một khi quý khách đã chọn hoạt động, hãy chọn lựa chọn gói quý khách muốn đặt." />
                  <IconAndLabel Label="Rà lại thông tin trong phần Bao gồm những gì phụ thuộc vào lựa chọn đã chọn và đảm bảo thông tin khớp với lựa chọn quý khách đã chọn." />
                  <IconAndLabel Label="Chọn số lượng vé và hoàn thành thanh toán." />
                  <IconAndLabel Label="Vui lòng kiểm tra tỉ mỉ ngày và chính sách hủy của quý khách trước khi thanh toán." />
                  <IconAndLabel Label="Quý khách sẽ nhận được thư xác nhận điện tử cùng chứng từ một khi hoàn tất thanh toán và đơn đặt chỗ được xác nhận." />
                </div>
              </CardContentDropDown>

              <CardContentDropDown
                title={<p className="text-sm">Tìm đơn hoạt động ở đâu?</p>}
                className="border-0"
              >
                <div className=" flex flex-col justify-start gap-3 h-full p-3 text-sm">
                  Quý khách luôn có thể xem chi tiết đặt chỗ và truy xuất chứng
                  từ/thư xác nhận điện tử trên website hoặc ứng dụng Agoda bằng
                  cách đăng nhập và chọn "Đơn đặt chỗ của tôi" từ menu tài
                  khoản.
                </div>
              </CardContentDropDown>

              <CardContentDropDown
                title={<p className="text-sm">Chứng từ hoạt động như nào?</p>}
                className="border-0"
              >
                <div className=" flex flex-col justify-start gap-3 h-full p-3">
                  <p className="text-sm">
                    Quý khách sẽ nhận được chứng từ (hoặc tương đương) qua thư
                    điện tử. Hãy đưa chứng từ cho nhân viên tại điểm thu vé hoặc
                    cổng vào của điểm tham quan để họ có thể quét. Mọi hướng dẫn
                    cụ thể cho việc đặt vé của quý khách sẽ có trong chứng từ.
                  </p>
                </div>
              </CardContentDropDown>

              <CardContentDropDown
                title={<p className="text-sm">Làm sao để có thể hủy đơn?</p>}
                className="border-0"
              >
                <div className=" flex flex-col justify-start gap-3 h-full p-3">
                  <IconAndLabel Label="Một khi quý khách đã chọn hoạt động, hãy chọn lựa chọn gói quý khách muốn đặt." />
                  <IconAndLabel Label="Một khi quý khách đã chọn hoạt động, hãy chọn lựa chọn gói quý khách muốn đặt." />
                  <IconAndLabel Label="Một khi quý khách đã chọn hoạt động, hãy chọn lựa chọn gói quý khách muốn đặt." />
                  <IconAndLabel Label="Một khi quý khách đã chọn hoạt động, hãy chọn lựa chọn gói quý khách muốn đặt." />
                </div>
              </CardContentDropDown>
            </div>
          </CardContentDropDown>
          <CardContentDropDown title="Chính sách hủy">
            <div className="flex flex-col justify-start p-3">
              <div className="flex gap-2 items-center">
                <Icon name="check" size={16} />
                <div className="info">
                  <p className="text-md font-medium text-green-600">
                    Được hủy tour không có bất kỳ phụ phí
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    LƯU Ý: chỉ được hủy tour trong vòng 24h{" "}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <Icon name="check" size={16} />
                <div className="info">
                  <p className="text-md font-medium text-red-600">
                    Không được hoàn tiền
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    LƯU Ý: chỉ được hủy tour trong vòng 24h{" "}
                  </p>
                </div>
              </div>
            </div>
          </CardContentDropDown>
          <CardContentDropDown title="Thông tin thêm">
            <div className="flex flex-col justify-start gap-3 h-full p-3">
              <IconAndLabel Label="Không khuyến nghị cho người có chấn thương về vùng xương sống" />
              <IconAndLabel Label="Không khuyến nghị cho phụ nữ mang thai" />
              <IconAndLabel
                Direct="row"
                Label="Không khuyến nghị người có mang bệnh về hô hấp"
              />
              <IconAndLabel
                Direct="row"
                Label="Phù hợp cho các khách hàng có sức khỏe tốt"
              />
            </div>
          </CardContentDropDown>
        </div>
      </div>
      <Comment reviewAndPost={[]} />
    </div>
  );
};

export default TourDetail;
