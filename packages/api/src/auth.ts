import http from './utils/http';


// 用户认证相关API
export const authAPI = {
  // 登录
  login: async (email: string, password: string) => {
    try {
      console.log('登录请求数据:', { email, password });
      return await http.post('/auth/login', { email, password });
    } catch (error) {
      console.error('登录请求失败:', error);
      throw error;
    }
  },

  // 注册
  register: async (userData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    nickname?: string;
    phone?: string;
  }) => {
    try {
      console.log('注册请求数据:', userData);
      return await http.post('/auth/register', userData);
    } catch (error) {
      console.error('注册请求失败:', error);
      throw error;
    }
  },
};

// 导出HTTP实例，可以在其他服务中使用
// export default http;
