import { Metadata, ResolvingMetadata } from 'next';
import Script from 'next/script';
import axios from 'axios';

import { BASE_URL } from '@/api';
import { ArticlesEndpoints } from '@/api/articles/articles-constants.server';
import { ArticleResponse } from '@/api/articles/articles-types.server';
import { siteConfig } from '@/constants/config';

import ArticleDetailClient from './ArticleDetailClient';

type Props = {
  params: { articleId: string };
};

async function getArticle(id: string): Promise<ArticleResponse | null> {
  try {
    const res = await axios.get(`${BASE_URL}${ArticlesEndpoints.GetArticle.replace(':id', id)}`);
    return res.data?.data || null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const article = await getArticle(params.articleId);

  if (!article) {
    return {
      title: 'Article Not Found | Settley',
    };
  }

  // Sanitize description from HTML content
  const description = article.content
    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
    .substring(0, 160);

  return {
    title: `${article.title} | Settley`,
    description: description,
    openGraph: {
      title: article.title,
      description: description,
      url: `${siteConfig.url}/articles/${params.articleId}`,
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
  const article = await getArticle(params.articleId);

  if (!article) {
    return (
      <ArticleDetailClient />
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.content.replace(/<[^>]*>?/gm, '').substring(0, 160),
    'image': article.coverImage ? [article.coverImage] : [],
    'datePublished': article.createdAt,
    'dateModified': article.updatedAt,
    'author': [{
      '@type': 'Organization',
      'name': 'Settley',
      'url': siteConfig.url
    }],
    'publisher': {
      '@type': 'Organization',
      'name': 'Settley',
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteConfig.url}/favicon/apple-touch-icon.png`
      }
    }
  };

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
