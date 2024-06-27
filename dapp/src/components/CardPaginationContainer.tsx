'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';
import ReactPaginate from 'react-paginate';

type Props = {
  children: ReactNode;
  totalPages?: number;
};

export default function CardPaginationContainer({
  children,
  totalPages,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  function handlePageChange(clickEvent: { selected: number }) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    params.set('page', `${clickEvent.selected + 1}`);

    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      {children}

      {!!totalPages && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          forcePage={page - 1}
          containerClassName='flex gap-2 justify-end mt-8 items-center'
          onPageChange={handlePageChange}
          previousLabel={<PiCaretLeft />}
          nextLabel={<PiCaretRight />}
          previousClassName='flex'
          nextClassName='flex'
          nextLinkClassName='border rounded-md p-2 text-primary-black/60'
          previousLinkClassName='border rounded-md p-2 text-primary-black/60'
          disabledLinkClassName='text-primary-black/20 border-primary-black/20'
          activeLinkClassName='font-semibold text-secondary'
          renderOnZeroPageCount={() => null}
        />
      )}
    </>
  );
}
