import { AsyncEntity } from 'global';

const entityAsFulfilled = <T>(
  id: string | number,
  item: Exclude<T, 'isPending' | 'error'>
): AsyncEntity<T> => ({
  id,
  entity: item,
  error: null,
  isPending: false,
});

export default entityAsFulfilled;
