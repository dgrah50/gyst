import React from 'react';

import PageContentWrapper from '@components/PageLayout/PageContentWrapper';
import PageHeader from '@components/PageLayout/PageHeader';
import PageWrapper from '@components/PageLayout/PageWrapper';

export default function ReadingList(): JSX.Element {
  return (
    <PageWrapper>
      <PageHeader label="reading list" />
      <PageContentWrapper>
        <h1 className="text-white text-md">Content</h1>
      </PageContentWrapper>
    </PageWrapper>
  );
}
