import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap-fork-dgrahh';

import WidgetBase from '../WidgetBase/WidgetBase';
import 'react-calendar-heatmap-fork-dgrahh/dist/styles.css';
import './JournalStreakWidget.scss';

// const xLabels = new Array(8).fill(0).map((_, i) => `${i}`);
// const yLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const today = new Date();

export default function JournalStreakWidget(): JSX.Element {

  return (
    <WidgetBase
      className='p-2 journalstreak-widget'>
      journal (streak 7 days)
      <StreakGrid />
    </WidgetBase>
  );
}


function StreakGrid() {
  const randomValues = getRange(20).map(index => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(1, 9),
    };
  });

  const startDate = shiftDate(today, -19);
  const endDate = today;

  return (
    <CalendarHeatmap
      startDate={startDate}
      endDate={endDate}
      values={randomValues}
      firstWeekdayMonday
      weekdayLabels={["sun", "mon", "tue", "wed", "thu", "fri", "sat"]}
      monthLabels={["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]}
      gutterSize={5}
      shouldPadWeekdayLabels={false}

      classForValue={value => {
        return `color-white-${value.count}`;
      }}
      transformDayElement={(element: React.ReactElement, value) => (
        <g>
          {element}
          <text
            x={element.props.x + 3}
            y={element.props.y + 8}
            className={`text-color-${value.count}`}
            style={{
              fontSize: "0.4em",
              // fill: "#ff0000"
            }}>
            {value.count}
          </text>
        </g>
      )}
      // tooltipDataAttrs={(value: { date: { toISOString: () => string | string[]; }; count: number; }) => {
      //   return {
      //     'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${value.count
      //       }`,
      //   };
      // }}
      showWeekdayLabels
      onClick={value => console.log(`Clicked on value with count: ${value}`)} />
  )
}

function shiftDate(date: Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);

  return newDate;
}

function getRange(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
