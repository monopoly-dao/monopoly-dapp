export type INetworkSuccessResponse<T> = {
  data: T;
  message: string;
  status: number;
};
