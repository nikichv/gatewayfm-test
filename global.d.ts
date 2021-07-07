import { NextPage } from 'next';

export interface ApiError {
  code: number;
  message: string;
}

export type AsyncBody = {
  isPending: boolean;
  error: ApiError | null;
};

export type AsyncEntity<T> = {
  id: string | number;
  entity: T | null;
} & AsyncBody;

export interface AppNextPage<T = void> extends NextPage<T> {
  getLayout: (page: NextPage) => JSX.Element;
}
