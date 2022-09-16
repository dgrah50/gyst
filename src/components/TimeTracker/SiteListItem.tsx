import * as React from 'react';
import Icon from '../Icon/Icon';

export interface ISiteListItemProps {
  site: string;

  onClickRemove: (site: string) => void;
}

export default function SiteListItem(props: ISiteListItemProps): JSX.Element {
  const { site, onClickRemove } = props;
  return (
    <div
      className="flex items-center justify-between w-64 p-4 my-2 text-white border border-white"
      role="button"
      tabIndex={0}
    >
      <p className="text-md">{site} </p>
      <Icon name="MinusCircle" onClick={() => onClickRemove(site)} />
    </div>
  );
}
