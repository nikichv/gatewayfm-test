import axios from 'axios';

/**
 * Instance to requesting actual data provider
 */
const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_INSTANCE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiInstance;
