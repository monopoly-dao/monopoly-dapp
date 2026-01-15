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
        articleId: string;
        content: string;
        userFirebaseId: string;
        author: string;
      }
    >({
      query: (params) => ({
        url: ArticlesEndpoints.AddArticleComment.replace(
          ':id',
          params.articleId
        ),
        method: 'POST',
        data: {
          content: params.content,
          userFirebaseId: params.userFirebaseId,
          author: params.author,
        },
      }),
      invalidatesTags: ['Articles'],
    }),

    deleteArticleComment: build.mutation<
      PaginatedSuccessResponse<ArticleResponse[]>,
      { articleId: string; commentId: string; userFirebaseId: string }
    >({
      query: (params) => ({
        url: ArticlesEndpoints.DeleteArticleComment.replace(
          ':id',
          params.articleId
        ).replace(':commentId', params.commentId),
        method: 'DELETE',
        params: { userFirebaseId: params.userFirebaseId },
      }),
      invalidatesTags: ['Articles'],
    }),

    getArticle: build.query<
      INetworkSuccessResponse<ArticleResponse>,
      { articleId: string }
    >({
      query: ({ articleId }) => ({
        url: ArticlesEndpoints.GetArticle.replace(':id', articleId),
        method: 'GET',
      }),
      providesTags: (_r, _e, arg) => [{ type: 'Articles', id: arg.articleId }],
    }),
  }),
});

export const {
  useGetArticleQuery,
  useGetArticlesQuery,
  useAddArticleCommentMutation,
  useDeleteArticleCommentMutation,
} = articleApi;
