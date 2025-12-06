import { create } from "zustand";
import { addDays, DaysOfMonth, getEndOfWeek, isSameDay, isToday } from "../../utils/TimeHandle";
import { unstable_setDevServerHooks } from "react-router";
import { HotelCalendarStore } from "./interface/CalendarStore";


export const useCalendarHotel = create<HotelCalendarStore>((set, get) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate()+1);
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(tomorrow.getDate() + 1);
  return {
    today,
    dateSelectedBook: tomorrow,
    dateSelectedCheckOut: dayAfterTomorrow,

    datesBook: DaysOfMonth(today.getMonth(), today.getFullYear()),
    datesNextMonth: DaysOfMonth(today.getMonth()+1, today.getFullYear()),

    isSelectedBook: false,
    isSelectedCheckOut: false,
    isShowCalendar: false,

    setIsShowCalendar: (isShow: boolean) => set({ isShowCalendar: isShow }),

    setDateSelectedBook: (date: Date) => {
      if (isToday(date) || date < today) return;
      const { dateSelectedCheckOut,isSelectedCheckOut } = get();

      if (dateSelectedCheckOut && date > dateSelectedCheckOut && isSelectedCheckOut) {
        set({
          dateSelectedBook: dateSelectedCheckOut,
          dateSelectedCheckOut: date,
          isSelectedBook: true,
          isSelectedCheckOut: false,
        });
        return;
      }

      if (get().datesNextMonth.some((d) => isSameDay(d, date))) {
        get().nextMonth();
      }

      set({
        dateSelectedBook: date,
        isSelectedBook: true,
        isSelectedCheckOut: false,
      });
    },

    setDateSelectedCheckOut: (date: Date) => {
      if (isToday(date) || date < today) return;

      const { dateSelectedBook } = get();

      if (dateSelectedBook && isSameDay(date, dateSelectedBook)) {
        set({
          isSelectedBook:false,
          isSelectedCheckOut:false,
          dateSelectedBook:undefined,
          dateSelectedCheckOut:undefined
        })
        return;
      }

      if (dateSelectedBook && date < dateSelectedBook) {
        set({
          dateSelectedBook: date,
          dateSelectedCheckOut: dateSelectedBook,
          isSelectedBook: true,
          isSelectedCheckOut: true,
        });
        return;
      }

      set({
        dateSelectedCheckOut: date,
        isSelectedCheckOut: true,
      });
    },


    prevMonth: () => {
      const currentFirstDay = get().datesBook[0];
      const prevMonthFirstDay = new Date(
        currentFirstDay.getFullYear(),
        currentFirstDay.getMonth() - 1,
        1
      );

      console.log(prevMonthFirstDay)

      set({
        datesNextMonth: get().datesBook,
        datesBook: DaysOfMonth(
          prevMonthFirstDay.getMonth(),
          prevMonthFirstDay.getFullYear()
        ),
      });
    },

    nextMonth: () => {
      const nextMonthFirstDay = new Date(
        get().datesNextMonth[0].getFullYear(),
        get().datesNextMonth[0].getMonth()+1,
        1
      );
      
      set({
        datesBook: get().datesNextMonth,
        datesNextMonth: DaysOfMonth(
          nextMonthFirstDay.getMonth(),
          nextMonthFirstDay.getFullYear()
        ),
      });
    },

    setThisMonth: () => {
      const now = new Date();

      set({
        datesBook: DaysOfMonth(now.getMonth(), now.getFullYear()),
        datesNextMonth: DaysOfMonth(now.getMonth() + 1, now.getFullYear()),
      });
    },

    SetToday: () => {
      const now = new Date();
      set({
        datesBook: DaysOfMonth(now.getMonth(), now.getFullYear()),
        datesNextMonth: DaysOfMonth(now.getMonth() + 1, now.getFullYear()),
      });
    },

    setThisWeek: () => {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Chủ nhật tuần này

      const datesOfWeek = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date;
      });

      set({
        datesBook: datesOfWeek,
        datesNextMonth: [],
      });
    },

    SetThisWeek: () => {
      const today = new Date();
      const sunday = getEndOfWeek(today);

      if (isSameDay(today, sunday)) return;

      set({
        dateSelectedBook: new Date(today),
        dateSelectedCheckOut: sunday,
        isSelectedBook: true,
        isSelectedCheckOut: true,
      });
    },

    SetNextWeek: () => {
      const today = new Date();
      const nextMonday = addDays(getEndOfWeek(today), 1);
      const nextSunday = addDays(nextMonday, 6);

      set({
        dateSelectedBook: nextMonday,
        dateSelectedCheckOut: nextSunday,
        isSelectedBook: true,
        isSelectedCheckOut: true,
      });
    },

    resetDatesOnly: () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      const dayAfter = new Date(tomorrow);
      dayAfter.setDate(tomorrow.getDate() + 1);
      console.log("hello")
      set({
        dateSelectedBook: tomorrow,
        dateSelectedCheckOut: dayAfter,
        isSelectedBook: false,
        isSelectedCheckOut: false,
      });
    },

    resetAll: () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      const dayAfter = new Date(tomorrow);
      dayAfter.setDate(tomorrow.getDate() + 1);

      set({
        dateSelectedBook: tomorrow,
        dateSelectedCheckOut: dayAfter,
        datesBook: DaysOfMonth(now.getMonth(), now.getFullYear()),
        datesNextMonth: DaysOfMonth(now.getMonth() + 1, now.getFullYear()),
        isSelectedBook: false,
        isSelectedCheckOut: false,
        isShowCalendar: false,
      });
    },
    setDatesBook: (dates: Date[]) => set({ datesBook: dates }),
    setDatesNextMonth: (dates: Date[]) => set({ datesNextMonth: dates }),
    setIsSelectedBook: (val: boolean) => set({ isSelectedBook: val }),
    setIsSelectedCheckOut: (val: boolean) => set({ isSelectedCheckOut: val }),
  };
});
