import {
  INetworkSuccessResponse,
  PaginatedSuccessResponse,
} from '@/@types/appTypes';

import { ArticlesEndpoints } from './articles-constants.server';
import { ArticleResponse } from './articles-types.server';
import { globalApi } from '..';

const articleApi = globalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getArticles: build.query<
      PaginatedSuccessResponse<ArticleResponse[]>,
      { page?: number; limit?: number }
    >({
      query: (params) => ({
        url: ArticlesEndpoints.GetArticles,
        method: 'GET',
        params,
      }),
      providesTags: ['Articles'],
    }),

    addArticleComment: build.mutation<
      PaginatedSuccessResponse<ArticleResponse[]>,
      {
        slug: string;
        content: string;
        author: string;
      }
    >({
      query: (params) => ({
        url: ArticlesEndpoints.AddArticleComment.replace(':slug', params.slug),
        method: 'POST',
        data: {
          content: params.content,
          author: params.author,
        },
      }),
      invalidatesTags: ['Articles'],
    }),

    deleteArticleComment: build.mutation<
      PaginatedSuccessResponse<ArticleResponse[]>,
      { slug: string; commentId: string }
    >({
      query: (params) => ({
        url: ArticlesEndpoints.DeleteArticleComment.replace(
          ':slug',
          params.slug
        ).replace(':commentId', params.commentId),
        method: 'DELETE',
      }),
      invalidatesTags: ['Articles'],
    }),

    getArticle: build.query<
      INetworkSuccessResponse<ArticleResponse>,
      { slug: string }
    >({
      query: ({ slug }) => ({
        url: ArticlesEndpoints.GetArticle.replace(':slug', slug),
        method: 'GET',
      }),
      providesTags: (_r, _e, arg) => [{ type: 'Articles', id: arg.slug }],
    }),
  }),
});

export const {
  useGetArticleQuery,
  useGetArticlesQuery,
  useAddArticleCommentMutation,
  useDeleteArticleCommentMutation,
} = articleApi;
