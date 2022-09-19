import * as React from 'react';
import { Menu } from 'react-daisyui';
import Button from '../Button';
import { IconName } from '../Icon/Icon';

export interface IMenuItemProps {
  label: string;
  className?: string;
  iconName?: IconName;
  isActive?: boolean;
}

export default function MenuItem(props: IMenuItemProps): JSX.Element {
  const { label, className, iconName, isActive } = props;

  return (
    <Menu.Item
      className={`text-white  ${className} p-2 `}
    >
      <Button label={label} iconName={iconName} className="flex justify-start" isActive={isActive} />
    </Menu.Item>
  );
}
