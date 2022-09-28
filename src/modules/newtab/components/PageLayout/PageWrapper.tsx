import React from 'react';

export interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper(props: PageWrapperProps): JSX.Element {
  const { children } = props;

  return <div className="flex flex-col w-full h-full bg-black ">{children}</div>;
}
