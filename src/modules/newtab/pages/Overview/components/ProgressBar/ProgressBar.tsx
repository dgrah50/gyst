import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs'

export default function ProgressBar(): JSX.Element {

  const [progress, setProgress] = useState<number>(0);


  const now = dayjs().valueOf()
  const startOfYear = dayjs().startOf('year').valueOf();
  const endOfYear = dayjs().endOf('year').valueOf();
  const DECIMAL_PLACES = 8

  const roundToDecimalPlaces = (num: number, decimalPlaces: number) => {
    const factor = 10 ** decimalPlaces

    return Math.round(num * factor) / factor
  }

  useEffect(() => {
    console.log('effect')
    const interval = setInterval(() => {
      const timeElapsed = roundToDecimalPlaces(((now - startOfYear) / (endOfYear - startOfYear) * 100), DECIMAL_PLACES)
      setProgress(timeElapsed)
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [now, endOfYear, startOfYear])


  // TODO: Add ability to change progress bar time period
  return (
    <div className='flex flex-col items-center text-xl text-white align-middle' style={{ width: '500px' }}>

      Year Progress
      <div
        className="h-12 text-black border"
        style={{ width: '500px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {progress}%</div>
      </div>

    </div>
  );
}
