import { ColumnDef } from '@tanstack/react-table';
import { AiTwotoneDelete } from 'react-icons/ai';

import { ArticleResponse } from '@/api/articles/articles-types.server';

export const articlesColumns = (
  onDelete: (id: string) => void
): ColumnDef<ArticleResponse>[] => [
  {
    header: 'Title',
    accessorKey: 'title',
    enableSorting: true,
    sortingFn: 'alphanumeric',
  },

  // {
  //   header: 'Author',
  //   accessorKey: 'author',
  // },

  {
    header: 'Created',
    cell: (info) => info.getValue(),
    accessorFn: (row) => new Date(row.createdAt).toLocaleDateString(),
  },

  {
    header: 'Updated',
    cell: (info) => info.getValue(),
    accessorFn: (row) => new Date(row.updatedAt).toLocaleDateString(),
  },

  {
    header: 'Status',
    cell: (info) => info.getValue(),
    accessorFn: (row) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          row.status === 'draft'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {row.status}
      </span>
    ),
  },

  {
    header: 'Delete',
    cell: (info) => info.getValue(),
    accessorFn: (row) => (
      <button
        type='button'
        onClick={() => onDelete(row._id)}
        className='text-red-600 hover:text-red-800 px-2 py-1 text-sm'
      >
        <AiTwotoneDelete />
      </button>
    ),
  },

  // {
  //   header: 'Actions',
  //   cell: (info) => info.getValue(),
  //   accessorFn: (row) => (
  //     <Link
  //       href={`/articles/${row._id}`}
  //       className='text-[#231F20CC] p-0 !text-[14px] cursor-pointer flex items-center gap-2'
  //     >
  //       View More
  //       <IoIosArrowRoundForward />
  //     </Link>
  //   ),
  // },
];
