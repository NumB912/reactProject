import React from "react";
import Ticker from "./ticker";

const Tickers = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="font-bold text-md">Chọn vé</p>
        <Ticker />
        <Ticker />
        <Ticker />
      </div>
    </>
  );
};

export default Tickers;
