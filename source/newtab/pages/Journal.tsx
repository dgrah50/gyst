import * as React from 'react';
import PageContentWrapper from '../components/shared/PageContentWrapper';
import PageHeader from '../components/shared/PageHeader';
import PageWrapper from '../components/shared/PageWrapper';

export default function Journal() {
  return (
    <PageWrapper>
      <PageHeader label="journal" />
      <PageContentWrapper>
        <h1 className="text-white text-md">Content</h1>
      </PageContentWrapper>
    </PageWrapper>
  );
}
