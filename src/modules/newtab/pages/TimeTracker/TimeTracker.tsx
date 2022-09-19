import React from 'react';
import PageContentWrapper from '@components/Shared/PageLayout/PageContentWrapper';
import PageHeader from '@components/Shared/PageLayout/PageHeader';
import PageWrapper from '@components/Shared/PageLayout/PageWrapper';
import BarChart from '@components/TimeTracker/BarChart';
import { BlockSiteList } from '@components/TimeTracker/BlockSiteList';
import { WhiteListSiteList } from '@components/TimeTracker/WhitelistSiteList';

export default function TimeTracker(): JSX.Element {
  const mockChartData = ['test', 'test.com'].map((site) => ({
    site,
    duration: Math.random() * 10,
  }));

  return (
    <PageWrapper>
      <PageHeader label="time tracker" />
      <PageContentWrapper>
        <div className="flex flex-row flex-1 min-h-0 border">
          <div className="flex-1 p-2 overflow-y-scroll border-r border-white">
            <h1 className="text-lg text-white">blocked websites</h1>
            <BlockSiteList />
            <h1 className="text-lg text-white">allowed websites</h1>
            <WhiteListSiteList />
          </div>
          <div className="flex-1 p-2">
            <h1 className="text-lg text-white">Whitelisted Sites</h1>
            <h1 className="text-lg text-white">Site Usage</h1>
            <BarChart chartData={mockChartData} />
          </div>
        </div>
      </PageContentWrapper>
    </PageWrapper>
  );
}
