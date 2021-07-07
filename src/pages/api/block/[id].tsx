import type { NextApiRequest, NextApiResponse } from 'next';
import apiInstance from 'api/apiInstance';
import decToHex from 'utils/decToHex';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  const result = await apiInstance.post(
    '/',
    JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [`0x${decToHex(Number(id))}`, true],
      id,
    })
  );

  res.status(result.status).json(result.data);
};
