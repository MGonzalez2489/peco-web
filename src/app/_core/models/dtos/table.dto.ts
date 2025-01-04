import { PaginationMetaModel, ResultListModel } from '../responses';

export class TableDto<T> {
  columns: TableColumnDto[] = [];
  dataSource: T[] = [];
  meta: PaginationMetaModel;
  options: TableOptions;
  constructor(options?: TableOptions) {
    this.meta = new PaginationMetaModel();
    this.options = options ? options : new TableOptions();
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
export class TableOptions {
  showViewButton: boolean = false;
}
export class TableColumnDto {
  def: string;
  header: string;
  pipeFormat?: string;
  type?: 'text' | 'boolean' = 'text';
  route?: string;
}
