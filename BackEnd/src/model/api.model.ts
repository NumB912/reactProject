export type SuccessResponse<T> = {
  success: true;
  message:string,
  status:number,
  data: T;
};

export type ErrorResponse = {
  success: false;
  message: string;
  status: number;
};

