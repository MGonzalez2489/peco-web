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

  ////order
  //order?: string;
  //orderBy?: string;
}
