import React from 'react';
import { CloudLightning } from 'react-feather';
import WidgetBase from '../WidgetBase/WidgetBase';

export default function JournalStreakWidget(): JSX.Element {

  return (
    <WidgetBase
      className='journalstreak-widget'>
      journal streak

      <div className="flex text-2xl ">
        <CloudLightning />
        7 days
      </div>
      calendar of todos here
    </WidgetBase>
  );
}
