import Button from '@components/Shared/Button';
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
      <div className="w-64 text-white input-group">
        <input
          type="text"
          placeholder="example: facebook.com"
          className="w-full text-black input input-bordered"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <Button
          iconName="PlusCircle"
          className="text-white border-white"
          onClick={() => {
            onAddSubmit(inputValue);
            setInputValue('')
          }}
        />
      </div>

      {siteList.map((site) => (
        <SiteListItem
          site={site}
          key={site}
          onClickRemove={() => {
            onRemoveSubmit(site);
          }}
        />
      ))}
    </div>
  );
}
