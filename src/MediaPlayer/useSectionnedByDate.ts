import { DateTime, Interval } from 'luxon';

const now = DateTime.now()

export const useSectionnedByDate = (items) => {
  const intervals = [
    [0, 'Today'],
    [1, 'Last Week'],
    [7, 'Last 2 Weeks'],
    [30, 'Last Month'],
    [90, 'Last 3 Months'],
    [180, 'Last 6 Months'],
    [365, 'Previous Year'],
  ];

  const sections = items.reduce((acc, item) => {
    const interval = Interval.fromDateTimes(DateTime.fromISO(item.metadata.createdAt), now).length('days');
    const displayTime = intervals.find((stamp, i) => interval >= stamp[0] && interval < intervals[i+1][0]);
    if (displayTime) {
      intervals.splice(0, 1);
      return [
        {
          title: displayTime,
          data: [item]
        },
        ...acc,
      ];
    }

    const [current, ...past] = acc;
    if(!displayTime){
      intervals.splice(0, 1);
    }
    return [
      {
        ...current,
        data: [...current.data, item]
      },
      ...past,
    ];
  }, []);

  console.log(sections)
  return sections.reverse();
};
