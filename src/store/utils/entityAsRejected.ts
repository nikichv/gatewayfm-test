import { ApiError, AsyncEntity } from 'global';

const entityAsRejected = <T>(
  id: string | number,
  error: ApiError | null = null
): AsyncEntity<T> => ({
  id,
  error,
  entity: null,
  isPending: false,
});

export default entityAsRejected;
