import * as React from 'react';
import { useChromeStorageWhitelistedSitesSubscription } from '../../hooks/TimeTracker';
import { SiteList } from './SiteList';
import { port } from './utils';


export function WhiteListSiteList(): JSX.Element {
  const siteList = useChromeStorageWhitelistedSitesSubscription();

  const handleSiteRemovalFromWhiteList = (url: string) => {
    port.postMessage({ url, unblock: true, action: 'whitelistSite' });
  };

  const handleSiteAdditionToWhiteList = (url: string) => {
    port.postMessage({ url, unblock: false, action: 'whitelistSite' });
  };

  return (
    <SiteList
      siteList={siteList}
      onAddSubmit={handleSiteAdditionToWhiteList}
      onRemoveSubmit={handleSiteRemovalFromWhiteList} />
  );
}
