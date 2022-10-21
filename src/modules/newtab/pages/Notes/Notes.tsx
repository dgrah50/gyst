import React from 'react';
import PageContentWrapper from '@components/PageLayout/PageContentWrapper';
import PageHeader from '@components/PageLayout/PageHeader';
import PageWrapper from '@components/PageLayout/PageWrapper';

export default function Notes(): JSX.Element {
  return (
    <PageWrapper>
      <PageHeader label="notes" />
      <PageContentWrapper>
        <iframe
          src="https://ultra.tf/slow-apples-arrive"
          title="Ultra"
          style={{ height: '100%' }} />
      </PageContentWrapper>
    </PageWrapper>
  );
}
