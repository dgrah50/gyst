import React from 'react';
import { CloudLightning } from 'react-feather';

export default function JournalStreakWidget(): JSX.Element {

  return (
    <div
      className='flex flex-col items-center text-xl text-white align-middle border journalstreak-widget'>

      Journal Streak

      <CloudLightning />
      Insert Calendar of Todos here
    </div>
  );
}
