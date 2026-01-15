export type ArticleResponse = {
  _id: string;
  title: string;
  content: string;
  coverImage?: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
  comments: ArticleComment[];
};

export type ArticleComment = {
  _id: string;
  articleId: string;
  userId: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};
