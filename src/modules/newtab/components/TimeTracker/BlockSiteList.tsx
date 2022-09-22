import * as React from 'react';
import { useChromeStorageBlockedSitesSubscription } from '../../hooks/TimeTracker';
import { SiteList } from './SiteList';
import { port } from './utils';



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
