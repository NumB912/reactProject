import { create } from "zustand";

interface FilterState {
  minPrice: number;
  maxPrice: number;
  selectedAmenities: string[];
  selectedRating: number;
  selectedStars:number;
  hotelClasses:string[];
  style: string[];
  location:string;
  rangeLeft:number;
  rangeRight:number;

  setLocation:(location:string)=> void;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
  toggleStar: (star: number) => void;
  toggleAmenity: (amenity: string) => void;
  toggleHotelClasses:(hotelClass:string)=>void;
  toggleHotelStyle:(hotelStyle:string)=>void;
  setRating: (rating: number) => void;
  setStyle: (style: string) => void;
  setRangeLeft:(rangeLeft:number)=>void;
  setRangeRight:(rangeRight:number)=>void;
  resetFilters: () => void;
}

export const useHotelFilter = create<FilterState>((set, get) => ({
  minPrice: 0,
  maxPrice: 100,
  selectedStars: 5,
  selectedAmenities: [],
  selectedRating: 0,
  style: [],
  location:"",
  hotelClasses:[],
  rangeLeft: 0,
  rangeRight: 100,


  setMinPrice: (value) => set({ minPrice: value }),
  setMaxPrice: (value) => set({ maxPrice: value }),

  toggleHotelClasses:(hotelClass:string)=>{
    const hotelClasses:string[] = get().hotelClasses;

    set({
      hotelClasses: hotelClasses.includes(hotelClass)
        ? hotelClasses.filter((c) => c !== hotelClass)
        : [...hotelClasses, hotelClass]
    })
  },

  toggleHotelStyle: (hotelStyle: string) => {
    const styles = get().style;
    set({
      style: styles.includes(hotelStyle)
        ? styles.filter((s) => s !== hotelStyle)
        : [...styles, hotelStyle],
    });
  },

  toggleStar: (star) => {
    set({selectedStars:star});
  },

  toggleAmenity: (amenity) => {
    const amenities = get().selectedAmenities;
    set({
      selectedAmenities: amenities.includes(amenity)
        ? amenities.filter((a) => a !== amenity)
        : [...amenities, amenity],
    });
  },

  setRating: (rating) => set({ selectedRating: rating }),

  setStyle: (style) => {
    const styles = get().style;
    set({
      style: styles.includes(style)
        ? styles.filter((s) => s !== style)
        : [...styles, style],
    });
  },

  setLocation:(location:string)=>{
    set({location:location});
  },

  setRangeLeft: (rangeLeft: number) => set({ rangeLeft }),
  setRangeRight: (rangeRight: number) => set({ rangeRight }),

  resetFilters: () =>
    set({
      minPrice: 0,
      maxPrice: 1000,
      selectedAmenities: [],
      selectedRating: 0,
      style: [],
      location: "",
      hotelClasses: [],
      rangeLeft: 0,
      rangeRight: 0,
    }),
}));
