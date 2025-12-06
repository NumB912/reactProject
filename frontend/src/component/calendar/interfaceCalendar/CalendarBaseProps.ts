
export interface CalendarBaseProps {
  dates: Date[];
  dateSelected: Date | null;
  isOpen?:boolean;
  setIsOpen?: (isOpen: boolean) => void;
  onSelected: (date: Date) => void;
  nextMonth: () => void;
  prevMonth: () => void;
  onSetToday?: () => void;
  onSetThisWeek?:()=>void;
  onSetNextWeek?: () => void;
}



export interface CalendarOneMonthWithTimer extends CalendarBaseProps{
  selectTime: string;
  dateEndSelected?:Date|null;
  dateStartSelected?:Date|null;
  setSelectTime: (time: string) => void;
}

export interface CalendarTwoMonth extends CalendarBaseProps{
    nextMonthDates: Date[];
    dateEndSelected?: Date | null;
    onEndSelected?: (date: Date) => void;
}



 
