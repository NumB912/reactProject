
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
  (response: AxiosResponse) => {
   if (response.headers["X-New-Access-Token"]) {
    localStorage.removeItem("access_token")
      localStorage.setItem("access_token", response.data.access_token);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.access_token;
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
    }
    return Promise.reject(error);
  }
);

export default api;
