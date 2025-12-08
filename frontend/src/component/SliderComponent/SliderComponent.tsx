import React, { ReactNode } from "react";
import Slider, { Settings } from "react-slick";

const CustomPrevArrow: React.FC<any> = (props) => {
  const { onClick } = props;
  return (
    <div
      className="flex items-center justify-center cursor-pointer top-1/2 absolute -translate-y-1/2 left-3 p-3 rounded-full bg-white text-md z-10 aspect-square shadow-md w-[40px]" // Đảm bảo z-index cao hơn nội dung
      onClick={onClick}
      aria-label="Previous Slide"
    >
      <i className="fa-solid fa-caret-left"></i>
    </div>
  );
};

const CustomNextArrow: React.FC<any> = (props) => {
  const { onClick } = props;
  return (
    <div
      className="flex items-center justify-center cursor-pointer absolute  top-1/2 -translate-y-1/2 right-3 p-3 rounded-full bg-white text-md z-10 aspect-square shadow-md w-[40px]" // Đảm bảo z-index cao hơn nội dung
      onClick={onClick}
      aria-label="Next Slide"
    >
      <i className="fa-solid fa-caret-right"></i>
    </div>
  );
};

interface ReusableSliderProps<T> {
  children:ReactNode
  sliderSettings?: Settings;
  title?: string;
  subtitle?: string;
  containerClassName?: string;
  infinite?:boolean,
  itemClassName:string
  nextButton?:React.ReactNode;
  prevButton?:React.ReactNode;
}

const ReusableSlider = <T extends { id: number | string}>({
  children,
  sliderSettings,
  title,
  subtitle,
  containerClassName = "w-full", 
  itemClassName="px-2",
}: ReusableSliderProps<T>) => {
  const defaultSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow/>,
    nextArrow: <CustomNextArrow/>,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 5 } },
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };
  const finalSettings = { ...defaultSettings, ...sliderSettings };

  return (
    <div className={containerClassName}>
      {(title || subtitle) && ( 
        <div className="Tittle py-3 w-1/2">
          {title && <p className="text-2xl max-sm:text-2xl font-bold">{title}</p>}
          {subtitle && <p className="text-lg">{subtitle}</p>}
        </div>
      )}

      <Slider {...finalSettings}>
            {children}
      </Slider>
    </div>
  );
};

export default ReusableSlider;