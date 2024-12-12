export interface ResultModel<T> {
  statusCode: boolean;
  data: T;
}

export interface ResultErrorModel {
  message: string;
  error: string;
  statusCode: number;
}
