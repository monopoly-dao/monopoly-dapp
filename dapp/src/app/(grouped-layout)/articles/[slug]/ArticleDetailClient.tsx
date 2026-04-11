'use client';

import MarkdownPreview from '@uiw/react-markdown-preview';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import '@uiw/react-markdown-preview/markdown.css';

import ArticleComments from '@/components/ArticleComments';
import Loading from '@/components/Loading';

import { useGetArticleQuery } from '@/api/articles';
import { ArticleResponse } from '@/api/articles/articles-types.server';

export default function ArticleDetailClient({
  initialData,
}: {
  initialData?: ArticleResponse;
}) {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const {
    data: res,
    isLoading,
    isFetching,
    isError,
  } = useGetArticleQuery(
    { slug: slug || '' },
    {
      skip: !slug,
      // initialData: initialData ? { data: initialData, message: '', success: true } : undefined
    }
  );

  const article: ArticleResponse | undefined = res?.data || initialData;

  if (isLoading && !article) return <Loading />;

  if (isError || !article) {
    return (
      <section className='h-full overflow-y-auto px-[5%] lg:px-10 xl:px-20'>
        <div className='lg:col-span-2 flex flex-col gap-6 w-full bg-white p-6 rounded-xl shadow-sm border'>
          <div className='mb-4'>
            <p className='font-medium'>Article</p>
            <p className='text-xs text-gray-500'>Unable to load article.</p>
          </div>
          <Link
            href='/articles'
            className='text-sm text-blue-600 hover:underline'
          >
            ← Back to articles
          </Link>
        </div>
      </section>
    );
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  return (
    <section className='h-full overflow-y-auto px-[5%] lg:px-10 xl:px-20'>
      <div className='lg:col-span-2 flex flex-col gap-6 mt-6 w-full bg-white p-6 rounded-xl shadow-sm border'>
        <div className='flex flex-col gap-4 mb-6'>
          <h1 className='text-3xl font-serif tracking-tight font-bold text-gray-900'>
            {article.title}
          </h1>
          <div className='flex flex-wrap items-center gap-3 text-sm text-gray-600'>
            <time dateTime={article.createdAt}>{formattedDate}</time>
            <span className='text-gray-300'>•</span>
            <span
              className='author-name'
              itemScope
              itemType='https://schema.org/Person'
            >
              <span itemProp='name'>{article.author || 'Settley Team'}</span>
            </span>
          </div>
        </div>

        {article.coverImage && (
          <div className='w-full rounded-md overflow-hidden border border-gray-200 mb-4'>
            <div className='relative w-full h-[320px] md:h-[420px] bg-gray-100'>
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 1200px'
                priority={false}
              />
            </div>
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className='flex flex-wrap gap-2 mb-6'>
            {article.tags.map((tag, index) => (
              <Link
                key={index}
                href={`/tags/${encodeURIComponent(
                  tag.toLowerCase().replace(/\s+/g, '-')
                )}`}
                className='text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors'
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {article && (
          <article
            className='prose max-w-none text-gray-800'
            itemProp='articleBody'
          >
            {/* <div
                            className='whitespace-pre-wrap'
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        ></div> */}
            <MarkdownPreview source={article.content} />
          </article>
        )}

        {/* {article && } */}

        {isFetching && (
          <div className='text-sm text-gray-500'>Refreshing...</div>
        )}

        {/* Comments Section */}
        {slug && (
          <ArticleComments
            slug={slug as string}
            comments={article.comments || []}
          />
        )}
      </div>
    </section>
  );
}
