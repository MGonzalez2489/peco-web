import { PaginationMetaModel } from '../responses';

export interface TableDto<T> {
  columns: TableColumnDto[];
  dataSource: T[];
  meta?: PaginationMetaModel;
}

export interface TableColumnDto {
  def: string;
  header: string;
  pipeFormat?: string;
}
