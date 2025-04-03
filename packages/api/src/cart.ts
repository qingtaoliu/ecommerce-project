import api from './utils/http';

// 购物车相关API
export const cartAPI = {
  // 获取当前用户的购物车
  getCart: async () => {
    try {
      return await api.get('/orders/cart/current');
    } catch (error) {
      console.error('获取购物车失败:', error);
      throw error;
    }
  },

  // 获取购物车商品列表
  getCartItems: async () => {
    try {
      return await api.get('/orders/cart/items');
    } catch (error) {
      console.error('获取购物车商品列表失败:', error);
      throw error;
    }
  },

  // 添加商品到购物车
  addToCart: async (data: {
    productId: string;
    quantity: number;
    attributes?: Record<string, any>;
  }) => {
    try {
      return await api.post('/orders/cart/items', data);
    } catch (error) {
      console.error('添加商品到购物车失败:', error);
      throw error;
    }
  },

  // 更新购物车商品数量
  updateCartItem: async (itemId: string, data: { quantity: number }) => {
    try {
      return await api.patch(`/orders/cart/items/${itemId}`, data);
    } catch (error) {
      console.error('更新购物车商品数量失败:', error);
      throw error;
    }
  },

  // 删除购物车商品
  removeCartItem: async (itemId: string) => {
    try {
      return await api.delete(`/orders/cart/items/${itemId}`);
    } catch (error) {
      console.error('删除购物车商品失败:', error);
      throw error;
    }
  },

  // 清空购物车
  clearCart: async () => {
    try {
      return await api.delete('/orders/cart/items');
    } catch (error) {
      console.error('清空购物车失败:', error);
      throw error;
    }
  },
};
