import { create } from "zustand";

interface TimeStore {
  isDropOffTimeSelected: boolean;
  timeDropOffSelected: string;
  isPickUpTimeSelected:boolean;
  timePickUpTimeSelected:string
  setIsDropOffTimeSelected: (selected: boolean) => void;
  setTimeDropOffSelected: (time: string) => void;
  setIsPickUpTimeSelected:(selected:boolean)=>void;
  setTimePickUpTimeSelected:(time:string)=>void
}

export const useTimeStore = create<TimeStore>((set) => ({
  isDropOffTimeSelected: false,
  timeDropOffSelected: "10:00 AM",
  isPickUpTimeSelected: false,
  timePickUpTimeSelected: "10:00 AM",
  setIsDropOffTimeSelected: (selected: boolean) => set({ isDropOffTimeSelected: selected }),
  setTimeDropOffSelected: (time: string) => set({ timeDropOffSelected: time }),
  setIsPickUpTimeSelected: (selected: boolean) => set({ isPickUpTimeSelected: selected }),
  setTimePickUpTimeSelected: (time: string) => set({ timePickUpTimeSelected: time }),
}));
