import * as React from 'react';

export interface IButtonProps {
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Button(props: IButtonProps) {
  const { label, className, children } = props;
  return (
    <button
      className={`btn btn-outline btn-white ${className} hover:bg-white hover:text-black transition-all`}
      type="button"
    >
      {children}
      {label}
    </button>
  );
}
