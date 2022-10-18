import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap-fork-dgrahh';
import { useJournalEntriesWithDateKey } from '@stores/journalStore';

import WidgetBase from '../WidgetBase/WidgetBase';
import 'react-calendar-heatmap-fork-dgrahh/dist/styles.css';
import './JournalStreakWidget.scss';
import { calculateJournalStreak, StreakGridProps } from './JournalStreakWidgetUtils';

export default function JournalStreakWidget(): JSX.Element {

  const journalEntries = useJournalEntriesWithDateKey()

  const heatmapData = [...journalEntries]
    .filter(([_, entry]) => entry.rating !== null)
    .map(([date, entry]) => ({ date, count: entry.rating }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  const streak = calculateJournalStreak(heatmapData);

  return (
    <WidgetBase
      className='p-2 journalstreak-widget'>
      {`journal (${streak} day streak!)`}
      <StreakGrid heatmapData={heatmapData} />
    </WidgetBase>
  );
}

function StreakGrid({ heatmapData }: StreakGridProps) {
  const today = new Date();

  const startDate = heatmapData.at(-1)?.date ?? today

  return (
    <CalendarHeatmap
      startDate={startDate}
      endDate={today}
      values={heatmapData}
      firstWeekdayMonday
      weekdayLabels={["sun", "mon", "tue", "wed", "thu", "fri", "sat"]}
      monthLabels={["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]}
      gutterSize={5}
      shouldPadWeekdayLabels={false}

      classForValue={value => {
        if (value) {
          return `color-white-${value.count}`;
        }

        return 'color-white-0';
      }}
      transformDayElement={(element: React.ReactElement, value) => (
        <g>
          {element}
          <text
            x={element.props.x + 3}
            y={element.props.y + 8}
            className={`text-font-size text-color-${value?.count}`}>
            {value?.count}
          </text>
        </g>
      )}
      showWeekdayLabels
      onClick={value => console.log(`Clicked on value with count: ${value}`)} />
  )
}
