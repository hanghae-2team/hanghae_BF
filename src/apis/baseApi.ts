import axios, { type AxiosRequestConfig } from 'axios';

// 환경별 API baseURL 설정
const API_BASE_URL = '/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const http = {
  get: async <Response = unknown>(url: string, options: AxiosRequestConfig = {}) => {
    const response = await axiosInstance.get<Response>(url, options);
    return response.data;
  },
  post: async <Request = unknown, Response = unknown>(url: string, data?: Request, options?: AxiosRequestConfig) => {
    const response = await axiosInstance.post<Response>(url, data, options);
    return response.data;
  },
  put: async <Request = unknown, Response = unknown>(url: string, data?: Request) => {
    const response = await axiosInstance.put<Response>(url, data);
    return response.data;
  },
  patch: async <Request = unknown, Response = unknown>(url: string, data?: Request) => {
    const response = await axiosInstance.patch<Response>(url, data);
    return response.data;
  },
  delete: async <Response = unknown>(url: string) => {
    const response = await axiosInstance.delete<Response>(url);
    return response.data;
  },
  download: async <Response = Blob>(url: string) => {
    const response = await axiosInstance.get<Response>(url, {
      responseType: 'blob',
    });
    return response.data;
  },
};
