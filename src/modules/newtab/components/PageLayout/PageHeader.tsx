import React from 'react';

export interface PageHeaderProps {
  label: string;
}

export default function PageHeader(props: PageHeaderProps): JSX.Element {
  const { label } = props;

  return (
    <div
      className="flex items-center justify-center w-full pl-4 bg-black border-b border-white/25"
      style={{ height: '66px' }}>
      <h1 className="text-xl text-white">{label}</h1>
    </div>
  );
}
