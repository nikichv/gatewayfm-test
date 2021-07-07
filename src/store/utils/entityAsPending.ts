import { AsyncEntity } from 'global';

const entityAsPending = <T>(id: string | number): AsyncEntity<T> => ({
  id,
  entity: null,
  error: null,
  isPending: true,
});

export default entityAsPending;
