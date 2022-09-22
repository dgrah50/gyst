import * as React from 'react';
import { Button as ButtonBase, ButtonProps as ButtonBaseProps } from 'react-daisyui';
import Icon, { IconName } from '../Icon/Icon';

export interface IButtonProps extends ButtonBaseProps {
  label?: string;
  className?: string;
  iconName?: IconName;
  children?: React.ReactNode;
  isActive?: boolean;
}

export default function Button(props: IButtonProps): JSX.Element {
  const { label, className, iconName, children, onClick, isActive } = props;

  return (
    <ButtonBase
    className={`btn btn-outline btn-white ${className} hover:bg-gray-400 hover:text-black transition-all ${isActive && 'bg-white text-black'}`}
    type="button"
    onClick={onClick}
    animation={false}
    startIcon={iconName && <Icon
    name={iconName}
    size={20} />}>
      {children}
      {label}
    </ButtonBase>
  );
}
