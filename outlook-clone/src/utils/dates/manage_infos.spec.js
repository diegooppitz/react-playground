import { manageWeekInfos, checkDateIsToday } from "@/utils/dates/manage_infos";

describe('Manage Infos util file', () => {
  describe('checkDateIsToday', () => {
    it('should return true for the current date', () => {
      const today = new Date();
      expect(checkDateIsToday(today)).toBeTruthy();
    });

    it('should return false for a date that is not today', () => {
      const notToday = new Date('2023-12-31');
      expect(checkDateIsToday(notToday)).toBeFalsy();
    });
  });

  describe('manageWeekInfos', () => {
    it('should return the correct details of the week given a valid input', () => {
      const mockCalendarData = {
        firstDay: '2024-01-01',
        lastDay: '2024-01-07',
        currentYear: 2024,
        formattedRange: '1 Jan - 7 Jan',
      };
      const result = manageWeekInfos(mockCalendarData);
      expect(result).toEqual({
        firstDay: '2024-01-01',
        lastDay: '2024-01-07',
        year: 2024,
        formattedRange: '1 Jan - 7 Jan',
      });
    });

    it('should return null for empty or invalid calendar data', () => {
      expect(manageWeekInfos(null)).toBeNull();
      expect(manageWeekInfos({})).toBeNull();
    });
  });
});
