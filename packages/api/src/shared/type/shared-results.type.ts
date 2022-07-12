import { Result } from 'ts-results';

export interface SharedError {
  message: string;
  error?: Error;
}

export type SharedResult<T> = Result<T, SharedError>;

export type SharedAsyncResult<T> = Promise<Result<T, SharedError>>;
