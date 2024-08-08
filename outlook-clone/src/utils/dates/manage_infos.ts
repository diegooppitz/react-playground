export const checkDateIsToday = (date: Date): boolean => {
    const dateString = date.toDateString();
    const todayString = new Date().toDateString();

    return dateString === todayString;
}

export const findSundayInfo =  (): Date => {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day;

    return new Date(date.setDate(diff));
  };

export const manageWeekInfos = (calendarData: any): any => {
    const calendarDataKeys = calendarData && Object.keys(calendarData);
    if (!calendarData || calendarDataKeys?.length === 0) return null;

    const firstDay = calendarData?.firstDay;
    const lastDay = calendarData?.lastDay;
    const year = calendarData?.currentYear;
    const formattedRange = calendarData?.formattedRange;

    return { firstDay, lastDay, year, formattedRange };
};

export const manageDayInfos = (dayData: any): any => {
    const date = new Date(dayData.date);

    const month = date.getMonth() + 1;
    const monthDay = date.getDate();

    const year = date.getFullYear(); 
    const dateIsToday = checkDateIsToday(date);

    const weekDay = dayData.weekDay;

    return { month, monthDay, weekDay, year, dateIsToday };
};