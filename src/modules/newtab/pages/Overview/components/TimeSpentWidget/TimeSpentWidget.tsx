import dayjs from 'dayjs';
import React from 'react';
import WidgetBase from '../WidgetBase/WidgetBase';
import { useTimeSpentSubscription } from './TimeSpentWidgetHooks';

interface timeSpentSubscriptionData {
  [dateDDMMYYYY: string]: {
    [website: string]: number;
  };
}

export default function TimeSpentWidget(): JSX.Element {
  const timeSpent = useTimeSpentSubscription();
  const weekTime = getWeeklyTimeSpent(timeSpent);

  return (
    <WidgetBase
      className='overflow-hidden timespent-widget'>
      time spent (last week)
      <div className="flex flex-col items-center w-full h-full min-h-0 p-4 overflow-x-scroll ">
        {[...Object.entries(weekTime)]
          .sort(([, av], [, bv]) => bv - av)
          .map(([website, duration]) => <Row
            key={website}
            siteName={website}
            duration={duration} />)}
      </div>

    </WidgetBase>
  );
}


interface RowProps {
  siteName: string;
  duration: number;
}

function Row({ siteName, duration }: RowProps): JSX.Element {

  return (
    <div className='flex flex-row items-center w-64 p-2 m-2 border border-white/25'>
      <div className='flex justify-center w-full text-sm'>{siteName}</div>
      <div className='flex justify-center w-full text-xs text-white/50'>{convertSecondsToReadableTime(duration)}</div>
    </div>

  );
}

const getWeeklyTimeSpent = (timeSpent: timeSpentSubscriptionData) => {
  const startOfWeek = dayjs().startOf('week');

  const weekTime: { [key: string]: number } = {};

  getDatesUntilToday(startOfWeek).forEach((date) => {
    const key = date.format('DD-MM-YYYY');
    if (timeSpent[key]) {
      Object.keys(timeSpent[key]).forEach((website: string) => {
        if (weekTime[website]) {
          weekTime[website] += timeSpent[key][website];
        } else {
          weekTime[website] = timeSpent[key][website];
        }
      });
    }
  });

  return weekTime;
}

const getDatesUntilToday = (startDate: dayjs.Dayjs): dayjs.Dayjs[] => {
  const today = dayjs();
  const dates = [];
  let iterDate = startDate;
  while (iterDate.isBefore(today)) {
    dates.push(iterDate);
    iterDate = iterDate.add(1, 'day');
  }

  return dates;
}

const convertSecondsToReadableTime = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor(duration / 60) % 60;
  const seconds = duration % 60;

  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`
  if (minutes > 0) return `${minutes}m ${seconds}s`

  return `${seconds}s`
}