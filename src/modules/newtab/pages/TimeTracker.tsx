import * as React from 'react';
import { Button } from '@components/Button/Button';
import PageContentWrapper from '@components/PageLayout/PageContentWrapper';
import PageHeader from '@components/PageLayout/PageHeader';
import PageWrapper from '@components/PageLayout/PageWrapper';
import BarChart from '@components/TimeTracker/BarChart';
import SiteListItem from '@components/TimeTracker/SiteListItem';

export default function TimeTracker(): JSX.Element {
  const port = chrome.runtime.connect({ name: 'whitelistSite' });
  console.log(port);
  port.postMessage({ action: 'whitelistSite', url: 'https://www.google.com', reason: 'whatever' });

  // TODO: load list of websites from storage
  const mockSiteList = ['facebook.com', 'twitter.com', 'youtube.com', 'instagram.com'];
  const mockChartData = mockSiteList.map((site) => ({ site, duration: Math.random() * 10 }));
  const mockWhitelistedSiteList = ['news.ycombinator.com', 'engadget.com', 'reddit.com'];

  return (
    <PageWrapper>
      <PageHeader label="time tracker" />
      <PageContentWrapper>
        <div className="flex flex-row flex-1 border">
          <div className="flex-1 p-2 border-r border-white">
            <h1 className="text-lg text-white">Distracting Sites</h1>
            <div className="w-64 text-white input-group">
              <input
                type="text"
                placeholder="example: facebook.com"
                className="w-full text-black input input-bordered"
              />
              <Button iconName="PlusCircle" className="text-white border-white" />
            </div>

            {mockSiteList.map((site) => (
              <SiteListItem site={site} key={site} />
            ))}
            <h1 className="text-lg text-white">Whitelisted Sites</h1>
            {mockWhitelistedSiteList.map((site) => (
              <SiteListItem site={site} key={site} />
            ))}
          </div>
          <div className="flex-1 p-2">
            <h1 className="text-lg text-white">Site Usage</h1>
            <BarChart chartData={mockChartData} />
          </div>
        </div>
      </PageContentWrapper>
    </PageWrapper>
  );
}
