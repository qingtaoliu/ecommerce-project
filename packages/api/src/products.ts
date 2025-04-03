import api from './utils/http';
// 商品相关API
export const productsAPI = {
  // 获取商品列表
  getProducts: async (params: {
    page?: number;
    pageSize?: number;
    keyword?: string;
    categoryId?: string;
    categories?: string[];
    orderBy?: string;
    orderDirection?: 'ASC' | 'DESC';
    minPrice?: number;
    maxPrice?: number;
  }) => {
    try {
      console.log('API请求参数:', params);
      return await api.get('/products', { params: {
        ...params,
        categories: params.categories ? params.categories.join(',') : undefined,
      } });
    } catch (error) {
      console.error('获取商品列表失败:', error);
      throw error;
    }
  },

  // 获取商品详情
  getProductById: async (id: string) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response;
    } catch (error) {
      console.error('获取商品详情失败:', error);
      throw error;
    }
  },

  // 获取商品分类
  getCategories: async () => {
    try {
      return await api.get('/categories');
    } catch (error) {
      console.error('获取商品分类失败:', error);
      throw error;
    }
  },

  // 获取商品评价
  getProductReviews: async (productId: string, params?: {
    page?: number;
    pageSize?: number;
    rating?: number;
  }) => {
    try {
      return await api.get(`/products/${productId}/reviews`, { params });
    } catch (error) {
      console.error('获取商品评价失败:', error);
      throw error;
    }
  },

  // 添加商品评价
  addProductReview: async (productId: string, reviewData: {
    rating: number;
    comment: string;
    title?: string;
  }) => {
    try {
      return await api.post(`/products/${productId}/reviews`, reviewData);
    } catch (error) {
      console.error('添加商品评价失败:', error);
      throw error;
    }
  },

  // 获取热销商品
  getHotProducts: async (limit?: number) => {
    try {
      return await api.get('/products/hot', { params: { limit } });

    } catch (error) {
      console.error('获取热销商品失败:', error);
      throw error;
    }
  },

  // 获取新品商品
  getNewProducts: async (limit?: number) => {
    try {
      return await api.get('/products/new', { params: { limit } });
    } catch (error) {
      console.error('获取新品商品失败:', error);
      throw error;
    }
  }
};
