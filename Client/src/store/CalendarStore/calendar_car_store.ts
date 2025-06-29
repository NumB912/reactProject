import { create } from "zustand";
import { DaysOfMonth } from "../../utils/TimeHandle";

export interface Prop {
  datesPickUp: Date[];
  datesDropOff: Date[];
  timePickUpTimeSelected: string;
  timeDropOffTimeSelected: string;
  dateSelectedPickUp: Date;
  isDateSelectedPickUp: boolean;
  isDateSelected: boolean;
  dateSelectedDropOff: Date;
  isDateSelectedDropOff: boolean;
  today: Date;

  setDateSelectedPickup: (date: Date) => void;
  setdateSelectedDropOff: (date: Date) => void;

  

  nextMonthDatesPickUp: () => void;
  prevMonthDatesPickUp: () => void;
  nextMonthDatesDropOff: () => void;
  prevMonthDatesDropOFf: () => void;
  setDatesPickUp: (dates: Date[]) => void;
  setDatesDropOff:(dates:Date[])=>void
  reset: () => void;
  SetToday: () => void;
  setDatesPickUpFromDate: (date: Date) => void;
  setDatesDropOffFromDate: (date: Date) => void;
}

export const useCalendarCarStore = create<Prop>((set, get) => ({
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

  setDateSelectedPickup: (date) => {
    if (date >= get().dateSelectedDropOff) {
      set({ dateSelectedDropOff: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1) });
    }
    set({ dateSelectedPickUp: date });
  },

  setIsDateSelectedPickUp: (bl: any) => {
    set({ isDateSelectedPickUp: bl });
  },

  setIsDateSelectedDropOff: (bl: any) => {
    set({ isDateSelectedDropOff: bl });
  },

  setdateSelectedDropOff: (date) => {
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

