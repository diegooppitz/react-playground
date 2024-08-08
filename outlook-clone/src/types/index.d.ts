import React from "react";

export type CalendarDataTypes = {
  week: WeekDay[];
  firstDay: string;
  lastDay: string;
  currentYear: string | Number;
  today: Date;
  formattedRange?: string;
};

export type CalendarNavPropsTypes = {
  calendarData: CalendarDataTypes | null;
  setWeekToGo: React.Dispatch;
  weekToGo: any;
};

export type SuggestedDate = {
  selectedDate: string;
  startTime: string;
  endTime: string;
};

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  suggestedDate: SuggestedDate;
};

export type EventDataTypes = {
  id: number | null,
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
};

export type WeekDay = {
  name: string;
  weekDay: string;
  date: Date;
};