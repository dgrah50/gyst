import * as React from 'react';
import PageContentWrapper from '../components/shared/PageContentWrapper';
import PageHeader from '../components/shared/PageHeader';
import PageWrapper from '../components/shared/PageWrapper';

export default function ReadingList() {
  return (
    <PageWrapper>
      <PageHeader label="reading list" />
      <PageContentWrapper>
        <h1 className="text-white text-md">Content</h1>
      </PageContentWrapper>
    </PageWrapper>
  );
}
