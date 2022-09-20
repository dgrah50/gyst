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
  onCreateJournalEntry: (day: keyof Days) => void;
}

export default function Sidebar(props: ISidebarProps): JSX.Element {
  const { className, days, selectedDay, onCreateJournalEntry } = props;


  return (
    <Menu className={`${className}  text-white`} style={{ width: "250px" }}>
      <div className="pt-2 pl-2 text-lg text-white">
        entries
      </div>
      {Object.keys(days).map((day) => {
        const rating = days[day].rating;
        
return <MenuItem key={day} label={day} rating={rating} isActive={day === selectedDay} onClickDate={() => onCreateJournalEntry(day)} onCreateJournalEntry={() => onCreateJournalEntry(day)} />
      })}
    </Menu>
  );
}
