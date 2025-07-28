import { create } from "zustand";
import { addDays, DaysOfMonth, getEndOfWeek, isSameDay, isToday } from "../../utils/TimeHandle";
import { unstable_setDevServerHooks } from "react-router";
import { HotelCalendarStore } from "./interface/CalendarStore";



export const useCalendarHotel = create<HotelCalendarStore>((set, get) => {
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
    isSelectedCheckOut: false,
    isShowCalendar: false,
    setIsShowCalendar: (isShow: boolean) => set({ isShowCalendar: isShow }),

    setDateSelectedBook: (date: Date) => {
      if (isToday(date) || date < new Date()) {
        return;
      }

      if (get().dateSelectedCheckOut !== undefined && date > get().dateSelectedCheckOut!) {
            
        set({
            dateSelectedBook:get().dateSelectedCheckOut,
            dateSelectedCheckOut:date,
        })

        return;
      }

      if (get().datesNextMonth.some((d) => isSameDay(date, d))) {
        get().nextMonth();
      }

      set({ dateSelectedBook: date });
      set({ isSelectedBook: true });
    },

    setDateSelectedCheckOut: (date: Date) => {
      const { dateSelectedBook } = get();
      if (isToday(date) || date < new Date()) {
        return;
      }
      if (isSameDay(date, dateSelectedBook)) {
        set({
          dateSelectedCheckOut: undefined,
          dateSelectedBook:undefined,
        });
        return;
      }

      if (date < dateSelectedBook) {
        set({
          dateSelectedCheckOut: dateSelectedBook,
          dateSelectedBook: date,
          isSelectedBook: true,
          isSelectedCheckOut: false,
        });
        return;
      }
      set({ dateSelectedCheckOut: date });
    },

    setThisMonth: () => {
      const now = new Date();
      set({
        datesBook: DaysOfMonth(now.getMonth(), now.getFullYear()),
        datesNextMonth: DaysOfMonth(now.getMonth() + 1, now.getFullYear()),
      });
    },


    setThisWeek() {
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);

      set({
        datesBook: Array.from({ length: 7 }, (_, i) => {
          const date = new Date(startOfWeek);
          date.setDate(date.getDate() + i);
          return date;
        }),
        datesNextMonth: [],
      });
    },

    setTodayMonth: () => {
      const now = new Date();
      set({
        datesBook: DaysOfMonth(now.getMonth(), now.getFullYear()),
        datesNextMonth: DaysOfMonth(now.getMonth() + 1, now.getFullYear()),
      });
    },

    setDatesBook: (dates: Date[]) => set({ datesBook: dates }),
    setDatesNextMonth: (dates: Date[]) => set({ datesNextMonth: dates }),
    setIsSelectedBook: (isSelected: boolean) =>
      set({ isSelectedBook: isSelected }),
    setIsSelectedCheckOut: (isSelected: boolean) =>
      set({ isSelectedCheckOut: isSelected }),

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
        dateSelectedCheckOut: ret,
        isSelectedBook: false,
        isSelectedCheckOut: false,
      });
    },
  SetThisWeek:()=>{
    const today = new Date()
    const sunday = getEndOfWeek(today)
    if(today === sunday){
      return
    }

    set({
        dateSelectedBook:today,
        dateSelectedCheckOut:sunday,
    })
  },
SetNextWeek: () => {
  const today = new Date();
  const nextMonday = addDays(getEndOfWeek(today),1);
  const nextSunday = addDays(nextMonday, 6);

  set({
    dateSelectedBook: nextMonday,
    dateSelectedCheckOut: nextSunday,
  })
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
        dateSelectedCheckOut: ret,
        datesBook: DaysOfMonth(now.getMonth(), now.getFullYear()),
        datesNextMonth: DaysOfMonth(now.getMonth() + 1, now.getFullYear()),
        isSelectedBook: false,
        isSelectedCheckOut: false,
      });
    },
  };
});
