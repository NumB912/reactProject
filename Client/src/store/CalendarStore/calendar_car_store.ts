import { create } from "zustand";
import { DaysOfMonth, getEndOfWeek } from "../../utils/TimeHandle";
import { CarCalendarStore } from "./interface/CalendarStore";

export const useCalendarCarStore = create<CarCalendarStore>((set, get) => ({
  datesPickUp: DaysOfMonth(new Date().getMonth(), new Date().getFullYear()),
  datesDropOff: DaysOfMonth(new Date().getMonth() + 1, new Date().getFullYear()),
  timePickUpTimeSelected: "",
  timeDropOffTimeSelected: "",
  isDateSelectedDropOff: false,
  dateSelectedPickUp: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
  isDateSelectedPickUp: false,
  dateSelectedDropOff: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2),
  isDateSelected: false,
  today: new Date(),
  isDropOffTimeSelected: false,
  timeDropOffSelected: "10:00 AM",
  isPickUpTimeSelected: false,
  timePickUpSelected: "10:00 AM",

  setIsDropOffTimeSelected: (selected: boolean) => set({ isDropOffTimeSelected: selected }),
  setTimeDropOffSelected: (time: string) => set({ timeDropOffSelected: time }),
  setIsPickUpTimeSelected: (selected: boolean) => set({ isPickUpTimeSelected: selected }),
  setTimePickUpTimeSelected: (time: string) => set({ timePickUpSelected: time }),
  

  setDateSelectedPickup: (date:Date) => {
    if(date <= new Date()){
      return
    }

    if (date >= get().dateSelectedDropOff) {
      set({ dateSelectedDropOff: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1) });
    }
    set({ dateSelectedPickUp: date });
  },

  setIsDateSelectedPickUp: (bl: boolean) => {
    set({ isDateSelectedPickUp: bl });
  },

  setIsDateSelectedDropOff: (bl: boolean) => {
    set({ isDateSelectedDropOff: bl });
  },

  setdateSelectedDropOff: (date: Date) => {
    const pickUpDate = get().dateSelectedPickUp;
    if (date <= pickUpDate) {
      set({
        dateSelectedDropOff: new Date(
          pickUpDate.getFullYear(),
          pickUpDate.getMonth(),
          pickUpDate.getDate() + 1
        ),
      });
      return;
    }
    set({ dateSelectedDropOff: date });
  },

  nextMonthDatesPickUp: () => {
    const { datesPickUp } = get();
    const current = datesPickUp[0];
    const next = new Date(current.getFullYear(), current.getMonth() + 1, current.getDate());
    const nextMonthDates = DaysOfMonth(next.getMonth(), next.getFullYear());
    set({
      datesPickUp: nextMonthDates,
    });
  },

  prevMonthDatesPickUp: () => {
    const { datesPickUp } = get();
    const current = datesPickUp[0];
    const prev = new Date(current.getFullYear(), current.getMonth() - 1, current.getDate());
    const prevMonthDates = DaysOfMonth(prev.getMonth(), prev.getFullYear());
    set({
      datesPickUp: prevMonthDates,
    });
  },

  nextMonthDatesDropOff: () => {
    const { datesDropOff } = get();
    const current = datesDropOff[0];
    const next = new Date(current.getFullYear(), current.getMonth() + 1, current.getDate());
    const nextmonth = DaysOfMonth(next.getMonth(), next.getFullYear());
    set({
      datesDropOff: nextmonth,
    });
  },

  prevMonthDatesDropOFf: () => {
    const { datesDropOff } = get();
    const current = datesDropOff[0];
    const prev = new Date(current.getFullYear(), current.getMonth() - 1, current.getDate());
    const prevMonthDates = DaysOfMonth(prev.getMonth(), prev.getFullYear());
    set({
      datesDropOff: prevMonthDates,
    });
  },

  setDatesPickUp: (dates: Date[]) => {
    set({ datesPickUp: dates });
  },

  setDatesDropOff: (dates: Date[]) => {
    set({ datesDropOff: dates });
  },


  setDatesPickUpFromDate: (date: Date) => {

    set({ datesPickUp: DaysOfMonth(date.getMonth(), date.getFullYear()) });
  },

  setDatesDropOffFromDate: (date: Date) => {
    set({ datesDropOff: DaysOfMonth(date.getMonth(), date.getFullYear()) });
  },

  reset: () => {
    const current = new Date();
    set({
      datesPickUp: DaysOfMonth(current.getMonth(), current.getFullYear()),
      datesDropOff: DaysOfMonth(current.getMonth() + 1, current.getFullYear()),
      dateSelectedPickUp: new Date(),
      isDateSelectedPickUp: false,
      dateSelectedDropOff: new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1),
      isDateSelectedDropOff: false,
      isDateSelected: false,
      today: new Date(),
    });
  },

  SetToday: () => {
    const current = new Date();
    set({
      datesPickUp: DaysOfMonth(current.getMonth(), current.getFullYear()),
      datesDropOff: DaysOfMonth(current.getMonth() + 1, current.getFullYear()),
    });
  },
 
}));

