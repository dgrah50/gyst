import React from 'react';
import { CloudLightning } from 'react-feather';

export default function JournalStreakWidget(): JSX.Element {

  return (
    <div
      className='flex flex-col items-center text-xl text-white align-middle border'
      style={{ width: '500px' }}>

      Journal Streak

      <CloudLightning />
    </div>
  );
}
