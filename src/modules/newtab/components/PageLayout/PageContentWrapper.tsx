import React from 'react';
import clsx from 'clsx';

export interface PageContentWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export default function PageContentWrapper(props: PageContentWrapperProps): JSX.Element {
  const { children, className } = props;

  return <div className={clsx(className, "flex flex-col flex-1 w-full min-h-0 p-2 bg-black")}> {children}</div>;
}
