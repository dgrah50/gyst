import clsx from 'clsx';
import React from 'react';
import { Button as ButtonBase, ButtonProps as ButtonBaseProps } from 'react-daisyui';
import Icon, { IconName } from '../Icon/Icon';

export interface ButtonProps extends ButtonBaseProps {
  label?: string;
  className?: string;
  iconName?: IconName;
  children?: React.ReactNode;
  isActive?: boolean;
  style?: React.CSSProperties;
}

export default function Button(props: ButtonProps): JSX.Element {
  const { label, className, iconName, children, onClick, isActive, style, ...rest } = props;

  return (
    <ButtonBase
      className={
        clsx(
          'btn-outline btn-white hover:bg-black hover:border-white transition-all rounded-lg',
          { 'bg-white hover:bg-white text-black hover:text-black ': isActive },
          className,
        )}
      type="button"
      style={style}
      onClick={onClick}
      animation={false}
      startIcon={iconName && <Icon
        name={iconName}
        size={20} />}
      {...rest}>
      {children}
      {label}
    </ButtonBase>
  );
}
