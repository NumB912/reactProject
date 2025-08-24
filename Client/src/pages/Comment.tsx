import { Link } from "react-router";
import { StarRatingStatic } from "../component";
import React, { useState } from "react";
import { Button } from "../component/UI";
import { postPhoto, Review } from "../model/review";
import ModelMoreInfoImage from "../component/Modal.Slide.Image";
import Icon from "../component/UI/Icon";

interface CommentProp {
  reviewAndPost: (Review | postPhoto)[];
}

const Comment = ({ reviewAndPost }: CommentProp) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const reviewPostMerge = reviewAndPost.flatMap((merge) => {
    return merge.images.map((img) => {
      return {
        parent: merge,
        child: img,
      };
    });
  });

  return (
    <div
      id="comment"
      className="w-full bg-gray-100 mt-10 flex justify-center items-center flex-col"
    >
      <div className="w-full p-3">
        <div className="totalReview flex justify-between p-5">
          <p className="text-4xl font-bold">Reviews</p>
          <div className="review flex justify-between items-center gap-3">
            <Link className="underline font-semibold" to={""}>
              All Reviews(1,326)
            </Link>
            <Button variant="primary" typeButton="filled">
              Write review
            </Button>
          </div>
        </div>
        <div className="flex p-5">
          <div className="flex justify-center items-center gap-10 w-6/12 border-r border-gray-300">
            <div className="flex flex-col items-center">
              <p className="text-5xl font-bold">4.8</p>
              <p className="text-xl font-semibold">Excellent</p>
              <div className="flex items-center">
                <StarRatingStatic starNumber={5} />
                <p>(1,306)</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-6/12">
              <div className="flex gap-3 *:text-[13px] items-center">
                <p className="w-[80px]">Excellent</p>
                <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                <p>1,113</p>
              </div>

              <div className="flex gap-3 *:text-[13px] items-center">
                <p className="w-[80px]">Good</p>
                <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                <p>1,113</p>
              </div>

              <div className="flex gap-3 *:text-[13px] items-center">
                <p className="w-[80px]">Average</p>
                <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                <p>1,113</p>
              </div>

              <div className="flex gap-3 *:text-[13px] items-center">
                <p className="w-[80px]">Poor</p>
                <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                <p>1,113</p>
              </div>

              <div className="flex gap-3 *:text-[13px] items-center">
                <p className="w-[80px]">Terrible</p>
                <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                <p>1,113</p>
              </div>
            </div>
          </div>

          <div className="w-1/2 *:w-1/3 *:min-w-[130px] *:max-w-[150px]  flex pl-5 gap-4 items-center justify-center flex-wrap">
            <div className="flex flex-col">
              <p className="font-semibold text-md">Rooms</p>
              <div className="flex gap-2 items-center">
                <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                <p className="font-semibold text-[13px]">5.0</p>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-md">Services</p>
              <div className="flex gap-2 items-center">
                <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                <p className="font-semibold text-[13px]">5.0</p>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-md">Value</p>
              <div className="flex gap-2 items-center">
                <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                <p className="font-semibold text-[13px]">5.0</p>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-md">Cleanliness</p>
              <div className="flex gap-2 items-center">
                <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                <p className="font-semibold text-[13px]">5.0</p>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-md">Location</p>
              <div className="flex gap-2 items-center">
                <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                <p className="font-semibold text-[13px]">5.0</p>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-md">Sleep Quatity</p>
              <div className="flex gap-2 items-center">
                <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                <p className="font-semibold text-[13px]">5.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white w-full flex justify-center items-center">
        <div className="w-full p-5">
          {reviewPostMerge.length > 0 && <div>
    
              <p className="text-3xl font-bold mb-5">
                Traverler Photos ({reviewPostMerge.length})
              </p>
            <div className="relative overflow-hidden w-full">
              <div className="grid grid-cols-6 gap-2 max-lg:grid-cols-3">
                {reviewPostMerge.slice(0, 6).map((item, index) => (
                  <img
                    src={item.child.url}
                    alt={item.child.altText}
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                    className={`rounded-md max-w-[300px] w-full aspect-square object-cover cursor-pointer`}
                  />
                ))}

                <ModelMoreInfoImage
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  reviewsOrPostPhoto={reviewAndPost}
                />
              </div>
            </div>
          </div>}
          <div className="AllReviews my-5">
            <p className="text-3xl font-bold">All Reviews ({reviewAndPost.length})</p>
            <div className="flex py-5">
              <div className="tag border-2 border-black p-2 w-20 text-center rounded-full">
                <Icon name="triangle-circle-square" size={18}/>
              </div>
            </div>
          </div>

          <div className="comment flex flex-col gap-4">
            {
              reviewAndPost.map((item)=>{
                return (  <div className=" border border-gray-300 p-10 w-3/4 rounded-2xl shadow flex">
              <div className="infoAvatar w-1/4">
                <img
                  src={item.user.avatar?.url || "https://via.placeholder.com/50"}
                  className=" w-[50px] aspect-square rounded-full"
                />
                <div className="info">
                  <p className="font-bold">{item.user.name}</p>
                  <p>Wrote a review</p>
                  <p>{item.user.address}</p>

                  <div className="date">
                    <p>
                      Date visited: <span className="font-bold">{item.createAt.toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="comment w-3/4">
                <div className="flex justify-between">
                  <div>
                    <StarRatingStatic starNumber={5} />
                    <p className="font-bold text-xl">
                     {item?.title}
                    </p>
                    <p className="text-gray-400 text-sm">{item.createAt.toLocaleDateString()}</p>
                  </div>

                  <div className="edit-report w-[50px]">
                    <i className="fa-solid fa-ellipsis rounded-full p-5 aspect-square hover:bg-gray-200"></i>
                  </div>
                </div>

                <div className="content">
                  <p>
                    {item.comment}
                  </p>

                  <div className="grid-cols-6 grid gap-2">

                    {item.images.map((image)=>{
                      return (<img src={image.url} className="w-full aspect-square object-cover rounded-sm"/>)
                    })}

                  </div>

                  {/* <div className="w-full *:w-1/3 *:min-w-[130px] *:max-w-[150px]  flex pl-5 gap-4 items-center justify-center flex-wrap p-4">
                    <div className="flex flex-col">
                      <p className="font-semibold text-md">Rooms</p>
                      <div className="flex gap-2 items-center">
                        <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                        <p className="font-semibold text-[13px]">5.0</p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <p className="font-semibold text-md">Services</p>
                      <div className="flex gap-2 items-center">
                        <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                        <p className="font-semibold text-[13px]">5.0</p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <p className="font-semibold text-md">Value</p>
                      <div className="flex gap-2 items-center">
                        <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                        <p className="font-semibold text-[13px]">5.0</p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <p className="font-semibold text-md">Cleanliness</p>
                      <div className="flex gap-2 items-center">
                        <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                        <p className="font-semibold text-[13px]">5.0</p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <p className="font-semibold text-md">Location</p>
                      <div className="flex gap-2 items-center">
                        <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                        <p className="font-semibold text-[13px]">5.0</p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <p className="font-semibold text-md">Sleep Quatity</p>
                      <div className="flex gap-2 items-center">
                        <div className="bg-black w-full h-2.5 rounded-2xl"></div>
                        <p className="font-semibold text-[13px]">5.0</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
)
              })
            }
          
              
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
