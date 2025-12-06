import { create } from "zustand";
import { DaysOfMonth, isSameDay, isToday } from "../../utils/TimeHandle";
import { unstable_setDevServerHooks } from "react-router";

export interface Prop {
  dateSelectedBook: Date;
  dateSelectedReturn: Date|undefined;
  today: Date;
  datesBook: Date[];
  datesNextMonth: Date[];
  isSelectedBook: boolean;
  isSelectedReturn: boolean;

  setIsSelectedBook: (isSelected: boolean) => void;
  setIsSelectedReturn: (isSelected: boolean) => void;
  setDateSelectedBook: (dateBook: Date) => void;
  setDateSelectedReturn: (dateReturn: Date) => void;
  setDatesBook: (dates: Date[]) => void;
  setDatesNextMonth: (dates: Date[]) => void;
  setThisMonth: () => void;
  setThisWeek: () => void;
  setTodayMonth: () => void;
  prevMonth: () => void;
  nextMonth: () => void;
  SetToday: () => void;
  resetDatesOnly: () => void;
  resetAll: () => void;
}

export const useCalendarFlight = create<Prop>((set, get) => {
  const today = new Date();

  return {
    today,
    dateSelectedBook: new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1),
    dateSelectedReturn: new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+2),
    datesBook: DaysOfMonth(today.getMonth(), today.getFullYear()),
    datesNextMonth: DaysOfMonth(today.getMonth() + 1, today.getFullYear()),
    isSelectedBook: true,
    isSelectedReturn: false,

    setDateSelectedBook: (date: Date) => {
      if (isToday(date) || date < new Date()) {
        return;
      }

      if(get().datesNextMonth.some(d=>isSameDay(date,d))){
        get().nextMonth()
      }

      set({ dateSelectedBook: date });
      set({ isSelectedBook: true });
    },

    setDateSelectedReturn: (date: Date) => {
      const { dateSelectedBook } = get();
      if (isToday(date) || date < new Date()) {
        return;
      }
      if (isSameDay(date, dateSelectedBook)) {
        set({ isSelectedBook: false });
        set({dateSelectedReturn:undefined})
        set({isSelectedReturn:false})
        return;
      }

      if (date < dateSelectedBook) {
        set({ dateSelectedReturn: dateSelectedBook });
        set({ dateSelectedBook: date });
        set({ isSelectedBook: true });
        set({ isSelectedReturn: false });
        return;
      }
      set({ dateSelectedReturn: date });
    },

    setDatesBook: (dates: Date[]) => set({ datesBook: dates }),
    setDatesNextMonth: (dates: Date[]) => set({ datesNextMonth: dates }),
    setIsSelectedBook: (isSelected: boolean) =>
      set({ isSelectedBook: isSelected }),
    setIsSelectedReturn: (isSelected: boolean) =>
      set({ isSelectedReturn: isSelected }),

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

    setTodayMonth: () => {
      const now = new Date();
      set({
        datesBook: DaysOfMonth(now.getMonth(), now.getFullYear()),
        datesNextMonth: DaysOfMonth(now.getMonth() + 1, now.getFullYear()),
      });
    },

    setThisMonth() {
      const now = new Date();
      set({
        datesBook: DaysOfMonth(now.getMonth(), now.getFullYear()),
        datesNextMonth: DaysOfMonth(now.getMonth() + 1, now.getFullYear()),
      });
    },

    setThisWeek: () => {
      const now = new Date();
      const startOfWeek = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay()
      );
      set({
        datesBook: DaysOfMonth(startOfWeek.getMonth(), startOfWeek.getFullYear()),
        datesNextMonth: DaysOfMonth(startOfWeek.getMonth() + 1, startOfWeek.getFullYear()),
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
        dateSelectedReturn: ret,
        isSelectedBook: false,
        isSelectedReturn: false,
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
        dateSelectedReturn: ret,
        datesBook: DaysOfMonth(now.getMonth(), now.getFullYear()),
        datesNextMonth: DaysOfMonth(now.getMonth() + 1, now.getFullYear()),
        isSelectedBook: false,
        isSelectedReturn: false,
      });
    },
  };
});
