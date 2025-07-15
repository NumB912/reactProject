import React from "react";
import { ButtonIcon, InputBar, RatingStar } from "../../../component/UI";
import { StarRatingStatic } from "../../../component";
import { ButtonBorder } from "../../../component/UI";
import StarRatingComponent from "../../../component/StarRatingComponent";
import YourReviewedItem from "../../../component/YourReviewItem";
const FoundServiceReviews = () => {
const yourReviews = [
  {
    id: "1",
    image: "https://dulichdaiviet.vn/uploaded/tour/mien-tay/tourdulichmientay7ngay6dem.jpg",
    title: "The Mekong River in Southwest Vietnam",
    address: "Kiên Giang",
    rating: 5,
    titleService: "Mekong Delta River Tour 3 Days",
    titleReview: "Peaceful, local, unforgettable!",
    contentReview:
      "I had an amazing time exploring the Mekong Delta. The slow boat ride through lush canals, friendly locals, and floating markets full of colors were a highlight. We tried fresh coconut, homemade candies, and watched traditional performances. The tour was well-organized and gave us insight into the real life of the river people. A truly peaceful and eye-opening experience.",
  },
  {
    id: "2",
    image: "https://www.halongjunkcruise.com/wp-content/uploads/2024/05/charm-of-halong-bay.jpg",
    title: "Halong Bay Cruise Trip",
    address: "Quảng Ninh",
    rating: 4,
    titleService: "2-Day Halong Bay Luxury Cruise",
    titleReview: "Breathtaking views, great atmosphere",
    contentReview:
      "The limestone karsts rising from emerald waters were stunning. The cruise was smooth, relaxing, and included kayaking, cave visits, and cooking classes. The food was good, though the rooms were a bit small. Staff were attentive and helpful. It’s a perfect getaway from the city and worth every penny.",
  },
  {
    id: "3",
    image: "https://vietnam.travel/sites/default/files/inline-images/shutterstock_1599037954.jpg",
    title: "Romantic Da Lat Getaway",
    address: "Lâm Đồng",
    rating: 5,
    titleService: "Romantic Escape in Da Lat",
    titleReview: "Best couple trip ever!",
    contentReview:
      "Da Lat’s cool weather, pine trees, flower gardens, and charming cafes made our couple’s trip truly special. We visited the Valley of Love, rode a swan boat, and drank amazing coffee. The city felt like a peaceful European town in Vietnam. Highly recommended for couples who want a calm, romantic vibe.",
  },
  {
    id: "4",
    image: "https://hoiandelicacyhotel.com/wp-content/uploads/2023/01/hue-vietnam-3_1649667914.webp",
    title: "Historical Hue City Tour",
    address: "Thừa Thiên Huế",
    rating: 3,
    titleService: "Hue Heritage & Imperial Citadel Tour",
    titleReview: "Rich culture, too hot mid-day",
    contentReview:
      "Hue is rich in history and culture. The citadel, pagodas, and royal tombs were impressive, and our guide was very knowledgeable. However, the midday heat was intense and made it hard to enjoy the outdoor sites. I’d suggest visiting early in the morning or in cooler months.",
  },
  {
    id: "5",
    image: "https://vietnam.travel/sites/default/files/inline-images/11125-Qu%E1%BA%A3ng%20Nam-huybank%40gmail.com-hoi%20an%20ve%20dem%20.jpg",
    title: "Hoi An Ancient Town Discovery",
    address: "Quảng Nam",
    rating: 4,
    titleService: "Hoi An Ancient Town Cultural Walk",
    titleReview: "Lantern lights & night magic",
    contentReview:
      "Hoi An’s beauty at night is magical. The lantern-lit streets, calm river, and old houses create an unforgettable atmosphere. Shopping was fun, and the food was amazing. It was crowded, but worth it. Don’t miss the night market and try cao lầu noodles.",
  },
  {
    id: "6",
    image: "https://eggyolk.vn/wp-content/uploads/2024/08/1912Which-are-the-best-beaches-in-Vietnam-1024x764.jpg",
    title: "Beachside Relaxation in Nha Trang",
    address: "Khánh Hòa",
    rating: 5,
    titleService: "Luxury Beach Vacation in Nha Trang",
    titleReview: "Paradise beach and perfect sun",
    contentReview:
      "Nha Trang was pure paradise. Clear blue water, clean sand, and plenty of resorts made it a great vacation. We swam, snorkeled, and relaxed all day. The seafood was super fresh and delicious. It’s perfect for anyone wanting a sunny beach break with modern comforts.",
  },
];


  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center bg-gray-100 ">
        <div className="w-8/10 py-30 gap-10 flex">
          <p className="post-review_title font-bold text-6xl">
            Write a review, make someone's trip
          </p>
          <InputBar />
        </div>
      </div>

      <div className="w-full h-full py-30 flex flex-col items-center">
        <div className="w-8/10 grid grid-cols-[1fr_400px] max gap-3">
          <div className="your-reviews">
            <div className="your-reviews_title-content">
              <p className="your-reviews_title-content_title font-bold text-2xl">
                Your reviews
              </p>
              <p className="your-review-content text-sm text-gray-600">
                You have no reviews yet. After you write some reviews, they will
                appear here.
              </p>
            </div>
            <div className="flex flex-col mt-5 gap-3">
              {yourReviews.map((review) => (
                <YourReviewedItem key={review.id} {...review} />
              ))}
            </div>
          </div>
          <div className="should-reviews">
            <div className="should-reviews_title-content">
              <p className="should-review_title-content_title font-bold text-2xl">
                Have you ever been here?
              </p>
              <p className="should-review_title-content_content text-sm text-gray-400">
                Let us know if you've actually visited this place. It helps
                others trust your review.
              </p>
            </div>

            <div className="should-review_service flex-col flex mt-3 border border-gray-300 rounded-md max-2xl:col-span-2">
              <div className="should-review_service_item flex gap-3 p-5 max-h-60 cursor-pointer">
                <div className="should-review_service_item_info flex flex-col gap-3">
                  <p className="should-review_service_item_title font-bold line-clamp-2">
                    The Mekong River in Southwest Vietnam
                  </p>
                  <p className="should-review_service_item_content text-gray-400 text-sm line-clamp-2">
                    Kiên Giang
                  </p>
                  <div
                    className="should-review_service_item_rating"
                    onClick={() => {
                      console.log("hello");
                    }}
                  >
                    <StarRatingComponent />
                  </div>
                </div>
                <img
                  src="https://dulichdaiviet.vn/uploaded/tour/mien-tay/tourdulichmientay7ngay6dem.jpg"
                  alt="mekongDetail"
                  className="object-cover aspect-square w-40 h-40"
                />
              </div>
              <div className="should-review_service_item flex gap-3 p-5 max-h-60 cursor-pointer">
                <div className="should-review_service_item_info flex flex-col gap-3">
                  <p className="should-review_service_item_title font-bold line-clamp-2">
                    The Mekong River in Southwest Vietnam
                  </p>
                  <p className="should-review_service_item_content text-gray-400 text-sm line-clamp-2">
                    Kiên Giang
                  </p>
                  <div
                    className="should-review_service_item_rating"
                    onClick={() => {
                      console.log("hello");
                    }}
                  >
                    <StarRatingComponent />
                  </div>
                </div>
                <img
                  src="https://dulichdaiviet.vn/uploaded/tour/mien-tay/tourdulichmientay7ngay6dem.jpg"
                  alt="mekongDetail"
                  className="object-cover aspect-square w-40 h-40"
                />
              </div>
              <div className="should-review_service_item flex gap-3 p-5 max-h-60 cursor-pointer">
                <div className="should-review_service_item_info flex flex-col gap-3">
                  <p className="should-review_service_item_title font-bold line-clamp-2">
                    The Mekong River in Southwest Vietnam
                  </p>
                  <p className="should-review_service_item_content text-gray-400 text-sm line-clamp-2">
                    Kiên Giang
                  </p>
                  <div
                    className="should-review_service_item_rating"
                    onClick={() => {
                      console.log("hello");
                    }}
                  >
                    <StarRatingComponent />
                  </div>
                </div>
                <img
                  src="https://dulichdaiviet.vn/uploaded/tour/mien-tay/tourdulichmientay7ngay6dem.jpg"
                  alt="mekongDetail"
                  className="object-cover aspect-square w-40 h-40"
                />
              </div>
            </div>

            <div className="why-reviews"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundServiceReviews;
