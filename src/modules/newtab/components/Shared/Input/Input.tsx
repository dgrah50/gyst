import * as React from 'react';
import { Input as InputBase, InputProps as InputBaseProps } from 'react-daisyui';


export interface IInputProps extends InputBaseProps {
  className?: string;
  children?: React.ReactNode;
  isActive?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: IInputProps): JSX.Element {
  const { className, isActive, children, type, onChange } = props;

  return (
    <InputBase
      type={type}
      onChange={onChange}
      className={`bg-black text-white border border-white ${className} hover:bg-gray-400 hover:text-black transition-all ${isActive && 'bg-white text-black'}`}>
      {children}
    </InputBase>
  );
}
