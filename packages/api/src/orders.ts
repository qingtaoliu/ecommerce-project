import api from './utils/http';

// 订单相关API
export const ordersAPI = {
  // 获取当前用户的订单列表
  getOrders: async (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    orderBy?: string;
    orderDirection?: 'ASC' | 'DESC';
  }) => {
    try {
      return await api.get('/orders', { params });
    } catch (error) {
      console.error('获取订单列表失败:', error);
      throw error;
    }
  },

  // 获取订单详情
  getOrderById: async (id: string) => {
    try {
      return await api.get(`/orders/${id}`);
    } catch (error) {
      console.error('获取订单详情失败:', error);
      throw error;
    }
  },

  // 创建订单
  createOrder: async (data: {
    shippingAddressId: string;
    items: Array<{
      productId: string;
      quantity: number;
    }>;
    notes?: string;
  }) => {
    try {
      console.log('创建订单请求数据:', data);
      return await api.post('/orders/create', data);
    } catch (error) {
      console.error('创建订单失败:', error);
      throw error;
    }
  },

  // 取消订单
  cancelOrder: async (id: string) => {
    try {
      return await api.post(`/orders/${id}/cancel`);
    } catch (error) {
      console.error('取消订单失败:', error);
      throw error;
    }
  },

  // 支付订单
  payOrder: async (id: string, paymentMethod: string) => {
    try {
      return await api.put(`/orders/${id}/status`, {
        status: 'confirmed',
        paymentMethod: paymentMethod
      });
    } catch (error) {
      console.error('支付订单失败:', error);
      throw error;
    }
  },

  // 确认收货
  confirmReceipt: async (id: string) => {
    try {
      return await api.post(`/orders/${id}/confirm-receipt`);
    } catch (error) {
      console.error('确认收货失败:', error);
      throw error;
    }
  }
};
