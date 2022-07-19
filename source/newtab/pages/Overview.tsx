import * as React from 'react';
import PageContentWrapper from '../components/shared/PageContentWrapper';
import PageHeader from '../components/shared/PageHeader';
import PageWrapper from '../components/shared/PageWrapper';

export default function Overview(): JSX.Element {
  return (
    <PageWrapper>
      <PageHeader label="overview" />
      <PageContentWrapper>
        <h1 className="text-white text-md">Content</h1>
        <h1 className="text-white text-md">Journal Streak is</h1>
        <h1 className="text-white text-md">Plot mood graph</h1>
        <h1 className="text-white text-md">Insert Progress Bar here</h1>
        <h1 className="text-white text-md">Insert Todos here</h1>
        <h1 className="text-white text-md">Spent X hours on these websites</h1>
        <h1 className="text-white text-md">Monthly goals</h1>
      </PageContentWrapper>
    </PageWrapper>
  );
}
