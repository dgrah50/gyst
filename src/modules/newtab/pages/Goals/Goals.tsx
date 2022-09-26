import React from 'react';
import PageContentWrapper from '@components/Shared/PageLayout/PageContentWrapper';
import PageHeader from '@components/Shared/PageLayout/PageHeader';
import PageWrapper from '@components/Shared/PageLayout/PageWrapper';

export default function Goals(): JSX.Element {
  return (
    <PageWrapper>
      <PageHeader label="goals" />
      <PageContentWrapper>
        <h1 className="text-white text-md">Content</h1>
      </PageContentWrapper>
    </PageWrapper>
  );
}
