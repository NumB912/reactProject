import { useState, useEffect, useRef } from "react";
import api from "../../API/api";

interface UseProvinceSearchReturn {
  errorSearch: string;
  setErrorSearch: (dest: string) => void;
  selectDest: ward | Province | undefined;
  setSelectDest: (dest: ward | Province) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  provinces: Province[];
  loading: boolean;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  wards: ward[];
  searchResult: (ward | Province)[];
  handleSelectDestination:(dest: ward | Province) => void;
}

export interface Province {
  code: string;
  codeName: string;
  fullName: string;
  fullNameEn: string;
  name: string;
  nameEn: string;
}

export interface ward {
  code: string;
  codeName: string;
  fullName: string;
  fullNameEn: string;
  name: string;
  nameEn: string;
  provinces: {
    fullName: string;
  };
}

const MIN_SEARCH_LENGTH = 1;
const DEBOUNCE_DELAY = 200;
const MAX_RESULTS = 6;

export const useProvinceSearch = (): UseProvinceSearchReturn => {
  const [searchText, setSearchText] = useState<string>("");
  const [provinces, setProvinces] = useState<Province[]>([]);  
  const [wards, SetWard] = useState<ward[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<(ward | Province)[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [selectDest, setSelectDest] = useState<Province | ward>();
  const [errorSearch, setErrorSearch] = useState<string>("");

  useEffect(() => {
    const query = searchText.trim();
    if (query.length < MIN_SEARCH_LENGTH) {
      setProvinces([]);
      setShowSuggestions(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setLoading(true);
    setShowSuggestions(true);
    timeoutRef.current = setTimeout(() => {
      api
        .get<{ success: boolean; provinces: Province[]; wards: ward[] }>(
          "/location/search",
          {
            params: { q: query },
          }
        )
        .then((res) => {
          const data = res?.data;
          const province = data.provinces || [];
          const ward = data.wards || [];
          setProvinces(province);
          SetWard(ward);
          setSearchResult([...province, ...ward]);
        })
        .catch((err) => {
          console.error("Lỗi tìm tỉnh/thành:", err);
          setProvinces([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, DEBOUNCE_DELAY);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchText]);


  const handleSelectDestination = (dest: Province | ward) => {
    setShowSuggestions(false);
    setSelectDest(dest);
    setSearchText(dest.name);
  };

  return {
    handleSelectDestination,
    errorSearch,
    setErrorSearch,
    selectDest,
    setSelectDest,
    searchText,
    setSearchText,
    provinces,
    loading,
    showSuggestions,
    setShowSuggestions,
    wards,
    searchResult,
  };
};
