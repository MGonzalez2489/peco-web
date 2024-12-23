export interface ResultListModel<T> {
  data: T[];
  meta: PaginationMetaModel;
}
export class PaginationMetaModel {
  page: number = 1;
  take: number = 10;
  itemCount: number = 0;
  pageCount: number = 0;
  hasPreviousPage: boolean = false;
  hasNextPage: boolean = false;
  //order
  order?: string;
  orderBy?: string;
  hint?: string;
}

export class PagMetaReqModel {
  page: number = 1;
  take: number = 10;
  order?: string;
  orderBy?: string;
  hint?: string;

  constructor(pagMeta?: PaginationMetaModel) {
    if (pagMeta) {
      this.page = pagMeta.page;
      this.take = pagMeta.take;
      if (pagMeta.hint && pagMeta.hint !== '') {
        this.hint = pagMeta.hint;
      }
    }

    this.page = this.page == 0 ? 1 : this.page;

    this.order = pagMeta?.order || 'ASC';
    this.orderBy = pagMeta?.orderBy || 'createdAt';
  }
}
