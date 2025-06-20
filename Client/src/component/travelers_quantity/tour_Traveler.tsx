import React from "react";
import Button from "../Button";
import useTravelerHotel from "../../store/traveler_store_hotel";
import useTravelerTour from "../../store/traveler_store_tour";

interface TagTickerProps {
  onClose: (isShown:boolean) => void;
}

const Traveler_Tour: React.FC<TagTickerProps> = ({ onClose }) => {
  const {
    incrementAdult,
    decrementAdult,
    incrementChildren,
    decrementChildren,
    tempAdultQuantity,
    tempChildrenQuantity,
    submitTravelerData,
    maxAdultQuantity,
    minAdultQuantity,
    setTotal,
    resetTempTravelerData
  } = useTravelerTour();
  return (
    <div className="traverSelected relative p-10 w-[340px]" onClick={(e)=>{e.stopPropagation()}}>
      <div className="absolute top-0 right-0 p-4" onClick={()=>{
        onClose(false)}}>
        <i className="fa-solid fa-xmark"></i>
      </div>

      <div className="flex gap-6 flex-col border-b pb-4 border-gray-300">
        {/* Room */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-3">
          <div className="w-1/2">
            <p className="font-bold">Room</p>
          </div>
        </div>

        {/* AdultAdult */}
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <p className="font-bold">Adult</p>
          </div>
          <div className="select flex gap-2 items-center w-1/2 justify-end">
            <button
              className={`minus bg-black rounded-full text-center flex p-3 cursor-pointer ${minAdultQuantity==tempAdultQuantity?"bg-gray-200":""}`}
              onClick={() => decrementAdult()}
              disabled={minAdultQuantity==tempAdultQuantity?true:false}
            >
              <i className="fa-solid fa-minus text-white"></i>
            </button>
            <p className="quantity text-center text-md w-6">{tempAdultQuantity}</p>
            <button
              className={`plus bg-black rounded-full text-center flex p-3 cursor-pointer ${maxAdultQuantity==tempAdultQuantity?"bg-gray-200":""}`}
              onClick={() => incrementAdult()}
              disabled={maxAdultQuantity==tempAdultQuantity?true:false}
            >
              <i className="fa-solid fa-plus text-white"></i>
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <p className="font-bold">Children</p>
          </div>
          <div className="select flex gap-2 items-center w-1/2 justify-end">
            <button
              className={`minus bg-black rounded-full text-center flex p-3 cursor-pointer ${tempChildrenQuantity==0?"bg-gray-200":""}`}
              onClick={() => decrementChildren()}
            >
              <i className="fa-solid fa-minus text-white"></i>
            </button>
            <p className="quantity text-center text-md w-6">
              {tempChildrenQuantity}
            </p>
            <button
              className={`plus bg-black rounded-full text-center flex p-3 cursor-pointer`}
              onClick={() => incrementChildren()}
            >
              <i className="fa-solid fa-plus text-white"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Reset + Apply */}
      <div className="tagHandle pt-4 flex justify-between items-center">
        <div
          className="underline text-black font-semibold cursor-pointer"
          onClick={resetTempTravelerData}
        >
          Reset
        </div>

        <Button className="w-30" onClick={()=>{submitTravelerData()
          setTotal()

        }}>
          <p>Update</p>
        </Button>
      </div>
    </div>
  );
};

export default Traveler_Tour;
