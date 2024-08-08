import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calendar from "./page";
import { dayDateInfo } from './page';
import { getFormattedDateInfo } from "@/utils/dates/get_infos";
import * as dateUtils from "@/utils/dates/manage_infos";

beforeAll(() => {
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(getFormattedDateInfo()) }));
});

afterAll(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe('Calendar page', () => {
  const weekData = getFormattedDateInfo().week;
  it('Test the week Data content', async () => {
    render(<Calendar />);

    weekData.forEach(async (dayData, index) => {
      const dateWrapper = await screen.findByTestId(`date-wrapper-${index}`);
      const weekDay = await screen.findByTestId(`week-day-${index}`);
      const monthDay = await screen.findByTestId(`month-day-${index}`);

      expect(dateWrapper).toBeInTheDocument();
      expect(weekDay).toBeInTheDocument();
      expect(monthDay).toBeInTheDocument();

      expect(weekDay).toHaveTextContent(dayData.weekDay);
      expect(monthDay.textContent).toBeTruthy();
    });
  });

  it("Render month day correctly", async () => {
    render(<Calendar />);

    for (let index = 0; index < weekData.lenght; index++) {
      const dayData = weekData[index];
      const monthDay = await screen.findByTestId(`month-day-${index}`);
      const expectedMonthDay = new Date(dayData.date).getDate().toString();

      expect(monthDay).toHaveTextContent(expectedMonthDay);
    }
  });
});

describe('dayDateInfo function', () => {
  beforeEach(() => {
    jest.spyOn(dateUtils, 'manageDayInfos').mockImplementation((dayData) => {
      if (dayData.date === '2024-04-13') {
        return { weekDay: "Sat", monthDay: 13, dateIsToday: false, month: 4, year: 2024 };
      }
      return null;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('correctly processes data for a specific date', () => {
    const testDayData = { date: '2024-04-13' };
    const result = dayDateInfo(testDayData);

    expect(result).toEqual({
      weekDay: "Sat",
      monthDay: 13,
      dateIsToday: false
    });
  });

  it('returns undefined for data not matching any case', () => {
    const testDayData = { date: 'non-existing-date' };
    const result = dayDateInfo(testDayData);

    expect(result).toEqual({
      weekDay: undefined,
      monthDay: undefined,
      dateIsToday: undefined
    });
  });
});