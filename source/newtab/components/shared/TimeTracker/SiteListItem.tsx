import * as React from 'react';
import { Icon } from '../Icon';

export interface ISiteListItemProps {
  site: string;
}

export default function SiteListItem(props: ISiteListItemProps): JSX.Element {
  const { site } = props;
  return (
    <div className="flex items-center justify-between w-64 p-4 my-2 text-white border border-white">
      <p className="text-md">{site} </p> <Icon name="MinusCircle" />
    </div>
  );
}
