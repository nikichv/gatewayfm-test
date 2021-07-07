import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { generatePath, matchPath } from 'react-router-dom';

import proxyInstance from 'api/proxyInstance';

export interface RequestConfig extends AxiosRequestConfig {
  path?: string;
}

const getRequestConfig = (config: RequestConfig): AxiosRequestConfig => {
  const { params, path } = config;

  if (!path) {
    throw new Error('Path parameter is required for creating request config!');
  }

  const url = generatePath(path, params);
  const usedParams = matchPath(url, { path: config.path })?.params || {};

  const queryParams = Object.keys({ ...params })
    .filter(k => !Object.keys(usedParams).includes(k))
    .reduce((acc, k) => {
      acc[k] = params[k];
      return acc;
    }, {} as Record<string, unknown>);

  return { ...config, url, params: queryParams };
};

function createRequest<Returned, Params = void>(
  callback: (config: Params) => RequestConfig
) {
  return (config: Parameters<typeof callback>[0]): AxiosPromise<Returned> => {
    const finalConfig = getRequestConfig(callback(config));

    return proxyInstance(finalConfig).catch(e => {
      console.error('Request error occurred', e);
      return e.response as never;
    });
  };
}

export default createRequest;
