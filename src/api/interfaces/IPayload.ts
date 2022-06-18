export interface IPayload<T> {
  success: boolean;
  message: string;
  payload: T;
}
