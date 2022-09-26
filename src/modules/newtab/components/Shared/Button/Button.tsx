import clsx from 'clsx';
import React from 'react';
import { Button as ButtonBase, ButtonProps as ButtonBaseProps } from 'react-daisyui';
import Icon, { IconName } from '../Icon/Icon';

export interface IButtonProps extends ButtonBaseProps {
  label?: string;
  className?: string;
  iconName?: IconName;
  children?: React.ReactNode;
  isActive?: boolean;
  style?: React.CSSProperties;
}

export default function Button(props: IButtonProps): JSX.Element {
  const { label, className, iconName, children, onClick, isActive, style } = props;

  return (
    <ButtonBase
      className={
        clsx(
          'btn btn-outline btn-white hover:bg-gray-400 hover:text-black transition-all',
          className,
          { 'bg-white text-black': isActive }
        )}
      type="button"
      style={style}
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
