import * as React from 'react';

export interface IPageContentWrapperProps {
  children: React.ReactNode;
}

export default function PageContentWrapper(props: IPageContentWrapperProps): JSX.Element {
  const { children } = props;

  return <div className="w-full h-full p-4 border border-white">{children}</div>;
}
