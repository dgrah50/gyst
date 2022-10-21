import Button from '@components/Button';
import React, { useState } from 'react';
import SiteListItem from './SiteListItem';

export interface SiteListProps {
  onAddSubmit: (url: string) => void;
  onRemoveSubmit: (url: string) => void;
  siteList: string[];
}

export function SiteList(props: SiteListProps): JSX.Element {
  const { onAddSubmit, onRemoveSubmit, siteList } = props;
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <div className="flex text-white h-9 row">
        <input
          type="text"
          placeholder="example: facebook.com"
          className="w-full text-black rounded-l-md input input-bordered h-9"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }} />
        <Button
          iconName="PlusCircle"
          className="text-white rounded-l-none rounded-r-md w-9 btn-square h-9"
          size='xs'
          onClick={() => {
            onAddSubmit(inputValue);
            setInputValue('')
          }} />
      </div>
      {siteList.map((site) => (
        <SiteListItem
          site={site}
          key={site}
          onClickRemove={() => {
            onRemoveSubmit(site);
          }} />
      ))}
    </div>
  );
}
