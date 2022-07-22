import * as React from 'react';
import PageContentWrapper from '../../../components/PageLayout/PageContentWrapper';
import PageHeader from '../../../components/PageLayout/PageHeader';
import PageWrapper from '../../../components/PageLayout/PageWrapper';

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
