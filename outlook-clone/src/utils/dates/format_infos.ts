import { WeekDay } from "@/types";

export const formatDay = (date: Date) => (`0${date.getUTCDate()}`).slice(-2);

export const formatDateInfo = (mockWeek: WeekDay[]) => {

    const firstDayDate = new Date(mockWeek[0].date);
    const lastDayDate = new Date(mockWeek[mockWeek.length - 1].date);


    const firstMonth = firstDayDate.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
    const lastMonth = lastDayDate.toLocaleString("en-US", { month: "long", timeZone: "UTC" });

    const firstDay = formatDay(firstDayDate);
    const lastDay = formatDay(lastDayDate);

    const formattedRange = `${firstMonth} ${firstDay} - ${(lastMonth === firstMonth ? '' : lastMonth + ' ')}${lastDay}`;

    return {
        firstDayFormatted: formatDay(firstDayDate),
        lastDayFormatted: formatDay(lastDayDate),
        firstMonth,
        firstDay,
        lastMonth,
        lastDay,
        formattedRange,
    };
};

export const formatWeekName = (date: Date): string => {
    return date.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
};

export const formatWeekDay = (date: Date): string => {
    return date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
};

export const formatDate = (date: Date) => {
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${year}-${month}-${day}`;
  };