export type ApiResponseError = {
  error: string;
};

export type ApiDeleteResponse = {
  message: string;
};

export type Paginated<T> = {
  page: number;
  pageSize: number;
  total: number;
  items: T[];
};

export type BaseType = string | string[] | number | boolean | Date;
