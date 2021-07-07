export const paginateItems = <T>(
  items: T[],
  perPage: number,
  page: number
): T[] => {
  return items.slice((page - 1) * perPage, page * perPage);
};
