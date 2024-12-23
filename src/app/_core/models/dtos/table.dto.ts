import { PaginationMetaModel, ResultListModel } from '../responses';

export class TableDto<T> {
  columns: TableColumnDto[] = [];
  dataSource: T[] = [];
  meta: PaginationMetaModel;

  constructor() {
    this.meta = new PaginationMetaModel();
  }

  loadResponse(response: ResultListModel<T>): void {
    this.dataSource = response.data;
    //meta
    this.meta.page = response.meta.page;
    this.meta.take = response.meta.take;
    this.meta.itemCount = response.meta.itemCount;
    this.meta.pageCount = response.meta.pageCount;
    this.meta.hasPreviousPage = response.meta.hasPreviousPage;
    this.meta.hasNextPage = response.meta.hasNextPage;
  }
}

export class TableColumnDto {
  def: string;
  header: string;
  pipeFormat?: string;
  type?: 'text' | 'boolean' = 'text';
}
