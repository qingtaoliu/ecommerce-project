import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// API服务基础配置
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * 创建自定义的Axios实例
 * @param config - Axios配置选项
 * @returns 配置好的Axios实例
 */
export const createAxiosInstance = (config?: AxiosRequestConfig): AxiosInstance => {
  // 创建axios实例
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000, // 请求超时时间：10秒
    ...config
  });

  // 请求拦截器 - 添加认证令牌
  instance.interceptors.request.use(
    (config) => {
      // 从本地存储获取令牌
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      // 如果存在令牌，添加到请求头
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      console.log('API请求:', config.url, config.method, config.data);
      return config;
    },
    (error) => {
      console.error('API请求错误:', error);
      return Promise.reject(error);
    }
  );

  // 响应拦截器 - 统一处理错误
  instance.interceptors.response.use(
    (response) => {
      const url = response.config.url || '';
      return response.data;
    },
    (error) => {
      // 获取错误信息
      const errorMessage = error.response?.data?.msg || '请求失败，请稍后再试';
      console.error('API错误响应:', error.config?.url, error.response?.status, errorMessage);
      
      // 处理特定的错误状态码
      if (error.response?.status === 401) {
        // 未授权，可能是令牌过期
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // 可以在这里添加重定向到登录页面的逻辑
        }
      }
      
      return Promise.reject(new Error(errorMessage));
    }
  );

  return instance;
};

// 默认的Axios实例
const http = createAxiosInstance();

// 导出默认实例和创建函数
export default http;
