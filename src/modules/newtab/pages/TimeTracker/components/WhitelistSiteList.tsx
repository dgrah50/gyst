import React from 'react';
import { useChromeStorageWhitelistedSitesSubscription, port } from './utils';
import { SiteList } from './SiteList';

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
