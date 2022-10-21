import React, { useCallback } from 'react';
import Button from '@components/Button';

export interface SiteListItemProps {
  site: string;
  onClickRemove: (site: string) => void;
}

export default function SiteListItem(props: SiteListItemProps): JSX.Element {
  const { site, onClickRemove } = props;

  const handleRemovalClick = useCallback(
    () => {
      onClickRemove(site);
    },
    [onClickRemove, site],
  )

  return (
    <div
      className="flex items-stretch justify-between flex-1 my-2 text-white transition-all opacity-40 hover:opacity-100"
      role="button"
      tabIndex={0}>
      <div className='flex items-center flex-1 p-4 border rounded-l-md h-9'>
        <p className="text-sm">{site} </p>
      </div>
      <Button
        iconName="MinusCircle"
        className="text-white rounded-l-none rounded-r-md w-9 btn-square h-9"
        size='xs'
        onClick={handleRemovalClick} />
    </div>
  );
}
