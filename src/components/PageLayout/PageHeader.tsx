import * as React from 'react';

export interface IPageHeaderProps {
  label: string;
}

export default function PageHeader(props: IPageHeaderProps): JSX.Element {
  const { label } = props;
  return (
    <div
      className="flex items-center w-full pl-4 border border-white"
      style={{ height: '66px' }}
    >
      <h1 className="text-2xl text-white">{label}</h1>
    </div>
  );
}
