import type { NextApiRequest, NextApiResponse } from 'next';
import apiInstance from 'api/apiInstance';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await apiInstance.post(
    '/',
    JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: ['latest', true],
      id: 1,
    })
  );

  res.status(result.status).json(result.data);
};
