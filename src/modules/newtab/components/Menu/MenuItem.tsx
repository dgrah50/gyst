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
  const { className, iconName, isActive } = props;

  return (
    <Menu.Item className={clsx(className, `text-white text-opacity-40  p-2 `)}>
      <Button
        iconName={iconName}
        className="flex justify-center btn-square btn-lg"
        isActive={isActive} />
    </Menu.Item>
  );
}
