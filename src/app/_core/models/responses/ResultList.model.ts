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
  //order
  order?: string;
  orderBy?: string;
}

export class PagMetaReqModel {
  page: number = 1;
  take: number = 10;
  order?: string;
  orderBy?: string;

  constructor(pagMeta?: PaginationMetaModel) {
    if (pagMeta) {
      this.page = pagMeta.page + 1;
      this.take = pagMeta.take;
    }
    this.order = pagMeta?.order || 'ASC';
    this.orderBy = pagMeta?.orderBy || '';
  }
}
