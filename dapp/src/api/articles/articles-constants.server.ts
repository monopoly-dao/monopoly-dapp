export enum ArticlesEndpoints {
  GetArticles = '/articles',
  GetArticle = '/articles/:id',
  AddArticleComment = '/articles/:id/comments',
  DeleteArticleComment = '/articles/:id/comments/:commentId',
}
