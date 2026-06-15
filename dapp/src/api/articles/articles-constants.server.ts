export enum ArticlesEndpoints {
  GetArticles = '/articles',
  GetArticle = '/articles/:slug',
  AddArticleComment = '/articles/:slug/comments',
  DeleteArticleComment = '/articles/:slug/comments/:commentId',
}
