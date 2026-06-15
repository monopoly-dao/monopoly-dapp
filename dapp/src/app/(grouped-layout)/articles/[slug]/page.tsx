import axios from 'axios';
import { Metadata, ResolvingMetadata } from 'next';
import Script from 'next/script';

import { truncateText } from '@/lib/utils';

import { BASE_URL } from '@/api';
import { ArticlesEndpoints } from '@/api/articles/articles-constants.server';
import { ArticleResponse } from '@/api/articles/articles-types.server';
import { siteConfig } from '@/constants/config';

import ArticleDetailClient from './ArticleDetailClient';

type Props = {
  params: { slug: string };
};

async function getArticle(slug: string): Promise<ArticleResponse | null> {
  try {
    const res = await axios.get(
      `${BASE_URL}${ArticlesEndpoints.GetArticle.replace(':slug', slug)}`
    );
    return res.data?.data || null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found | Settley',
    };
  }

  // Use metaDescription if available, otherwise extract plain text from content
  const description =
    article.metaDescription || truncateText(article.content || '', 160);

  return {
    title: `${article.title} | Settley`,
    description: description,
    openGraph: {
      title: article.title,
      description: description,
      url: `${siteConfig.url}/articles/${params.slug}`,
      images: article.coverImage ? [article.coverImage] : [],
      type: 'article',
      publishedTime: article.createdAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: description,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const article = await getArticle(params.slug);

  if (!article) {
    return <ArticleDetailClient />;
  }

  // Use metaDescription if available, otherwise extract plain text from content
  const descriptionForSchema =
    article.metaDescription || truncateText(article.content || '', 160);

  // Build structured data with author as Person if available
  const articleSchema: any = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: descriptionForSchema,
    image: article.coverImage ? [article.coverImage] : [],
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Settley',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/favicon/apple-touch-icon.png`,
      },
    },
  };

  // Add author as Person if available, otherwise default to Organization
  if (article.author) {
    articleSchema.author = {
      '@type': 'Person',
      name: article.author,
    };
  } else {
    articleSchema.author = [
      {
        '@type': 'Organization',
        name: 'Settley',
        url: siteConfig.url,
      },
    ];
  }

  // Add tags if available
  if (article.tags && article.tags.length > 0) {
    articleSchema.keywords = article.tags.join(', ');
  }

  return (
    <>
      <Script
        id='article-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ArticleDetailClient initialData={article} />
    </>
  );
}
