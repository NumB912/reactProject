// store/useBookingHotelStore.ts
import { create } from "zustand";

export type Destination = Province | Ward | null;

export interface Province {
  code: string;
  name: string;
  fullName: string;
}

export interface Ward {
  code: string;
  name: string;
  fullName: string;
  provinces: { fullName: string };
}

interface BookingState {
  // Search & Location
  searchText: string;
  destination: Destination;
  showSuggestions: boolean;
  location: string;
  
  // Price
  minPrice: number;
  maxPrice: number;
  rangeLeft: number;
  rangeRight: number;

  selectedAmenities: number[];
  selectedRating: number;
  selectedPropertyTypes: string[];
  selectHotelTypes: string[];
  style: string[];

  setSearchText: (text: string) => void;
  setDestination: (dest: Destination) => void;
  setShowSuggestions: (show: boolean) => void;
  setLocation: (location: string) => void;
  setSelectRating: (value: number) => void;

  setRangeLeft: (value: number) => void;
  setRangeRight: (value: number) => void;
  setMaxPrice: (value: number) => void;
  setMinPrice: (value: number) => void;

  toggleAmenity: (amenity: number) => void;
  setRating: (rating: number) => void;
  togglePropertyType: (type: string) => void;
  toggleHotelTypes: (cls: string) => void;
  toggleStyle: (style: string) => void;

  resetFilters: () => void;
}

export const useBookingHotelStore = create<BookingState>((set, get) => ({
  searchText: "",
  destination: null,
  showSuggestions: false,
  location: "",

  minPrice: 0,
  maxPrice: 10_000_000,
  rangeLeft: 0,
  rangeRight: 10_000_000,

  selectedAmenities: [],
  selectedRating: 0,
  selectedPropertyTypes: [],
  selectHotelTypes: [],
  style: [],

  setMaxPrice(value) {
    set({
      maxPrice: value,
    });
  },
  setMinPrice(value) {
    set({
      minPrice: value,
    });
  },
  setSelectRating(value) {
    set({
      selectedRating: value,
    });
  },

  setSearchText: (text) =>
    set({
      searchText: text,
      location: text,
    }),

  setDestination: (dest) =>
    set({
      destination: dest,
      searchText: dest?.name || "",
      location: dest?.name || "",
      showSuggestions: false,
    }),

  setShowSuggestions: (show) => set({ showSuggestions: show }),
  setLocation: (location) => set({ location }),

  setRangeLeft: (value) => set({ rangeLeft: value }),
  setRangeRight: (value) => set({ rangeRight: value }),

  toggleAmenity: (amenity) =>
    set((state) => ({
      selectedAmenities: state.selectedAmenities.includes(amenity)
        ? state.selectedAmenities.filter((a) => a !== amenity)
        : [...state.selectedAmenities, amenity],
    })),

  setRating: (rating) => set({ selectedRating: rating }), // "4 sao trở lên" → chỉ cần 1 giá trị

  togglePropertyType: (type) =>
    set((state) => ({
      selectedPropertyTypes: state.selectedPropertyTypes.includes(type)
        ? state.selectedPropertyTypes.filter((t) => t !== type)
        : [...state.selectedPropertyTypes, type],
    })),

  toggleHotelTypes: (cls) =>
    set((state) => ({
      selectHotelTypes: state.selectHotelTypes.includes(cls)
        ? state.selectHotelTypes.filter((c) => c !== cls)
        : [...state.selectHotelTypes, cls],
    })),

  toggleStyle: (style) =>
    set((state) => ({
      style: state.style.includes(style)
        ? state.style.filter((s) => s !== style)
        : [...state.style, style],
    })),

  resetFilters: () =>
    set({
      selectedAmenities: [],
      selectedRating: 0,
      selectedPropertyTypes: [],
      selectHotelTypes: [],
      style: [],
      rangeLeft: 0,
      rangeRight: 10_000_000,
      // Giữ lại location/searchText để không làm mất chỗ người dùng đang tìm
    }),
}));
