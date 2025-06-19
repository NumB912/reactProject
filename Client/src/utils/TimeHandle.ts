//liệt kê ngày trong tháng
export function DaysOfMonth(month: number, year: number): Date[] {
  const date: Date[] = [];
  const days = new Date(year, month, 1);

  while (days.getMonth() === month) {
    date.push(new Date(days));
    days.setDate(days.getDate() + 1);
  }

  return date;
}


//trừ ngày
export const getDaysBetween = (d1: Date, d2: Date): number => {
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};


//trừ ngày
export const getDayDiff = (d1: Date, d2: Date): number => {
  const date1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const date2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

  const diffTime = date2.getTime() - date1.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

//Kiểm tra có phải hôm nay không
export const isToday = (d?: Date) =>
  d instanceof Date &&
  !isNaN(d.getTime()) &&
  d.toDateString() === new Date().toDateString();

export const isSameDay = (d1?: Date, d2?: Date): boolean => {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

//Tạo ngày để cho phù hợp với thứ
export function getDateHandle(datesBook: Date[]): (Date | undefined)[] {
  if (datesBook.length === 0 || !datesBook[0] || !datesBook.at(-1)) {
    return [];
  }

  const startPadding = Array(datesBook[0].getDay()).fill(undefined);
  const endPadding = Array(7 - datesBook.at(-1)!.getDay()).fill(undefined);

  return [...startPadding, ...datesBook, ...endPadding];
}
//chỉnh dạng cho ngày
export function formatDate(date?: Date | null): string {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export const isBetween = (date: Date, start: Date, end: Date) => {
  return date > start && date < end;
};

