import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./searchOnly";
import api from "../../../API/api";
import { useProvinceSearch } from "../../hook/useSearchLocation";

const SearchHotel: React.FC = () => {
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    searchText,
    setSearchText,
    showSuggestions,
    setShowSuggestions,
    searchResult,
    handleSelectDestination,
    loading,
    errorSearch,
    setErrorSearch,
  } = useProvinceSearch();

  const searchTextRef = useRef<string>("");
  useEffect(() => {
    searchTextRef.current = searchText;
  }, [searchText]);

  const performSearch = () => {
    const query = searchTextRef.current.trim();
    if (!query) {
      setErrorSearch("Vui lòng nhập địa điểm bạn muốn đến");
      return;
    }
    const encoded = encodeURI(query);
    navigate(`/hotels?search=${query}`);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4" ref={wrapperRef}>
      <div className="relative">
        <Search
          placeHolder="Bạn muốn đi đâu? (Đà Lạt, Hà Nội, Phú Quốc...)"
          value={searchText}
          onChange={(value) => {
            setSearchText(value);
            if (value.trim()) {
              setShowSuggestions(true);
            }
          }}
          onSearch={performSearch} 
        />

        {showSuggestions && searchText.length > 0 && (
          <div
            onMouseDown={(e) => e.preventDefault()}
          >
            {loading ? (
              <div className="px-5 py-8 text-center text-gray-500">
                Đang tìm kiếm...
              </div>
            ) : searchResult.length > 0 ? (
              <ul className="py-2 max-h-96 overflow-y-auto">
                {searchResult.map((dest) => (
                  <li key={dest.code}>
                    <button
                      onClick={() => {
                        handleSelectDestination(dest);
                        setShowSuggestions(false);
                      }}
                      className="w-full px-5 py-3 flex items-center gap-3 hover:bg-gray-100 transition text-left"
                    >
                      <div>
                        <div className="font-semibold text-gray-900">
                          {dest.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {dest.province
                            ? dest.province.fullName
                            : dest.fullName || "Việt Nam"}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-5 py-8 text-center text-gray-500">
                Không tìm thấy địa điểm nào
              </div>
            )}
          </div>
        )}

        {errorSearch && (
          <p className="mt-2 text-sm text-red-600 text-center">{errorSearch}</p>
        )}
      </div>
    </div>
  );
};

export default SearchHotel;