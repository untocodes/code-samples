interface dateRange {
  startDate: Date;
  endDate: Date;
}

/**
 * Splits date range into ranges the size of amount of days provided in rangeLength
 *
 * @param startDate date to start from
 * @param endDate date to end on
 * @param rangeLength amount of days to split to
 * @returns array containing date ranges
 */
export const splitDateRange = (startDate, endDate, rangeLength) => {
  const ranges: dateRange[] = [];
  const current = new Date(startDate.getTime());

  do {
    const rangeStart = new Date(current.getTime());
    const rangeEnd = new Date(current.setDate(current.getDate() + rangeLength));

    ranges.push({
      startDate: rangeStart,
      endDate:
        rangeEnd <= endDate
          ? new Date(rangeEnd.setDate(rangeEnd.getDate() - 1))
          : endDate,
    });
  } while (current <= endDate);

  return ranges;
};
