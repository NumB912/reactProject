import react from "react";
import { Link } from "react-router";
import RatingStar from "../component/SIdeBarFilter/OptionType/OptionMaterial/StarRatingRadioOption";
import hotel1 from "../assets/42769_14072300320020409156.webp";
const Comment = () => {
  return (
    <div className="w-full bg-gray-100 m-10 flex justify-center items-center flex-col">
      <div className="w-8/10 p-3">
        <div className="totalReview flex justify-between p-5">
          <p className="text-4xl font-bold">Reviews</p>
          <div className="review flex justify-between items-center gap-3">
            <Link className="underline font-semibold">All Reviews(1,326)</Link>
            <button className="bg-black text-white p-4 rounded-full font-bold cursor-pointer">
              Write reviews
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="flex justify-center items-center gap-10 w-6/12 border-r border-gray-300">
            <div className="flex flex-col items-center">
              <p className="text-5xl font-bold">4.8</p>
              <p className="text-xl font-semibold">Excellent</p>
              <div className="flex items-center">
                <RatingStar stars={5} />
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
        <div className="w-8/10 p-5">
          <div>
            {" "}
            <p className="text-3xl font-bold">Traverler Photos (554)</p>
          </div>
          <div className="relative overflow-hidden w-full">
            <div className="flex p-3 gap-3">
              {Array(10)
                .fill(hotel1)
                .map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Hotel ${index}`}
                    className="aspect-square object-cover rounded w-[150px] shrink-0"
                  />
                ))}
            </div>

            {/* Lớp overlay mờ dần sang trong suốt ở phía phải */}
            <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent"></div>
          </div>

          <div className="AllReviews">
            <p className="text-3xl font-bold">All Reviews</p>
            <div className="flex py-5">
              <div className="tag border-2 border-black p-2 w-20 text-center rounded-full">
                <p>
                  <i class="fa-solid fa-filter"></i> filter
                </p>
              </div>
            </div>
          </div>

          <div className="commen flex flex-col gap-9">
            <div className=" border border-gray-400 p-10 w-3/4 rounded-2xl shadow flex">
              <div className="infoAvatar w-1/4">
                <img
                  src={hotel1}
                  className=" w-[50px] aspect-square rounded-full"
                />
                <div className="info">
                  <p className="font-bold">Cheerry</p>
                  <p>Wrote a review</p>
                  <p>Location</p>
                  <p>9 contributions</p>

                  <div className="date">
                    <p>
                      Date visited: <span className="font-bold">May 2025</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="comment w-3/4">
                <div className="flex justify-between">
                  <div>
                    <RatingStar stars={5} />
                    <p className="font-bold text-xl">
                      Best hotel i've ever stay
                    </p>
                    <p className="text-gray-400 text-sm">5 days ago</p>
                  </div>

                  <div className="edit-report w-[50px]">
                    <i className="fa-solid fa-ellipsis rounded-full p-5 aspect-square hover:bg-gray-200"></i>
                  </div>
                </div>

                <div className="content">
                  <p>
                    {" "}
                    This is a really lovely hotel in an excellent location. The
                    mezzanine is an inviting place to work, read, have breakfast
                    or a chat. The lobby lounge is gorgeous and if the Tusk bar
                    is too full, you can have a quiet drink out there. I was
                    travelling on my own for work, and found the room to be
                    perfectly sized with a very dreamy bed and furnishings. I
                    loved the turn of the century décor, the marble staircase
                    and the service was friendly and warm.
                  </p>

                  <div className="w-full *:w-1/3 *:min-w-[130px] *:max-w-[150px]  flex pl-5 gap-4 items-center justify-center flex-wrap p-4">
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

                  <div className="w-full flex justify-end">
                    <button className=" rounded-full p-3 hover:bg-gray-200">
                      <i class="fa-solid fa-thumbs-up"></i> Helpful votes
                    </button>
                  </div>
                  <div className="border-l border-gray-40  pl-5 ">
                    <div className="supplier-reply flex justify-between items-center w-full">
                      <div className="img reply flex gap-3 items-center">
                        <img
                          src={hotel1}
                          className="w-[50px] h-[50px] aspect-square rounded-full shrink-0"
                        />
                        <div className="info flex flex-col">
                          <p className="font-bold">Amal Bouabid</p>
                          <p className="">
                            Guest Services / Front Office at The Evelyn Hotel
                          </p>
                          <p className="text-gray-400 text-sm">5 days ago</p>
                        </div>
                      </div>
                      <div className="edit-report">
                        <button className="rounded-full  w-[50px] h-[50px] p-3 aspect-square hover:bg-gray-200">
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                      </div>
                    </div>

                    <p>
                      {" "}
                      This is a really lovely hotel in an excellent location.
                      The mezzanine is an inviting place to work, read, have
                      breakfast or a chat. The lobby lounge is gorgeous and if
                      the Tusk bar is too full, you can have a quiet drink out
                      there. I was travelling on my own for work, and found the
                      room to be perfectly sized with a very dreamy bed and
                      furnishings. I loved the turn of the century décor, the
                      marble staircase and the service was friendly and warm.
                    </p>
                  </div>
                </div>
              </div>
            </div>

              <div className=" border border-gray-400 p-10 w-3/4 rounded-2xl shadow flex">
              <div className="infoAvatar w-1/4">
                <img
                  src={hotel1}
                  className=" w-[50px] aspect-square rounded-full"
                />
                <div className="info">
                  <p className="font-bold">Cheerry</p>
                  <p>Wrote a review</p>
                  <p>Location</p>
                  <p>9 contributions</p>

                  <div className="date">
                    <p>
                      Date visited: <span className="font-bold">May 2025</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="comment w-3/4">
                <div className="flex justify-between">
                  <div>
                    <RatingStar stars={5} />
                    <p className="font-bold text-xl">
                      Best hotel i've ever stay
                    </p>
                    <p className="text-gray-400 text-sm">5 days ago</p>
                  </div>

                  <div className="edit-report w-[50px]">
                    <i className="fa-solid fa-ellipsis rounded-full p-5 aspect-square hover:bg-gray-200"></i>
                  </div>
                </div>

                <div className="content">
                  <p>
                    {" "}
                    This is a really lovely hotel in an excellent location. The
                    mezzanine is an inviting place to work, read, have breakfast
                    or a chat. The lobby lounge is gorgeous and if the Tusk bar
                    is too full, you can have a quiet drink out there. I was
                    travelling on my own for work, and found the room to be
                    perfectly sized with a very dreamy bed and furnishings. I
                    loved the turn of the century décor, the marble staircase
                    and the service was friendly and warm.
                  </p>

                  <div className="w-full *:w-1/3 *:min-w-[130px] *:max-w-[150px]  flex pl-5 gap-4 items-center justify-center flex-wrap p-4">
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

                  <div className="w-full flex justify-end">
                    <button className=" rounded-full p-3 hover:bg-gray-200">
                      <i class="fa-solid fa-thumbs-up"></i> Helpful votes
                    </button>
                  </div>
                  <div className="border-l border-gray-40  pl-5 ">
                    <div className="supplier-reply flex justify-between items-center w-full">
                      <div className="img reply flex gap-3 items-center">
                        <img
                          src={hotel1}
                          className="w-[50px] h-[50px] aspect-square rounded-full shrink-0"
                        />
                        <div className="info flex flex-col">
                          <p className="font-bold">Amal Bouabid</p>
                          <p className="">
                            Guest Services / Front Office at The Evelyn Hotel
                          </p>
                          <p className="text-gray-400 text-sm">5 days ago</p>
                        </div>
                      </div>
                      <div className="edit-report">
                        <button className="rounded-full  w-[50px] h-[50px] p-3 aspect-square hover:bg-gray-200">
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                      </div>
                    </div>

                    <p>
                      {" "}
                      This is a really lovely hotel in an excellent location.
                      The mezzanine is an inviting place to work, read, have
                      breakfast or a chat. The lobby lounge is gorgeous and if
                      the Tusk bar is too full, you can have a quiet drink out
                      there. I was travelling on my own for work, and found the
                      room to be perfectly sized with a very dreamy bed and
                      furnishings. I loved the turn of the century décor, the
                      marble staircase and the service was friendly and warm.
                    </p>
                  </div>
                </div>
              </div>
            </div>

              <div className=" border border-gray-400 p-10 w-3/4 rounded-2xl shadow flex">
              <div className="infoAvatar w-1/4">
                <img
                  src={hotel1}
                  className=" w-[50px] aspect-square rounded-full"
                />
                <div className="info">
                  <p className="font-bold">Cheerry</p>
                  <p>Wrote a review</p>
                  <p>Location</p>
                  <p>9 contributions</p>

                  <div className="date">
                    <p>
                      Date visited: <span className="font-bold">May 2025</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="comment w-3/4">
                <div className="flex justify-between">
                  <div>
                    <RatingStar stars={5} />
                    <p className="font-bold text-xl">
                      Best hotel i've ever stay
                    </p>
                    <p className="text-gray-400 text-sm">5 days ago</p>
                  </div>

                  <div className="edit-report w-[50px]">
                    <i className="fa-solid fa-ellipsis rounded-full p-5 aspect-square hover:bg-gray-200"></i>
                  </div>
                </div>

                <div className="content">
                  <p>
                    {" "}
                    This is a really lovely hotel in an excellent location. The
                    mezzanine is an inviting place to work, read, have breakfast
                    or a chat. The lobby lounge is gorgeous and if the Tusk bar
                    is too full, you can have a quiet drink out there. I was
                    travelling on my own for work, and found the room to be
                    perfectly sized with a very dreamy bed and furnishings. I
                    loved the turn of the century décor, the marble staircase
                    and the service was friendly and warm.
                  </p>

                  <div className="w-full *:w-1/3 *:min-w-[130px] *:max-w-[150px]  flex pl-5 gap-4 items-center justify-center flex-wrap p-4">
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

                  <div className="w-full flex justify-end">
                    <button className=" rounded-full p-3 hover:bg-gray-200">
                      <i class="fa-solid fa-thumbs-up"></i> Helpful votes
                    </button>
                  </div>
                  <div className="border-l border-gray-40  pl-5 ">
                    <div className="supplier-reply flex justify-between items-center w-full">
                      <div className="img reply flex gap-3 items-center">
                        <img
                          src={hotel1}
                          className="w-[50px] h-[50px] aspect-square rounded-full shrink-0"
                        />
                        <div className="info flex flex-col">
                          <p className="font-bold">Amal Bouabid</p>
                          <p className="">
                            Guest Services / Front Office at The Evelyn Hotel
                          </p>
                          <p className="text-gray-400 text-sm">5 days ago</p>
                        </div>
                      </div>
                      <div className="edit-report">
                        <button className="rounded-full  w-[50px] h-[50px] p-3 aspect-square hover:bg-gray-200">
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                      </div>
                    </div>

                    <p>
                      {" "}
                      This is a really lovely hotel in an excellent location.
                      The mezzanine is an inviting place to work, read, have
                      breakfast or a chat. The lobby lounge is gorgeous and if
                      the Tusk bar is too full, you can have a quiet drink out
                      there. I was travelling on my own for work, and found the
                      room to be perfectly sized with a very dreamy bed and
                      furnishings. I loved the turn of the century décor, the
                      marble staircase and the service was friendly and warm.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
