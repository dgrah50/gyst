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
      <PageContentWrapper className='pt-0 pb-0 pl-0'>
        <div className="flex flex-row flex-1 min-h-0">
          <div className="flex flex-col h-full min-h-0 p-2 overflow-y-scroll border" style={{ width: "250px" }}>
            <h1 className="text-lg text-white">blocked websites</h1>
            <BlockSiteList />
            <h1 className="text-lg text-white">allowed websites</h1>
            <WhiteListSiteList />
          </div>
          <div className="flex flex-col flex-1 min-h-0 overflow-y-scroll border">
            <PageHeader label="journal" />
            <div className="flex flex-col w-full p-2 text-white ">

              <h1 className="text-lg text-white">Site Usage</h1>
              <BarChart chartData={mockChartData} />
            </div>
          </div>
        </div>
      </PageContentWrapper>
    </PageWrapper>
  );
}

