import React from 'react';
import PageContentWrapper from '@components/PageLayout/PageContentWrapper';
import PageHeader from '@components/PageLayout/PageHeader';
import PageWrapper from '@components/PageLayout/PageWrapper';
import ProgressBar from './components/ProgressBar/ProgressBar';
import JournalStreakWidget from './components/JournalStreakWidget/JournalStreakWidget';

export default function Overview(): JSX.Element {
  return (
    <PageWrapper>
      <PageHeader label="overview" />
      <PageContentWrapper>
        <ProgressBar />
        <JournalStreakWidget />
        <h1 className="text-white text-md">Journal Streak and colour-coded calendar</h1>
        <h1 className="text-white text-md">Insert Todos here</h1>
        <h1 className="text-white text-md">Spent X hours on these websites</h1>
        <h1 className="text-white text-md">Monthly goals</h1>
      </PageContentWrapper>
    </PageWrapper>
  );
}
