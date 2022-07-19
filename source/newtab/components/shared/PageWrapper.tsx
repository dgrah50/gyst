import * as React from 'react';

export interface IPageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper(props: IPageWrapperProps): JSX.Element {
  const { children } = props;

  return <div className="w-full h-full border border-white">{children}</div>;
}
