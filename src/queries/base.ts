export interface IBaseErrorResponse {
  extensions: {
    code: string;
    exception: {
      stacktrace: any[];
    };
  };
  message: string;
}
export interface IBaseQueryResponse<T> {
  data: T;
  errors?: IBaseErrorResponse[];
}
