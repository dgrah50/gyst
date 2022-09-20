import * as React from 'react';

export interface IBarChartProps {
  chartData: {
    site: string;
    duration: number;
  }[];
}

export default function BarChart(props: IBarChartProps): JSX.Element {
  const { chartData } = props;

  return (
    <div>
      {chartData.map(({ site, duration }) => {
        return (
          <div
            className="flex flex-row items-center justify-start"
            key={site}>
            <div className="w-24">
              <h1 className="text-white text-md">{site}</h1>
            </div>
            <h1 className="text-4xl text-white">{'■'.repeat(duration)}</h1>
            <h1 className="pl-2 text-white text-md">{Math.round(duration)} hours</h1>
          </div>
        );
      })}
    </div>
  );
}
