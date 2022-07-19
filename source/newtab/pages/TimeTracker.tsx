import * as React from 'react';
import PageContentWrapper from '../components/shared/PageContentWrapper';
import PageHeader from '../components/shared/PageHeader';
import PageWrapper from '../components/shared/PageWrapper';

export default function TimeTracker() {
  return (
    <PageWrapper>
      <PageHeader label="time tracker" />
      <PageContentWrapper>
        <h1 className="text-white text-md">Content</h1>
      </PageContentWrapper>
    </PageWrapper>
  );
}
