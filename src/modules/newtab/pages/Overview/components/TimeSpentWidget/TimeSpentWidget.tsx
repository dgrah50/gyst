import dayjs from 'dayjs';
import React from 'react';
import { BlockSiteList } from '../../../timetracker/components/BlockSiteList';
import { WhiteListSiteList } from '../../../timetracker/components/WhitelistSiteList';
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
  // TODO: Get last weeks time spent
  // const lastWeekTime = getWeeklyTimeSpentLastWeek(timeSpent);

  return (
    <WidgetBase
      className='overflow-hidden timespent-widget'>
      distraction management
      <div className='flex flex-row flex-1 w-full min-h-0'>
        <div className="flex flex-col items-center w-1/2 min-h-0 p-2">
          <h1 className="pb-2 text-lg text-white">time spent (last week) (this week)</h1>
          <div className='overflow-y-scroll'>
            {[...Object.entries(weekTime)]
              .sort(([, av], [, bv]) => bv - av)
              .map(([website, duration]) => <Row
                key={website}
                siteName={website}
                duration={duration} />)}
          </div>
        </div>
        <div
          className="flex flex-col items-center w-1/2 min-h-0 p-2 overflow-y-scroll ">
          <h1 className="pb-2 text-lg text-white">blocked websites</h1>
          <BlockSiteList />
          <h1 className="pb-2 text-lg text-white">allowed websites</h1>
          <WhiteListSiteList />
        </div>
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