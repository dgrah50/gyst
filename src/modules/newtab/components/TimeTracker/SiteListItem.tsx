import React, { useCallback } from 'react';
import Icon from '@components/Shared/Icon/Icon';

export interface ISiteListItemProps {
  site: string;

  onClickRemove: (site: string) => void;
}

export default function SiteListItem(props: ISiteListItemProps): JSX.Element {
  const { site, onClickRemove } = props;

  const handleRemovalClick = useCallback(
    () => {
      onClickRemove(site);
    },
    [onClickRemove, site],
  )


  return (
    <div
      className="flex items-center justify-between flex-1 h-12 p-4 my-4 text-white border border-white"
      role="button"
      tabIndex={0}>
      <p className="text-md">{site} </p>
      <Icon
        name="MinusCircle"
        onClick={handleRemovalClick} />
    </div>
  );
}
