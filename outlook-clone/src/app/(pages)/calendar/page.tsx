'use client';
import React, { useEffect, useState } from 'react';
import CalendarNav from '@/components/calendar/calendar-nav';
import {
  getFormattedDateInfo,
  getEventSuggestedDate,
} from '@/utils/dates/get_infos';
import { manageDayInfos } from '@/utils/dates/manage_infos';
import { CalendarDataTypes, WeekDay, EventDataTypes } from '@/types';
import './calendar.scss';
import EventModal from '@/components/calendar/event-modal';
import { formatDate } from '@/utils/dates/format_infos';

export const dayDateInfo = (dayData: any) => {
  const { weekDay, monthDay, dateIsToday } = manageDayInfos(dayData) || {};
  return { weekDay, monthDay, dateIsToday };
};

const Calendar: React.FC = () => {
  const [eventsData, setEventsData] = useState<EventDataTypes[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [suggestedDate, setSuggestedDate] = useState({
    selectedDate: '',
    startTime: '',
    endTime: '',
  });
  const [weekToGo, setWeekToGo] = useState<number>(0);

  const calendarData: CalendarDataTypes = getFormattedDateInfo(weekToGo);
  const weekData: WeekDay[] = getFormattedDateInfo(weekToGo).week;
  const hasWeekData = weekData?.length > 0;

  const openEventModal = async (selectedDate: string) => {
    const initialEventData = getEventSuggestedDate();
    setSuggestedDate({ selectedDate, ...initialEventData });
    setModalIsOpen(true);
  };

  const fetchEventData = async () => {
    try {
      const response = await fetch('/api/calendar', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newEventsData = await response.json();
      setEventsData(newEventsData);
    } catch (error) {
      console.error('request error:', error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  return (
    <div data-testid="calendar-fullscreen" className="calendar-fullscreen">
      {hasWeekData && (
        <>
          <CalendarNav
            calendarData={calendarData}
            setWeekToGo={setWeekToGo}
            weekToGo={weekToGo}
          />

          <div className="week-grid">
            {weekData.map((dayData, index) => {
              const { monthDay, weekDay, dateIsToday } =
                dayDateInfo(dayData) || {};
              const dayDate = formatDate(dayData.date);
              const isToday = dateIsToday
                ? 'date-day-today date-day'
                : 'date-day';

              return (
                <div
                  key={index}
                  className="date-column"
                  onClick={() => openEventModal(dayDate)}
                >
                  <div
                    data-testid={`date-wrapper-${index}`}
                    className="date-wrapper"
                  >
                    <span
                      data-testid={`week-day-${index}`}
                      className="week-day"
                    >
                      {weekDay}
                    </span>
                    <span
                      data-testid={`month-day-${index}`}
                      className={isToday}
                    >
                      {monthDay}
                    </span>
                  </div>

                  {eventsData.map((event, id) => {
                    const eventDate = formatDate(new Date(event.date));

                    if (eventDate === dayDate) {
                      return (
                        <div key={id} className="event-block">
                          <strong>{event.title}</strong>
                          <div>{`${event.startTime} - ${event.endTime}`}</div>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              );
            })}
          </div>

          <EventModal
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            suggestedDate={suggestedDate}
          />
        </>
      )}
    </div>
  );
};

export default Calendar;
