import * as React from 'react';
import PageContentWrapper from '@components/PageLayout/PageContentWrapper';
import PageHeader from '@components/PageLayout/PageHeader';
import PageWrapper from '@components/PageLayout/PageWrapper';

export default function Journal(): JSX.Element {
  return (
    <PageWrapper>
      <PageHeader label="journal" />
      <PageContentWrapper>
        <h1 className="text-white text-md">Content should update</h1>
      </PageContentWrapper>
    </PageWrapper>
  );
}
