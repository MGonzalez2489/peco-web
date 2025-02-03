export class ResultListDto<T> {
  data: T[] = [];
  meta: PaginationMetaDto = new PaginationMetaDto();
}
export class PaginationMetaDto {
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

export class SearchDto {
  page: number = 1;
  take: number = 10;
  showAll: boolean = false;

  order?: string;
  orderBy?: string;
  hint?: string;

  constructor(pagMeta?: PaginationMetaDto) {
    if (pagMeta) {
      this.page = pagMeta.page;
      this.take = pagMeta.take;
      if (pagMeta.hint && pagMeta.hint !== '') {
        this.hint = pagMeta.hint;
      }
    }

    this.page = this.page == 0 ? 1 : this.page;

    this.order = pagMeta?.order || 'DESC';
    this.orderBy = pagMeta?.orderBy || 'id';
  }
}
