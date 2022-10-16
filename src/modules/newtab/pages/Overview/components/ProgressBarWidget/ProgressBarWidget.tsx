import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import WidgetBase from '../WidgetBase/WidgetBase';

export default function ProgressBar(): JSX.Element {

  const [progress, setProgress] = useState<number>(0);


  const now = dayjs().valueOf()
  const startOfYear = dayjs().startOf('year').valueOf();
  const endOfYear = dayjs().endOf('year').valueOf();
  const DECIMAL_PLACES = 7

  const roundToDecimalPlaces = (num: number, decimalPlaces: number) => {
    const factor = 10 ** decimalPlaces

    return Math.round(num * factor) / factor
  }

  // TODO: Move this to a custom hook and also debug why 6 DECIMAL_PLACES is not ticking 
  useEffect(() => {
    const interval = setInterval(() => {
      const timeElapsed = roundToDecimalPlaces(((now - startOfYear) / (endOfYear - startOfYear) * 100), DECIMAL_PLACES)
      setProgress(timeElapsed)
    }, 50)

    return () => {
      clearInterval(interval)
    }
  }, [now, endOfYear, startOfYear])


  // TODO: Add ability to change progress bar time period
  // TODO: Center this widget properly, consider passing in a prop to WidgetBase to center the widget
  return (
    <WidgetBase
      className='progressbar-widget'>
      <div className="relative flex flex-col items-center w-full h-full p-2 ">
        <div className='absolute flex '>
          year progress
        </div>
        <div className='absolute flex items-center justify-center w-full h-full'>
          <div
            className="relative flex items-center h-12 text-black "
            style={{ width: '80%', backgroundColor: 'rgba(255,255,255,0.2)' }}>
            <div className='absolute z-10 w-full text-center text-black '>{progress}%</div>
            <div
              className='absolute flex items-center justify-center h-full bg-white/75'
              style={{ width: `${progress}%`, letterSpacing: '2px' }} />
          </div>
        </div>
      </div>
    </WidgetBase>
  );
}
