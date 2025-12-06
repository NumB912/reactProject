import React from "react";
import { Link, useParams } from "react-router";
import CardComponent from "../CardComponent";
import YourReviewedItem from "../../../../component/YourReviewItem";
import ReviewProfileItem from "./ReviewProfileItem";

const Reviews = () => {
  const yourReviews = [
    {
      id: "1",
      image:
        "https://dulichdaiviet.vn/uploaded/tour/mien-tay/tourdulichmientay7ngay6dem.jpg",
      title: "The Mekong River in Southwest Vietnam",
      address: "Kiên Giang",
      rating: 5,
      titleService: "Mekong Delta River Tour 3 Days",
      titleReview: "Peaceful, local, unforgettable!",
      contentReview:
        "I had an amazing time exploring the Mekong Delta. The slow boat ride through lush canals, friendly locals, and floating markets full of colors were a highlight. We tried fresh coconut, homemade candies, and watched traditional performances. The tour was well-organized and gave us insight into the real life of the river people. A truly peaceful and eye-opening experience.",
      postReviewPhotos: [
        {
          id: "1-1",
          url: "https://dulichdaiviet.vn/uploaded/tour/mien-tay/tourdulichmientay7ngay6dem.jpg",
          description: "Mekong tour view 1",
        },
        {
          id: "1-2",
          url: "https://sohatravel.vn/wp-content/uploads/2025/06/mekong-delta-tour-ben-tre-one-day-5.jpg.jpg",
          description: "Mekong tour view 2",
        },
        {
          id: "1-1",
          url: "https://dulichdaiviet.vn/uploaded/tour/mien-tay/tourdulichmientay7ngay6dem.jpg",
          description: "Mekong tour view 1",
        },
        {
          id: "1-2",
          url: "https://sohatravel.vn/wp-content/uploads/2025/06/mekong-delta-tour-ben-tre-one-day-5.jpg.jpg",
          description: "Mekong tour view 2",
        },
        {
          id: "1-1",
          url: "https://dulichdaiviet.vn/uploaded/tour/mien-tay/tourdulichmientay7ngay6dem.jpg",
          description: "Mekong tour view 1",
        },
        {
          id: "1-2",
          url: "https://sohatravel.vn/wp-content/uploads/2025/06/mekong-delta-tour-ben-tre-one-day-5.jpg.jpg",
          description: "Mekong tour view 2",
        },
        {
          id: "1-1",
          url: "https://dulichdaiviet.vn/uploaded/tour/mien-tay/tourdulichmientay7ngay6dem.jpg",
          description: "Mekong tour view 1",
        },
        {
          id: "1-2",
          url: "https://sohatravel.vn/wp-content/uploads/2025/06/mekong-delta-tour-ben-tre-one-day-5.jpg.jpg",
          description: "Mekong tour view 2",
        },
        {
          id: "1-1",
          url: "https://dulichdaiviet.vn/uploaded/tour/mien-tay/tourdulichmientay7ngay6dem.jpg",
          description: "Mekong tour view 1",
        },
        {
          id: "1-2",
          url: "https://sohatravel.vn/wp-content/uploads/2025/06/mekong-delta-tour-ben-tre-one-day-5.jpg.jpg",
          description: "Mekong tour view 2",
        },
        {
          id: "1-1",
          url: "https://dulichdaiviet.vn/uploaded/tour/mien-tay/tourdulichmientay7ngay6dem.jpg",
          description: "Mekong tour view 1",
        },
        {
          id: "1-2",
          url: "https://sohatravel.vn/wp-content/uploads/2025/06/mekong-delta-tour-ben-tre-one-day-5.jpg.jpg",
          description: "Mekong tour view 2",
        },
        {
          id: "1-1",
          url: "https://dulichdaiviet.vn/uploaded/tour/mien-tay/tourdulichmientay7ngay6dem.jpg",
          description: "Mekong tour view 1",
        },
        {
          id: "1-2",
          url: "https://sohatravel.vn/wp-content/uploads/2025/06/mekong-delta-tour-ben-tre-one-day-5.jpg.jpg",
          description: "Mekong tour view 2",
        },
      ],
    },
    {
      id: "2",
      image:
        "https://www.halongjunkcruise.com/wp-content/uploads/2024/05/charm-of-halong-bay.jpg",
      title: "Halong Bay Cruise Trip",
      address: "Quảng Ninh",
      rating: 4,
      titleService: "2-Day Halong Bay Luxury Cruise",
      titleReview: "Breathtaking views, great atmosphere",
      contentReview:
        "The limestone karsts rising from emerald waters were stunning. The cruise was smooth, relaxing, and included kayaking, cave visits, and cooking classes. The food was good, though the rooms were a bit small. Staff were attentive and helpful. It’s a perfect getaway from the city and worth every penny.",
      postReviewPhotos: [
        {
          id: "2-1",
          url: "https://www.halongjunkcruise.com/wp-content/uploads/2024/05/charm-of-halong-bay.jpg",
          description: "Halong cruise view",
        },
      ],
    },
    {
      id: "3",
      image:
        "https://vietnam.travel/sites/default/files/inline-images/shutterstock_1599037954.jpg",
      title: "Romantic Da Lat Getaway",
      address: "Lâm Đồng",
      rating: 5,
      titleService: "Romantic Escape in Da Lat",
      titleReview: "Best couple trip ever!",
      contentReview:
        "Da Lat’s cool weather, pine trees, flower gardens, and charming cafes made our couple’s trip truly special. We visited the Valley of Love, rode a swan boat, and drank amazing coffee. The city felt like a peaceful European town in Vietnam. Highly recommended for couples who want a calm, romantic vibe.",
      postReviewPhotos: [
        {
          id: "3-1",
          url: "https://vietnam.travel/sites/default/files/inline-images/shutterstock_1599037954.jpg",
          description: "Da Lat view",
        },
      ],
    },
    {
      id: "4",
      image:
        "https://hoiandelicacyhotel.com/wp-content/uploads/2023/01/hue-vietnam-3_1649667914.webp",
      title: "Historical Hue City Tour",
      address: "Thừa Thiên Huế",
      rating: 3,
      titleService: "Hue Heritage & Imperial Citadel Tour",
      titleReview: "Rich culture, too hot mid-day",
      contentReview:
        "Hue is rich in history and culture. The citadel, pagodas, and royal tombs were impressive, and our guide was very knowledgeable. However, the midday heat was intense and made it hard to enjoy the outdoor sites. I’d suggest visiting early in the morning or in cooler months.",
      postReviewPhotos: [
        {
          id: "4-1",
          url: "https://hoiandelicacyhotel.com/wp-content/uploads/2023/01/hue-vietnam-3_1649667914.webp",
          description: "Hue historical site",
        },
      ],
    },
    {
      id: "5",
      image:
        "https://vietnam.travel/sites/default/files/inline-images/11125-Qu%E1%BA%A3ng%20Nam-huybank%40gmail.com-hoi%20an%20ve%20dem%20.jpg",
      title: "Hoi An Ancient Town Discovery",
      address: "Quảng Nam",
      rating: 4,
      titleService: "Hoi An Ancient Town Cultural Walk",
      titleReview: "Lantern lights & night magic",
      contentReview:
        "Hoi An’s beauty at night is magical. The lantern-lit streets, calm river, and old houses create an unforgettable atmosphere. Shopping was fun, and the food was amazing. It was crowded, but worth it. Don’t miss the night market and try cao lầu noodles.",
      postReviewPhotos: [
        {
          id: "5-1",
          url: "https://vietnam.travel/sites/default/files/inline-images/11125-Qu%E1%BA%A3ng%20Nam-huybank%40gmail.com-hoi%20an%20ve%20dem%20.jpg",
          description: "Hoi An lantern night",
        },
      ],
    },
    {
      id: "6",
      image:
        "https://eggyolk.vn/wp-content/uploads/2024/08/1912Which-are-the-best-beaches-in-Vietnam-1024x764.jpg",
      title: "Beachside Relaxation in Nha Trang",
      address: "Khánh Hòa",
      rating: 5,
      titleService: "Luxury Beach Vacation in Nha Trang",
      titleReview: "Paradise beach and perfect sun",
      contentReview:
        "Nha Trang was pure paradise. Clear blue water, clean sand, and plenty of resorts made it a great vacation. We swam, snorkeled, and relaxed all day. The seafood was super fresh and delicious. It’s perfect for anyone wanting a sunny beach break with modern comforts.",
      postReviewPhotos: [
        {
          id: "6-1",
          url: "https://eggyolk.vn/wp-content/uploads/2024/08/1912Which-are-the-best-beaches-in-Vietnam-1024x764.jpg",
          description: "Nha Trang beach",
        },
      ],
    },
    {
      id: "7",
      image:
        "https://eggyolk.vn/wp-content/uploads/2024/08/1912Which-are-the-best-beaches-in-Vietnam-1024x764.jpg",
      title: "Beachside Relaxation in Nha Trang",
      address: "Khánh Hòa",
      rating: 5,
      titleService: "Luxury Beach Vacation in Nha Trang",
      titleReview: "Paradise beach and perfect sun",
      contentReview:
        "Nha Trang was pure paradise. Clear blue water, clean sand, and plenty of resorts made it a great vacation. We swam, snorkeled, and relaxed all day. The seafood was super fresh and delicious. It’s perfect for anyone wanting a sunny beach break with modern comforts.",
      postReviewPhotos: [
        {
          id: "6-1",
          url: "https://eggyolk.vn/wp-content/uploads/2024/08/1912Which-are-the-best-beaches-in-Vietnam-1024x764.jpg",
          description: "Nha Trang beach",
        },
      ],
    },
  ];

  return (
    <>
      {yourReviews.length == 0 && (
        <CardComponent
          titleContent="Write your new Reviews"
          content=" Share your experience with this destination. Your opinion helps others!"
          urlContentLink="/WriteReview"
          contentLink="Write a new review"
        />
      )}
      <div className="flex flex-col mt-5 gap-7 max-w-[600px]">
        {yourReviews.map((review, index) => (
          <ReviewProfileItem key={review.id} {...review} />
        ))}
      </div>
    </>
  );
};

export default Reviews;
