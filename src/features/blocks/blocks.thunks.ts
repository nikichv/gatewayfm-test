import { getBlockById, getLatestBlock } from 'features/blocks/blocks.api';
import wrapRequestAsThunk from 'store/utils/wrapRequestAsThunk';

const name = 'blocks';

export const getLatestBlockThunk = wrapRequestAsThunk()(
  `${name}/getLatestBlock`,
  getLatestBlock
);

export const getBlockByIdThunk = wrapRequestAsThunk()(
  `${name}/getBlockById`,
  getBlockById
);
