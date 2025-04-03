import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 创建 Axios 实例的默认配置
const defaultConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// 创建 Axios 实例
export const createAxiosInstance = (config: AxiosRequestConfig = {}): AxiosInstance => {
  const axiosInstance = axios.create({
    ...defaultConfig,
    ...config,
  });

  // 请求拦截器 - 添加认证令牌
  axiosInstance.interceptors.request.use(
    (config) => {
      // 获取存储的令牌（如果在浏览器环境中）
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 响应拦截器 - 统一错误处理
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => {
      // 处理错误响应
      if (error.response) {
        // 服务器返回错误状态码
        const { status, data } = error.response;
        
        // 处理 401 未授权错误
        if (status === 401) {
          // 清除本地存储的令牌
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            // 可以在这里添加重定向到登录页面的逻辑
          }
        }
        
        return Promise.reject({
          status,
          message: data.message || '请求失败',
          data: data,
        });
      }
      
      // 请求被取消或网络错误
      return Promise.reject({
        status: 0,
        message: error.message || '网络错误',
        data: null,
      });
    }
  );

  return axiosInstance;
};

// 导出默认的 Axios 实例
export default createAxiosInstance();

// 导出类型定义
export type ApiResponse<T = any> = {
  code: number;
  message: string;
  data: T;
};
