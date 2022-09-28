import React from 'react';
import { useChromeStorageBlockedSitesSubscription, port } from './utils';
import { SiteList } from './SiteList';




export function BlockSiteList(): JSX.Element {
  const siteList = useChromeStorageBlockedSitesSubscription();

  const handleSiteRemovalFromBlockList = (url: string) => {
    port.postMessage({ url, unblock: true, action: 'blockFromPopup' });
  };

  const handleSiteAdditionToBlockList = (url: string) => {
    port.postMessage({ url, unblock: false, action: 'blockFromPopup' });
  };

  return (
    <SiteList
      siteList={siteList}
      onAddSubmit={handleSiteAdditionToBlockList}
      onRemoveSubmit={handleSiteRemovalFromBlockList} />
  );
}
