import React from 'react';
import WidgetBase from '../WidgetBase/WidgetBase';

export default function TimeSpentWidget(): JSX.Element {

  return (
    <WidgetBase
      className='overflow-hidden timespent-widget'>
      time spent (last week)
      <div className="flex flex-row items-end w-full h-full min-h-0 p-4 overflow-x-scroll ">
        {[...Array(20).keys()].map(() => <Block />)}

      </div>

    </WidgetBase>
  );
}
function Block() {
  const height = Math.floor(Math.random() * 100);

  return (
    <div
      className="flex items-end w-32 h-full mr-4"
      style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
      <div
        className="w-full text-center text-black bg-white"
        style={{ height: `${height}%` }}>
        test
      </div>
    </div>
  );
}

