export type ArticleResponse = {
  _id: string;
  slug: string;
  title: string;
  content: string;
  coverImage?: string;
  status: 'published' | 'draft';
  metaDescription?: string;
  author?: string;
  excerpt?: string;
  tags?: string[];
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
