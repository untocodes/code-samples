import { splitDateRange } from './split-daterange.util';

describe('splitDateRange', () => {
  it('should give the correct amount of ranges', () => {
    const startDate = new Date('2021-05-01');
    const endDate = new Date('2022-01-01');

    const epocDiff = endDate.getTime() - startDate.getTime();
    const days = Math.ceil(epocDiff / (1000 * 3600 * 24));

    const dateRanges = splitDateRange(startDate, endDate, 7);
    expect(dateRanges.length).toBe(days / 7);
  });
});
