import * as React from 'react';

import PageContentWrapper from '@components/Shared/PageLayout/PageContentWrapper';
import PageHeader from '@components/Shared/PageLayout/PageHeader';
import PageWrapper from '@components/Shared/PageLayout/PageWrapper';

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
