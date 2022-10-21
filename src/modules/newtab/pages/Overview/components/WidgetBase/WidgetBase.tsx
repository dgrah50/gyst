import clsx from 'clsx';
import React from 'react';

export interface WidgetBaseProps {
  children?: React.ReactNode;
  className?: string;
}

export default function WidgetBase(props: WidgetBaseProps): JSX.Element {
  const { children, className } = props;

  return (
    <div
      className={clsx(className, 'flex flex-col items-center text-xl text-white border')}
      style={{ borderColor: 'rgba(255,255,255,0.2)', background: '#1f1f1f' }}>
      {children}
    </div>
  );
}
