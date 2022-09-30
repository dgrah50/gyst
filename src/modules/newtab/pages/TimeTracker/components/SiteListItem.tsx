import React, { useCallback } from 'react';
import Icon from '@components/Icon';

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
      className="flex items-stretch justify-between flex-1 h-12 my-4 text-white transition-all opacity-40 hover:opacity-100"
      role="button"
      tabIndex={0}>
      <div className='flex items-center flex-1 p-4 border'>
        <p className="text-md">{site} </p>
      </div>
      <div
        className='flex items-center justify-center border'
        style={{ width: '50px' }}>
        <Icon
          name="MinusCircle"
          onClick={handleRemovalClick}
          size={20} />
      </div>
    </div>
  );
}
