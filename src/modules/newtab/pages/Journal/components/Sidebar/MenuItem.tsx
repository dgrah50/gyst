import Button from '@components/Button';
import { IconName } from '@components/Icon';
import clsx from 'clsx';
import React from 'react';
import { Menu } from 'react-daisyui';

export interface MenuItemProps {
  label: string;
  className?: string;
  iconName?: IconName;
  isActive?: boolean;
  rating: number | null;
  onClickDate?: () => void;
  onCreateJournalEntry?: () => void;
}

// TODO: Fix inconsistent / poor naming of this MenuItem component as it clashes with the shared MenuItem component
// Perhaps it should be based on that MenuItem component anyway?

export default function MenuItem(props: MenuItemProps): JSX.Element {
  const { label, className, iconName, isActive, rating, onClickDate, onCreateJournalEntry } = props;

  return (
    <Menu.Item
      className={clsx(className, `text-white  p-2 flex flex-row`)}>
      <Button
        label={label}
        iconName={iconName}
        className="flex justify-start flex-1"
        onClick={onClickDate}
        isActive={isActive} />
      {
        rating ? (
          <Button
            label={rating.toString()}
            style={{ width: '50px' }}
            isActive={isActive}
            onClick={onCreateJournalEntry} />
        ) : (
          <Button
            iconName="PlusCircle"
            style={{ width: '50px' }}
            className="text-white "
            onClick={onCreateJournalEntry} />
        )
      }
    </Menu.Item>
  );
}