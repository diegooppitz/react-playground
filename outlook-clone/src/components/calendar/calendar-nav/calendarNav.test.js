import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CalendarNav from '@/components/calendar/calendar-nav';
import * as dateUtils from '@/utils/dates/manage_infos';

jest.mock('@/utils/dates/manage_infos', () => ({
  manageWeekInfos: jest.fn(),
}));

describe('CalendarNav Component', () => {
  beforeEach(() => {
    dateUtils.manageWeekInfos.mockReturnValue({ formattedRange: 'Mar 26 - Apr 01' });
  });

  it('should display the formatted date range', () => {
    const { getByText } = render(<CalendarNav setCurrentDay={() => {}} calendarData={{}} />);
    expect(getByText('Mar 26 - Apr 01')).toBeTruthy();
  });

  it('should call setCurrentDay with "Mar 26" when Today button is clicked', () => {
    const mockSetCurrentDay = jest.fn();
    const { getByText } = render(<CalendarNav setCurrentDay={mockSetCurrentDay} calendarData={{}} />);
    
    fireEvent.click(getByText('Today'));
    expect(mockSetCurrentDay).toHaveBeenCalledWith("Mar 26");
  });

  it('should not display any date range when formattedRange is not provided', () => {
    dateUtils.manageWeekInfos.mockReturnValue({});
    const { queryByText } = render(<CalendarNav setCurrentDay={() => {}} calendarData={{}} />);
    
    expect(queryByText('Mar 26 - Apr 01')).not.toBeInTheDocument();
  });

  it('should handle null return from manageWeekInfos correctly', () => {
    dateUtils.manageWeekInfos.mockReturnValue(null);
    const { queryByTestId } = render(<CalendarNav setCurrentDay={() => {}} calendarData={{}} />);
    expect(queryByTestId('calendar-nav-date-range')).not.toBeInTheDocument();
  });
  
  it('should handle undefined return from manageWeekInfos correctly', () => {
    dateUtils.manageWeekInfos.mockReturnValue(undefined);
    const { queryByTestId } = render(<CalendarNav setCurrentDay={() => {}} calendarData={{}} />);
    expect(queryByTestId('calendar-nav-date-range')).not.toBeInTheDocument();
  });
});
