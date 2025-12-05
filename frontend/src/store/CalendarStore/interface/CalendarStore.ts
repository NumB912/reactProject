export interface CarCalendarStore {
    datesPickUp: Date[];
    datesDropOff: Date[];
    timePickUpSelected: string;
    timeDropOffSelected: string;
    dateSelectedPickUp: Date;
    isDateSelectedPickUp: boolean;
    isDateSelected: boolean;
    dateSelectedDropOff: Date;
    isDateSelectedDropOff: boolean;
    today: Date;
    isDropOffTimeSelected: boolean;
    isPickUpTimeSelected: boolean;

    setIsDropOffTimeSelected: (selected: boolean) => void;
    setTimeDropOffSelected: (time: string) => void;
    setIsPickUpTimeSelected: (selected: boolean) => void;
    setTimePickUpTimeSelected: (time: string) => void

    setDateSelectedPickup: (date: Date) => void;
    setdateSelectedDropOff: (date: Date) => void;

    setIsDateSelectedPickUp: (isDateSelectedPickup: boolean) => void;
    setIsDateSelectedDropOff: (isDateSelectedDropOff: boolean) => void;

    nextMonthDatesPickUp: () => void;
    prevMonthDatesPickUp: () => void;
    nextMonthDatesDropOff: () => void;
    prevMonthDatesDropOFf: () => void;

    setDatesPickUpFromDate: (date: Date) => void;
    setDatesDropOffFromDate: (date: Date) => void;

    setDatesPickUp: (dates: Date[]) => void;
    setDatesDropOff: (dates: Date[]) => void

    reset: () => void;
    SetToday: () => void;
}

export interface HotelCalendarStore {
    dateSelectedBook: Date;
    dateSelectedCheckOut: Date | undefined;
    today: Date;
    datesBook: Date[];
    datesNextMonth: Date[];
    isSelectedBook: boolean;
    isSelectedCheckOut: boolean;
    isShowCalendar?: boolean;

    setIsShowCalendar?: (isShow: boolean) => void
    setIsSelectedBook: (isSelected: boolean) => void;
    setIsSelectedCheckOut: (isSelected: boolean) => void;
    setDateSelectedBook: (dateBook: Date) => void;
    setDateSelectedCheckOut: (dateReturn: Date) => void;
    setDatesBook: (dates: Date[]) => void;
    setDatesNextMonth: (dates: Date[]) => void;

    SetToday: () => void;
    SetNextWeek: () => void;
    SetThisWeek: () => void;

    prevMonth: () => void;
    nextMonth: () => void;

    resetDatesOnly: () => void;
    resetAll: () => void;
}

export interface TourCalenDarStore {
    dateSelectedBook: Date;
    today: Date;
    datesBook: Date[];
    datesNextMonth: Date[];
    isSelectedBook: boolean;
    isOpen: boolean;

    setIsOpen: (isOpen: boolean) => void;
    setIsSelectedBook: (isSelected: boolean) => void;
    setDateSelectedBook: (dateBook: Date) => void;
    setDatesBook: (dates: Date[]) => void;
    setDatesNextMonth: (dates: Date[]) => void;
    prevMonth: () => void;
    nextMonth: () => void;
    SetToday: () => void;
    resetDatesOnly: () => void;
    resetAll: () => void;
}
