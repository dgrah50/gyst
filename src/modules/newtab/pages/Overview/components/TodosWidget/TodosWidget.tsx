import React from 'react';
import WidgetBase from '../WidgetBase/WidgetBase';

export default function JournalStreakWidget(): JSX.Element {
  return (
    <WidgetBase className="p-2 rounded-l-2xl todos-widget">
      todos
      <div className="flex flex-col w-full h-full">
        <iframe 
          src="https://todoist.com/app" 
          title="Todoist" 
          style={{ height: '100%' }} />
      </div>
    </WidgetBase>
  );
}
