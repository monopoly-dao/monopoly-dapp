'use client';

import { useSearchParams } from 'next/navigation';

import CardPaginationContainer from '@/components/CardPaginationContainer';
import Skeleton from '@/components/Skeleton';

import { useGetArticlesQuery } from '@/api/articles';

import ArticleCard from './_components/ArticleCard';

// Adjust API path as needed

export default function Page() {
  const searchParams = useSearchParams();
  // const search = searchParams.get('search');
  const page = Number(searchParams.get('page') || 1);
  const limit = 12;

  const { data: res, isLoading } = useGetArticlesQuery({ page, limit });
  const articles = res?.data || [];

  return (
    <section className='h-full overflow-y-auto px-[5%] lg:px-10 xl:px-20'>
      <h1 className='mt-6 text-xl font-serif tracking-tight font-bold text-gray-900 mb-6'>
        Articles
      </h1>

      <div className='lg:col-span-2 flex flex-col gap-6 w-full bg-white p-6 rounded-xl shadow-sm border'>
        {/* <div className='mb-4 flex items-center justify-between'>
          <div>
            <p className='font-medium'>Article Management</p>
            <p className='text-xs text-gray-500'>
              Create and manage blog articles
            </p>
          </div>
          <Link href='/articles/new'>
            <Button className='!py-0 h-8 text-sm !px-3'>+ New Article</Button>
          </Link>
        </div> */}

        <div className='mt-3 mb-2 flex flex-col md:flex-row gap-1 md:gap-4'>
          {/* <InputSearch
            inputClassName='py-1'
            placeholder='Search for article title or author'
          /> */}
        </div>

        <CardPaginationContainer totalPages={res?.meta.totalPages}>
          {isLoading && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className='w-full h-[320px] rounded-lg border border-gray-300 overflow-hidden'
                >
                  <Skeleton className='w-full h-[60%]' />
                  <div className='flex flex-col gap-3 p-4 h-[40%]'>
                    <Skeleton className='w-full h-6 rounded' />
                    <Skeleton className='w-24 h-3 rounded' />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && articles.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {articles.map((article) => (
                <ArticleCard
                  key={article._id}
                  id={article._id}
                  title={article.title}
                  dateCreated={article.createdAt}
                  coverImage={article.coverImage}
                  href={`/articles/${article._id}`}
                />
              ))}
            </div>
          )}
        </CardPaginationContainer>

        {/* <DataTable
          data={res?.data || []}
          columns={articlesColumns(onDelete)}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={res?.meta.totalPages || 1}
          totalItems={1}
          isLoading={isLoading}
          // isError={isError}
          isFetching={isFetching}
          refetch={refetch}
        /> */}
      </div>
    </section>
  );
}
