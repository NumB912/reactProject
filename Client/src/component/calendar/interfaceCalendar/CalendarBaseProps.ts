
export interface CalendarBaseProps {
  dates: Date[];
  dateSelected: Date | null;
  onSelected: (date: Date) => void;
  nextMonth: () => void;
  prevMonth: () => void;
  type: "hotel" | "rentalCar" | "Tour";
}



export interface CalendarOneMonthWithTimer extends CalendarBaseProps{
  selectTime: string;
  dateEndSelected?:Date|null;
  dateStartSelected?:Date|null;
  setSelectTime: (time: string) => void;
  type:"rentalCar",
  titleTypeSeletedDate:string;
}

export interface CalendarTwoMonth extends CalendarBaseProps{
    nextMonthDates: Date[];
    dateEndSelected?: Date | null;
    onEndSelected?: (date: Date) => void;
    onSetThisMonth?:()=>void;
    onSetTodayMonth?:()=>void;
    onSetThisWeek?:()=>void;
}



 
