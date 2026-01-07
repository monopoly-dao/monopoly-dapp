export type ArticleResponse = {
  _id: string;
  title: string;
  content: string;
  coverImage?: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
};
