import Button from '@components/Shared/Button';
import { IconName } from '@components/Shared/Icon';
import * as React from 'react';
import { Menu } from 'react-daisyui';

export interface IMenuItemProps {
  label: string;
  className?: string;
  iconName?: IconName;
  isActive?: boolean;
  rating: number | null;
  onClickDate?: () => void;
  onCreateJournalEntry?: () => void;


}

export default function MenuItem(props: IMenuItemProps): JSX.Element {
  const { label, className, iconName, isActive, rating, onClickDate, onCreateJournalEntry } = props;

  return (
    <Menu.Item
      className={`text-white  ${className} p-2 flex flex-row`}
    >
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
            className="flex flex-4"
            isActive={isActive} />
        ) : (
          <Button
            iconName="PlusCircle"
            className="flex text-black bg-white flex-4"
            onClick={onCreateJournalEntry} />
        )
      }
    </Menu.Item>
  );
}