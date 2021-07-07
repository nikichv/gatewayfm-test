import createRequest, { RequestConfig } from 'api/utils/createRequest';
import { Block } from 'features/blocks/blocks.types';

/**
 * Get latest block
 */
export interface getLatestBlockResponse {
  id: number;
  jsonrpc: string;
  result: Block;
}

export const getLatestBlock = createRequest<
  getLatestBlockResponse,
  RequestConfig | void
>(config => ({
  path: '/api/block/latest',
  method: 'post',
  ...config,
}));

/**
 * Get block by ID
 */
export interface GetBlockByIdResponse {
  id: number;
  jsonrpc: string;
  result: Block | null;
}

export interface GetBlockByIdConfig extends RequestConfig {
  params: {
    id: string | number;
  };
}

export const getBlockById = createRequest<
  GetBlockByIdResponse,
  GetBlockByIdConfig
>(config => ({
  path: '/api/block/:id',
  method: 'post',
  ...config,
}));
