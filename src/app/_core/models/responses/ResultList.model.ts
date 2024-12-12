export interface ResultListModel<T> {
  data: T[];
  meta: PaginationMetaModel;
}
export interface PaginationMetaModel {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
