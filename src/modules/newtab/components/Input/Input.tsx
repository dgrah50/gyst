import clsx from 'clsx';
import React from 'react';
import { Input as InputBase, InputProps as InputBaseProps } from 'react-daisyui';

export interface InputProps extends InputBaseProps {
  className?: string;
  children?: React.ReactNode;
  isActive?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps): JSX.Element {
  const { className, isActive, children, type, onChange } = props;

  return (
    <InputBase
      type={type}
      onChange={onChange}
      className={clsx(
        className,
        `bg-black text-white border border-white  transition-all`,
        { 'bg-white text-black': isActive },
      )}>
      {children}
    </InputBase>
  );
}
