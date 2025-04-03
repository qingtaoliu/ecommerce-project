export interface Response<T> {
  data: T;
  code: number;
  msg: string;
}
