import * as React from 'react';
import { Menu } from 'react-daisyui';
import { Button } from './Button';
import { IconName } from './Icon';

export interface IMenuItemProps {
  label: string;
  className?: string;
  iconName?: IconName;
}

export function MenuItem(props: IMenuItemProps): JSX.Element {
  const { label, className, iconName } = props;
  return (
    <Menu.Item className={`text-white border border-white ${className} p-2`}>
      <Button label={label} iconName={iconName} className="flex justify-start" />
    </Menu.Item>
  );
}
