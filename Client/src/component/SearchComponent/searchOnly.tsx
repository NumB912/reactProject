import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputBar } from "../UI";

interface SearchProp {
  placeHolder: string;
  value: string;
  onSearch: () => void;
  onChange: (value: string) => void;
}

const Search = ({ onChange, onSearch, placeHolder }: SearchProp) => {
  return (
    <div className="flex justify-center items-center w-full gap-3 relative max-sm:flex-wrap max-sm:border max-sm:border-gray-200 max-sm:shadow max-sm:p-5 max-sm:rounded-2xl">
      <div className="relative w-full h-full flex justify-center items-center">
        <i className="fa-solid fa-magnifying-glass absolute left-6"></i>
        <InputBar placeholder={placeHolder} onChange={onChange} />
      </div>
      <Button
        onClick={onSearch}
        className="w-35 font-bold right-2 max-sm:w-full min-sm:absolute"
        rounded="full"
        variant="primary"
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
