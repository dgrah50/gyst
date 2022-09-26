import React from 'react';
import PageContentWrapper from '@components/Shared/PageLayout/PageContentWrapper';
import PageHeader from '@components/Shared/PageLayout/PageHeader';
import PageWrapper from '@components/Shared/PageLayout/PageWrapper';

export default function Overview(): JSX.Element {
  return (
    <PageWrapper>
      <PageHeader label="overview" />
      <PageContentWrapper>
        <h1 className="text-white text-md">Journal Streak and colour-coded calendat</h1>
        <h1 className="text-white text-md">Insert Progress Bar here</h1>
        <h1 className="text-white text-md">Insert Todos here</h1>
        <h1 className="text-white text-md">Spent X hours on these websites</h1>
        <h1 className="text-white text-md">Monthly goals</h1>
      </PageContentWrapper>
    </PageWrapper>
  );
}
