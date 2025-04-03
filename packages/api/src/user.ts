import api from './utils/http';

// 用户相关API
export const userAPI = {
  // 获取当前用户信息
  getCurrentUser: async () => {
    try {
      return await api.get('/users/profile');
    } catch (error) {
      console.error('获取用户信息失败:', error);
      throw error;
    }
  },

  // 更新用户信息
  updateProfile: async (data: {
    nickname?: string;
    avatar?: string;
    phone?: string;
  }) => {
    try {
      return await api.patch('/users/profile', data);
    } catch (error) {
      console.error('更新用户信息失败:', error);
      throw error;
    }
  },

  // 修改密码
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      return await api.post('/users/change-password', data);
    } catch (error) {
      console.error('修改密码失败:', error);
      throw error;
    }
  },

  // 获取收货地址列表
  getShippingAddresses: async () => {
    try {
      return await api.get('/shipping-addresses');
    } catch (error) {
      console.error('获取收货地址失败:', error);
      throw error;
    }
  },

  // 添加收货地址
  addShippingAddress: async (data: {
    recipient: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    address: string;
    zipCode?: string;
    isDefault?: boolean;
  }) => {
    try {
      return await api.post('/shipping-addresses', data);
    } catch (error) {
      console.error('添加收货地址失败:', error);
      throw error;
    }
  },

  // 更新收货地址
  updateShippingAddress: async (id: string, data: {
    recipient?: string;
    phone?: string;
    province?: string;
    city?: string;
    district?: string;
    address?: string;
    zipCode?: string;
    isDefault?: boolean;
  }) => {
    try {
      return await api.patch(`/shipping-addresses/${id}`, data);
    } catch (error) {
      console.error('更新收货地址失败:', error);
      throw error;
    }
  },

  // 删除收货地址
  deleteShippingAddress: async (id: string) => {
    try {
      return await api.delete(`/shipping-addresses/${id}`);
    } catch (error) {
      console.error('删除收货地址失败:', error);
      throw error;
    }
  },

  // 设置默认收货地址
  setDefaultShippingAddress: async (id: string) => {
    try {
      return await api.patch(`/shipping-addresses/${id}/default`);
    } catch (error) {
      console.error('设置默认收货地址失败:', error);
      throw error;
    }
  },

  // 获取收藏列表
  getFavorites: async (params?: {
    page?: number;
    pageSize?: number;
  }) => {
    try {
      return await api.get('/favorites', { params });
    } catch (error) {
      console.error('获取收藏列表失败:', error);
      throw error;
    }
  },

  // 添加收藏
  addFavorite: async (productId: string) => {
    try {
      return await api.post('/favorites', { productId });
    } catch (error) {
      console.error('添加收藏失败:', error);
      throw error;
    }
  },

  // 删除收藏
  removeFavorite: async (id: string) => {
    try {
      return await api.delete(`/favorites/${id}`);
    } catch (error) {
      console.error('删除收藏失败:', error);
      throw error;
    }
  }
};
