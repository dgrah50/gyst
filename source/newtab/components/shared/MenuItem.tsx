import * as React from 'react';
import { Menu } from 'react-daisyui';
import { Button } from './Button';

export interface IMenuItemProps {
  label: string;
  className?: string;
}

export function MenuItem(props: IMenuItemProps) {
  const { label, className } = props;
  return (
    <Menu.Item className={`text-white border border-white ${className} p-2`}>
      <Button label={label} />
    </Menu.Item>
  );
}
