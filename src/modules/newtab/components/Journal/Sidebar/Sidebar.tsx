import React from 'react';
import { Menu } from 'react-daisyui';
import { JournalEntryMap } from '../../../stores/journalStore';
import { generateHumanDateFromDateId } from '../../../stores/JournalUtils';
import MenuItem from './MenuItem';



export interface ISidebarProps {
  className: string;
  journalEntries: JournalEntryMap;
  selectedDay?: string | null;
  onCreateJournalEntry: (dateID: string) => void;
  setSelectedDay: (dateID: string) => void;
}

export default function Sidebar(props: ISidebarProps): JSX.Element {
  const { className, journalEntries, selectedDay, setSelectedDay, onCreateJournalEntry } = props;

  return (
    <Menu
      className={`${className}  text-white`}
      style={{ width: "250px" }}>
      <div className="pt-2 pl-2 text-lg text-white">
        entries
      </div>
      {[...journalEntries.keys()].map((dateID) => {
        const rating = journalEntries.get(dateID as string)?.rating ?? null;

        return <MenuItem
          key={dateID.toString()}
          label={generateHumanDateFromDateId(dateID.toString())}
          rating={rating}
          isActive={dateID === selectedDay}
          onClickDate={() => setSelectedDay(dateID)}
          onCreateJournalEntry={() => onCreateJournalEntry(dateID)} />
      })}
    </Menu>
  );
}
