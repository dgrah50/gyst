import React from 'react';
import PageContentWrapper from '@components/PageLayout/PageContentWrapper';
import PageHeader from '@components/PageLayout/PageHeader';
import PageWrapper from '@components/PageLayout/PageWrapper';
import BarChart from './components/BarChart';
import { BlockSiteList } from './components/BlockSiteList';
import { WhiteListSiteList } from './components/WhitelistSiteList';

export default function TimeTracker(): JSX.Element {
  const mockChartData = ['test', 'test.com'].map((site) => ({
    site,
    duration: Math.random() * 10,
  }));

  return (
    <PageWrapper>
      <PageContentWrapper className='pt-0 pb-0 pl-0'>
        <div className="flex flex-row flex-1 min-h-0">
          <div
            className="flex flex-col h-full min-h-0 p-2 overflow-y-scroll border-r border-white/25"
            style={{ width: "250px" }}>
            <h1 className="pb-2 text-lg text-white">blocked websites</h1>
            <BlockSiteList />
            <h1 className="pb-2 text-lg text-white">allowed websites</h1>
            <WhiteListSiteList />
          </div>
          <div className="flex flex-col flex-1 min-h-0 overflow-y-scroll ">
            <PageHeader label="site usage (past week)" />
            <div className="flex flex-col w-full p-2 text-white ">
              <BarChart chartData={mockChartData} />
            </div>
          </div>
        </div>
      </PageContentWrapper>
    </PageWrapper>
  );
}

