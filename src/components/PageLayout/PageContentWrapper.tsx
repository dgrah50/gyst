import * as React from 'react';

export interface IPageContentWrapperProps {
  children: React.ReactNode;
}

export default function PageContentWrapper(props: IPageContentWrapperProps): JSX.Element {
  const { children } = props;

  return <div className="flex flex-col flex-1 w-full p-2 border border-white">{children}</div>;
}
