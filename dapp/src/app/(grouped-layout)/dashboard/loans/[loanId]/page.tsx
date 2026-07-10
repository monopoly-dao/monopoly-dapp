import { Suspense } from 'react';
import LoanDetailClient from './LoanDetailClient';

export default async function Page({ params }: { params: { loanId: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoanDetailClient loanId={params.loanId} />
    </Suspense>
  );
}