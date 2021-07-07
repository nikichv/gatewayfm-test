import axios from 'axios';

/**
 * Instance for requesting our proxy api by calling API pages
 */
const proxyInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROXY_INSTANCE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default proxyInstance;
