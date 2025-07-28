import { create } from "zustand";
import { addDays, DaysOfMonth, getEndOfWeek, isSameDay, isToday } from "../../utils/TimeHandle";
import { unstable_setDevServerHooks } from "react-router";
import { TourCalenDarStore } from "./interface/CalendarStore";



export const useTourCalendar = create<TourCalenDarStore>((set, get) => {
  const today = new Date();

  return {
    today,
    dateSelectedBook: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1
    ),
    dateSelectedCheckOut: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 2
    ),
    datesBook: DaysOfMonth(today.getMonth(), today.getFullYear()),
    datesNextMonth: DaysOfMonth(today.getMonth() + 1, today.getFullYear()),
    isSelectedBook: false,
    isOpen: false,
    
    setIsOpen: (isOpen: boolean) => set({ isOpen }),

    setDateSelectedBook: (date: Date) => {
      if (isToday(date) || date < new Date()) {
        return;
      }

      if (get().datesNextMonth.some((d) => isSameDay(date, d))) {
        get().nextMonth();
      }

      set({ dateSelectedBook: date });
      set({ isSelectedBook: true });
    },

    setDatesBook: (dates: Date[]) => set({ datesBook: dates }),
    setDatesNextMonth: (dates: Date[]) => set({ datesNextMonth: dates }),
    setIsSelectedBook: (isSelected: boolean) =>
      set({ isSelectedBook: isSelected }),

    prevMonth: () => {
      const current = get().datesBook[0];
      const prev = new Date(current.getFullYear(), current.getMonth() - 1, 1);
      set({
        datesNextMonth: get().datesBook,
        datesBook: DaysOfMonth(prev.getMonth(), prev.getFullYear()),
      });
    },

    nextMonth: () => {
      const current = get().datesNextMonth[0];
      const next = new Date(current.getFullYear(), current.getMonth() + 1, 1);
      set({
        datesBook: get().datesNextMonth,
        datesNextMonth: DaysOfMonth(next.getMonth(), next.getFullYear()),
      });
    },

    SetToday: () => {
      const now = new Date();
      set({
        datesBook: DaysOfMonth(now.getMonth(), now.getFullYear()),
      });
    },

    setThisMonth() {
      const now = new Date();
      set({
        datesBook: DaysOfMonth(now.getMonth(), now.getFullYear()),
        datesNextMonth: DaysOfMonth(now.getMonth() + 1, now.getFullYear()),
      });
    },

    resetDatesOnly: () => {
      const now = new Date();
      const book = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      const ret = new Date(
        book.getFullYear(),
        book.getMonth(),
        book.getDate() + 1
      );
      set({
        dateSelectedBook: book,
        isSelectedBook: false,
      });
    },

    resetAll: () => {
      const now = new Date();
      const book = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      const ret = new Date(
        book.getFullYear(),
        book.getMonth(),
        book.getDate() + 1
      );
      set({
        dateSelectedBook: book,
        datesBook: DaysOfMonth(now.getMonth(), now.getFullYear()),
        datesNextMonth: DaysOfMonth(now.getMonth() + 1, now.getFullYear()),
        isSelectedBook: false,
      });
    },
  };
});
