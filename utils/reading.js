/**
 * Retrieves a list of readings for a specified number of days.
 * Generates random readings values for each day.
 *
 * @param {number} daysRange - The number of days for which to retrieve readings. Default is 1200 days.
 * @returns {Array} An array of objects representing readings, each containing a time and value.
 */
export const getReadings = async (daysRange = 1200) => {
  const now = Date.now();
  const hour = 1000 * 60 * 60;
  return [...new Array(daysRange)].map((_, dayIndex) => ({
    time: now - dayIndex * hour,
    value: Math.random() * 0.7 + 0.4,
  }));
};


export const groupByDay = (readings) => {
  const groupedByDay = readings.reduce((curr, { time, value }) => {
    const readingDate = new Date(time);
    const day = new Date(
      readingDate.getFullYear(),
      readingDate.getMonth(),
      readingDate.getDate()
    ).getTime();
    if (!curr[day]) curr[day] = 0;
    curr[day] += value;
    return curr;
  }, {});

  return Object.entries(groupedByDay).map(([day, value]) => ({
    time: Number(day),
    value,
  }));
};

export const sortByTime = (readings) => {
  return [...readings].sort(
    (readingA, readingB) => readingA.time - readingB.time
  );
};
