import React from 'react';
import WidgetBase from '../WidgetBase/WidgetBase';


interface timeSpent {
  id: string;
  percentage: number;
}

const mockTimeSpent: timeSpent[] = [
  { id: "facebook.com", percentage: Math.floor(Math.random() * 100) },
  { id: "youtube.com", percentage: Math.floor(Math.random() * 100) },
  { id: "twitter.com", percentage: Math.floor(Math.random() * 100) },
  { id: "reddit.com", percentage: Math.floor(Math.random() * 100) },
  { id: "amazon.com", percentage: Math.floor(Math.random() * 100) },
  { id: "github.com", percentage: Math.floor(Math.random() * 100) },
  { id: "stackoverflow.com", percentage: Math.floor(Math.random() * 100) },
  { id: "google.com", percentage: Math.floor(Math.random() * 100) },
  { id: "gmail.com", percentage: Math.floor(Math.random() * 100) },
  { id: "netflix.com", percentage: Math.floor(Math.random() * 100) },
  { id: "hulu.com", percentage: Math.floor(Math.random() * 100) },
  { id: "twitch.tv", percentage: Math.floor(Math.random() * 100) },
  { id: "discorddiscorddiscorddiscord.com", percentage: Math.floor(Math.random() * 100) },
  { id: "spotify.com", percentage: Math.floor(Math.random() * 100) },
  { id: "instagram.com", percentage: Math.floor(Math.random() * 100) },
  { id: "linkedin.com", percentage: Math.floor(Math.random() * 100) },
  { id: "tiktok.com", percentage: Math.floor(Math.random() * 100) },
  { id: "pinterest.com", percentage: Math.floor(Math.random() * 100) },
  { id: "ebay.com", percentage: Math.floor(Math.random() * 100) },
  { id: "wikipedia.org", percentage: Math.floor(Math.random() * 100) },
  { id: "yahoo.com", percentage: Math.floor(Math.random() * 100) },
  { id: "microsoft.com", percentage: Math.floor(Math.random() * 100) },
]

export default function TimeSpentWidget(): JSX.Element {

  return (
    <WidgetBase
      className='overflow-hidden timespent-widget'>
      time spent (last week)
      <div className="flex flex-row items-end w-full h-full min-h-0 p-4 overflow-x-scroll ">
        {mockTimeSpent
          .sort((a, b) => b.percentage - a.percentage)
          .map((timeSpent) => <Block
            key={timeSpent.id}
            siteName={timeSpent.id}
            percentage={timeSpent.percentage} />)}
      </div>

    </WidgetBase>
  );
}


interface BlockProps {
  siteName: string;
  percentage: number;
}

function Block({ siteName, percentage }: BlockProps): JSX.Element {

  return (
    <div className='flex flex-col flex-shrink-0 w-12 h-full mr-4 overflow-hidden'>
      <div
        className="flex items-end w-12 h-full mr-4"
        style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
        <div
          className="w-full text-center text-black bg-white/75"
          style={{ height: `${percentage}%` }} />
      </div>
      <span className='text-xs '>

        {siteName}
      </span>
    </div>
  );
}

