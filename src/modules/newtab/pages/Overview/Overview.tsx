import React from 'react';
import PageContentWrapper from '@components/PageLayout/PageContentWrapper';
import PageHeader from '@components/PageLayout/PageHeader';
import PageWrapper from '@components/PageLayout/PageWrapper';
import ProgressBar from './components/ProgressBarWidget/ProgressBarWidget';
import JournalStreakWidget from './components/JournalStreakWidget/JournalStreakWidget';
import TodosWidget from './components/TodosWidget/TodosWidget';
import TimeSpentWidget from './components/TimeSpentWidget/TimeSpentWidget';
import GoalsWidget from './components/GoalsWidget/GoalsWidget';
import './overview.scss';

export default function Overview(): JSX.Element {
  return (
    <PageWrapper>
      <PageHeader label="overview" />
      <PageContentWrapper>
        <div className="widget-container">
          <ProgressBar />
          <JournalStreakWidget />
          <TodosWidget />
          <TimeSpentWidget />
          <GoalsWidget />
        </div>
      </PageContentWrapper>
    </PageWrapper>
  );
}
