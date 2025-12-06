import { create } from "zustand";

interface FilterState {
  minPrice: number;
  maxPrice: number;
  selectedDuration: string[];
  selectedRating: number;
  selectedCategories: string[];
  rangeLeft:number;
  rangeRight:number;

  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
  toggleStar: (star: number) => void;
  setRating: (rating: number) => void;
  setRangeLeft:(rangeLeft:number)=>void;
  setRangeRight:(rangeRight:number)=>void;
  setDuration:(value:string)=>void;
  setCategories:(value:string)=>void;
  resetFilters: () => void;
}

export const useTourFilter = create<FilterState>((set, get) => ({
  minPrice: 0,
  maxPrice: 100,
  selectedRating: 0,
  selectedDuration:[],
  selectedCategories:[],
  rangeLeft: 0,
  rangeRight: 100,


  setMinPrice: (value) => set({ minPrice: value }),
  setMaxPrice: (value) => set({ maxPrice: value }),

  toggleStar: (star: number) => {
    set({ selectedRating: get().selectedRating === star ? 0 : star });
  },

  setRating: (rating) => set({ selectedRating: rating }),

  setDuration: (value: string) => {
    const durations = get().selectedDuration;
    set({
      selectedDuration: durations.includes(value)
        ? durations.filter((d) => d !== value)
        : [...durations, value],
    });
  },

  setCategories: (value: string) => {
    const categories = get().selectedCategories;
    set({
      selectedCategories: categories.includes(value)
        ? categories.filter((c) => c !== value)
        : [...categories, value],
    });
  },

  setRangeLeft: (rangeLeft: number) => set({ rangeLeft }),
  setRangeRight: (rangeRight: number) => set({ rangeRight }),

  resetFilters: () =>
    set({
      minPrice: 0,
      maxPrice: 100,
      selectedRating: 0,
      selectedDuration: [],
      selectedCategories: [],
      rangeLeft: 0,
      rangeRight: 100,
    }),

}));
