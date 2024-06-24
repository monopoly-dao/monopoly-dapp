export type INetworkSuccessResponse<T> = {
  data: T;
  message: string;
  status: number;
};

export type PaginatedSuccessResponse<T> = {
  data: T;
  message: string;
  status: number;
  meta: {
    currentPage: number;
    count: number;
    totalPages: number;
  };
};
