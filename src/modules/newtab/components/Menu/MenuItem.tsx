import clsx from 'clsx';
import React from 'react';
import { Menu } from 'react-daisyui';
import Button from '../Button';
import { IconName } from '../Icon/Icon';

export interface MenuItemProps {
  label: string;
  className?: string;
  iconName?: IconName;
  isActive?: boolean;
}

export default function MenuItem(props: MenuItemProps): JSX.Element {
  const { label, className, iconName, isActive } = props;

  return (
    <Menu.Item
      className={clsx(className, `text-white text-opacity-40  p-2 `)}>
      <Button
        label={label}
        iconName={iconName}
        className="flex justify-start"
        isActive={isActive} />
    </Menu.Item>
  );
}
