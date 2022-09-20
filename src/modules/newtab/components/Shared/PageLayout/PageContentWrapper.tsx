import * as React from 'react';

export interface IPageContentWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export default function PageContentWrapper(props: IPageContentWrapperProps): JSX.Element {
  const { children, className } = props;

  return <div className={`flex flex-col flex-1 w-full min-h-0 p-2 bg-black ${className}`}> {children}</div>;
}
