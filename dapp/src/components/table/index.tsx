'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';
import ReactPaginate from 'react-paginate';

import { cn } from '@/lib/utils';

import TableLoader from '@/components/table-loader';

type TableContainerProps = {
  children?: ReactNode;
  tableHeadClass?: string;
  headers: string[];
  alignHeader?: 'left' | 'right' | 'center';
  containerClassName?: string;
  totalPages?: number;
  limit?: number;
  isLoading?: boolean;
  tableClassName?: string;
};

const TableContainer = ({
  children,
  headers,
  tableHeadClass,
  containerClassName,
  // limit,
  isLoading,
  // alignHeader = 'left',
  totalPages,
  tableClassName,
}: TableContainerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  function handlePageChange(clickEvent: { selected: number }) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    params.set('page', `${clickEvent.selected + 1}`);

    router.replace(`?${params.toString()}`, { scroll: false });
  }
  // const textAlign = `text-${alignHeader}`;

  return (
    <div
      className={cn('no-scrollbar w-full overflow-x-auto bg-white', [
        containerClassName && containerClassName,
      ])}
    >
      {!isLoading && (
        <table
          className={cn(
            'w-full border-collapse border border-medium-grey bg-white',
            [tableClassName]
          )}
        >
          <thead className='w-full border-none'>
            <tr className='w-auto'>
              {headers.map((header) => (
                <th
                  key={header}
                  className={cn(
                    `mr-2 whitespace-nowrap py-4 px-5 font-normal text-black lg:mr-4 text-left`,
                    'font-inter font-semibold border-b border-black',
                    tableHeadClass
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      )}

      {isLoading && <TableLoader className='mt-5' />}

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
    </div>
  );
};

export default TableContainer;
