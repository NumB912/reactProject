import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputBar } from "../UI";

interface SearchProp {
  placeHolder: string;
  value: string;
  onSearch: () => void;
  onChange: (value: string) => void;
}

const Search = ({ onChange, onSearch, placeHolder,value }: SearchProp) => {
  
  return (
    <div className="flex justify-center items-center w-full gap-3 relative max-sm:flex-wrap max-sm:border max-sm:border-gray-200 max-sm:shadow max-sm:p-5 max-sm:rounded-2xl max-w-7xl">
        <InputBar value={value} placeholder={placeHolder} onChange={onChange} nameIcon="magnifying-glass"/>
      <Button
        onClick={onSearch}
        className="max-w-[200px] w-full font-bold absolute -right-2 h-full"
        rounded="full"
        variant="primary"
      >
        Tìm kiếm
      </Button>
    </div>
  );
};

export default Search;
