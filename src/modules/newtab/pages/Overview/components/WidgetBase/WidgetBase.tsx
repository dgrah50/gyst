import clsx from 'clsx';
import React from 'react';

export interface WidgetBaseProps {
  children?: React.ReactNode;
  className?: string;
}

export default function WidgetBase(props: WidgetBaseProps): JSX.Element {
  const { children, className } = props;

  return (
    <div className={clsx(className, "flex flex-col items-center justify-center text-xl text-white border")}>
      {children}
    </div>
  );
}
