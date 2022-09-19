import React from 'react';
import { Menu } from 'react-daisyui';
import MenuItem from './MenuItem';
import "react-split-mde/css/index.css"


export interface Day {
  rating: number | null;
  content: string;
}
export type Days = Record<string, Day>;

export interface ISidebarProps {
  className: string;
  days: Days;
  selectedDay?: keyof Days | null;
  setSelectedDay: (day: keyof Days) => void;
  onCreateJournalEntry: (day: keyof Days) => void;
}

export default function Sidebar(props: ISidebarProps): JSX.Element {
  const { className, days, selectedDay, setSelectedDay, onCreateJournalEntry } = props;


  return (
    <Menu className={`${className}  `} style={{ width: "250px" }}>
      {Object.keys(days).map((day) => {
        const rating = days[day].rating;
        return <MenuItem key={day} label={day} rating={rating} isActive={day === selectedDay} onClickDate={() => { console.log(day); setSelectedDay(day) }} onCreateJournalEntry={() => onCreateJournalEntry(day)} />
      })}
    </Menu>
  );
}
