'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@repo/api';

// 注册数据类型
interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  nickname?: string;
  phone?: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  nickname?: string;
  avatar?: string;
  role: string;
  status: string;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

// 认证上下文类型定义
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// 创建认证上下文
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 认证提供者组件
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 检查用户是否已登录
  useEffect(() => {
    // 设置初始加载状态
    setIsLoading(true);
    
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        console.error('认证检查失败:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // 使用setTimeout确保在客户端执行
    if (typeof window !== 'undefined') {
      checkAuth();
    }
  }, []);

  // 登录函数
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 使用Axios API服务进行登录
      const { data: { access_token = '', user = null }= {}} = await authAPI.login(email, password);
      console.log('登录响应:', { access_token, user });
      // 保存令牌和用户信息到本地存储
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // 更新状态
      setUser(user);
    } catch (err: any) {
      setError(err.message || '登录失败');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 注册函数
  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 使用Axios API服务进行注册
      const { data: { access_token = '', user = null }= {}} = await authAPI.register(data);
      
      // 保存令牌和用户信息到本地存储
      if (access_token) {
        localStorage.setItem('token', access_token);
      } else {
        console.error('令牌不存在');
      }
      
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        console.error('用户信息不存在');
      }
      
      // 更新状态
      setUser(user);
    } catch (err: any) {
      setError(err.message || '注册失败');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 登出函数
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // 提供认证上下文值
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 使用认证上下文的钩子
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth必须在AuthProvider内部使用');
  }
  return context;
}
