import React from 'react';
import { Square } from 'react-feather';
import WidgetBase from '../WidgetBase/WidgetBase';

const gystGoals = [
  "Figure out way of rendering modal on blocked site and then pushing journal to the newtab",
  "Consider moving to Radix UI components",
  "Set up onboarding flow",
  "Consider Vanilla Extract over Tailwind",
  "Look to moving the todoist and firebase subscriptions to the background worker",
  "Add a switch for the progress bar for time scale",
  "Look at ways to improve contrast on the progress bar",
  "Look at ways to improve contrast on the streak widget",
  "Submit to the Chrome store and get ID"

]
export default function GoalsWidget(): JSX.Element {

  return (
    <WidgetBase
      className='justify-start h-full p-2 goals-widget rounded-r-2xl'>
      goals
      <div className='flex flex-col w-full p-2 overflow-x-hidden overflow-y-scroll'>
        {gystGoals.map((value) => (
          <GoalComponent content={value} />
        ))}
      </div>
    </WidgetBase>
  );
}

export function GoalComponent(props: { content: string }): JSX.Element {
  const { content } = props;

  return (
    <div className='flex flex-row items-center p-2 m-2 border rounded-md border-white/25'>
      <div>
        <Square
          className='mr-2'
          size={20} />
      </div>
      <div className='text-sm'>{content}</div>
    </div>
  );
}
