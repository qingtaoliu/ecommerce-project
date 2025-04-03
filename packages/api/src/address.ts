import api from './utils/http';

// 地址相关API
export const addressAPI = {
  // 获取当前用户的地址列表
  getAddresses: async () => {
    try {
      return await api.get('/orders/shipping-addresses');
    } catch (error) {
      console.error('获取地址列表失败:', error);
      throw error;
    }
  },

  // 获取地址详情
  getAddressById: async (id: string) => {
    try {
      return await api.get(`/orders/shipping-addresses/${id}`);
    } catch (error) {
      console.error('获取地址详情失败:', error);
      throw error;
    }
  },

  // 创建新地址
  addAddress: async (data: {
    recipientName: string;
    phoneNumber: string;
    province: string;
    city: string;
    district: string;
    detailAddress: string;
    isDefault?: boolean;
  }) => {
    try {
      return await api.post('/orders/shipping-addresses', data);
    } catch (error) {
      console.error('创建地址失败:', error);
      throw error;
    }
  },

  // 更新地址
  updateAddress: async (id: string, data: {
    recipientName?: string;
    phoneNumber?: string;
    province?: string;
    city?: string;
    district?: string;
    detailAddress?: string;
    isDefault?: boolean;
  }) => {
    try {
      return await api.put(`/orders/shipping-addresses/${id}`, data);
    } catch (error) {
      console.error('更新地址失败:', error);
      throw error;
    }
  },

  // 删除地址
  deleteAddress: async (id: string) => {
    try {
      return await api.delete(`/orders/shipping-addresses/${id}`);
    } catch (error) {
      console.error('删除地址失败:', error);
      throw error;
    }
  },

  // 设置默认地址
  setDefaultAddress: async (id: string) => {
    try {
      return await api.patch(`/orders/shipping-addresses/${id}/default`);
    } catch (error) {
      console.error('设置默认地址失败:', error);
      throw error;
    }
  }
};
