'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import ArticleComments from '@/components/ArticleComments';
import Loading from '@/components/Loading';
import ShareButton from '@/components/ShareButton';

import { useGetArticleQuery } from '@/api/articles';
import { ArticleResponse } from '@/api/articles/articles-types.server';
import { siteConfig } from '@/constants/config';

export default function ArticleDetailClient({ initialData }: { initialData?: ArticleResponse }) {
    const params = useParams();
    const articleId = params?.articleId as string | undefined;

    const {
        data: res,
        isLoading,
        isFetching,
        isError,
    } = useGetArticleQuery({ articleId: articleId || '' }, {
        skip: !articleId,
        // initialData: initialData ? { data: initialData, message: '', success: true } : undefined
    });

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
                <div className='flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-4 mb-6'>
                    <div className='flex-1'>
                        <h1 className='text-3xl font-serif tracking-tight font-bold text-gray-900 mb-2'>
                            {article.title}
                        </h1>
                        <time className='text-xs text-gray-600' dateTime={article.createdAt}>{formattedDate}</time>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-4 border-b md:border-none pb-4 md:pb-0 border-gray-100">
                        <Link
                            href='/articles'
                            className='text-sm text-blue-600 hover:underline whitespace-nowrap md:order-2'
                        >
                            ← Back
                        </Link>
                        <ShareButton
                            title={article.title}
                            url={`${siteConfig.url}/articles/${article._id}/`}
                            className="md:order-1"
                        />
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

                {article && (
                    <article className='prose max-w-none text-gray-800' itemProp='articleBody'>
                        <div
                            className='whitespace-pre-wrap'
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        ></div>
                    </article>
                )}

                {isFetching && (
                    <div className='text-sm text-gray-500'>Refreshing...</div>
                )}

                {/* Comments Section */}
                {articleId && (
                    <ArticleComments
                        articleId={articleId as string}
                        comments={article.comments || []}
                    />
                )}
            </div>
        </section>
    );
}
