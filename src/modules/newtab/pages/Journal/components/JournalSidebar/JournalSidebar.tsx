import clsx from 'clsx';
import React from 'react';
import { Menu } from 'react-daisyui';
import { JournalEntryMap } from '@stores/journalStore';
import { generateHumanDateFromDateId } from '@stores/journalUtils';
import MenuItem from './JournalMenuItem';

export interface SidebarProps {
  className: string;
  journalEntries: JournalEntryMap;
  selectedDay?: string | null;
  onCreateJournalEntry: (dateID: string) => void;
  setSelectedDay: (dateID: string) => void;
}

// TODO: Fix inconsistent / poor naming of this Sidebar as it clashes with the shared Sidebar component
export default function Sidebar(props: SidebarProps): JSX.Element {
  const { className, journalEntries, selectedDay, setSelectedDay, onCreateJournalEntry } = props;

  return (
    <Menu
      className={clsx(className, 'text-white')}
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