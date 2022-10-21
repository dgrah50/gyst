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
      className={clsx(className, `text-white text-opacity-40 hover:text-opacity-100 p-2 flex flex-row border-r-0`)}>
      <Button
        label={label}
        iconName={iconName}
        className={clsx("flex justify-start flex-1 rounded-r-none", { "border-white": isActive, })}
        onClick={onClickDate}
        isActive={isActive} />
      {
        rating ? (
          <Button
            label={rating.toString()}
            className='rounded-l-none'
            style={{ width: '50px' }}
            isActive={isActive}
            onClick={onCreateJournalEntry} />
        ) : (
          <Button
            iconName="PlusCircle"
            style={{ width: '50px' }}
            className={clsx('rounded-l-none',{ "text-white ": isActive })}
            onClick={onCreateJournalEntry} />
        )
      }
    </Menu.Item>
  );
}