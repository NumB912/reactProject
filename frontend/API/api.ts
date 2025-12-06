
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import useStateLogin from '../src/store/LoginStore/login_store';

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const api: AxiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials:true
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useStateLogin.getState().accessToken;
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
    }
    return Promise.reject(error);
  }
);

export default api;
