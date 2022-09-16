import * as React from 'react';
import Icon, { IconName } from '../Icon/Icon';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  className?: string;
  iconName?: IconName;
  children?: React.ReactNode;
}

export default function Button(props: IButtonProps): JSX.Element {
  const { label, className, iconName, children, onClick } = props;
  return (
    <button
      className={`btn btn-outline btn-white ${className} hover:bg-white hover:text-black transition-all`}
      type="button"
      onClick={onClick}
    >
      {iconName && <Icon name={iconName} size={18} />}
      {children}
      {label}
    </button>
  );
}
