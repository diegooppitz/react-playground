import React from "react";
import { manageWeekInfos } from "@/utils/dates/manage_infos";
import { CalendarNavPropsTypes } from "@/types";
import "./calendarNav.scss";

const CalendarNav: React.FC<CalendarNavPropsTypes> = ({ calendarData, setWeekToGo, weekToGo }) => {
  const dateInfos = (): string | null => {
    const { formattedRange } = manageWeekInfos(calendarData) || {};
    if (!formattedRange) return null;

    return formattedRange;
  };

  const formattedRange = dateInfos();

  return (
    <div className="calendar-nav">
      <div className="calendar-nav-controls">
        <button
          className="calendar-nav-today-button"
        >
          Today
        </button>
        <div className="calendar-nav-group">
          <button className="calendar-nav-navigation-button" onClick={() => setWeekToGo(--weekToGo)}>
            <i className="fa fa-chevron-left"></i>
          </button>
          <button className="calendar-nav-navigation-button" onClick={() => setWeekToGo(++weekToGo)}>
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
        {formattedRange && (
          <div className="calendar-nav-group">
            <div data-testid="calendar-nav-date-range" className="calendar-nav-date-range">
              {formattedRange}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default CalendarNav;
