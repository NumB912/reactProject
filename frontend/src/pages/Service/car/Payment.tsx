import React from "react";
import { Link } from "react-router-dom";

const Payment = () => {
  return (
    <div className="flex flex-col justify-center w-full max-w-md gap-3 *:flex *:flex-col *:gap-1">
      <div>
        <label className="text-[14px] font-bold">Cardholder Name</label>
        <input
          type="text"
          placeholder="Cardholder Name"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div>
        <label className="text-[14px] font-bold">Card Number</label>
        <input
          type="text"
          placeholder="Card Number"
          className="border border-gray-300 rounded-md p-2 w-full"
          maxLength={19}
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-[14px] font-bold">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            className="border border-gray-300 rounded-md p-2 w-full"
            maxLength={5}
          />
        </div>
        <div className="flex-1">
          <label className="text-[14px] font-bold">CVC</label>
          <input
            type="text"
            placeholder="CVC"
            className="border border-gray-300 rounded-md p-2 w-full"
            maxLength={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
