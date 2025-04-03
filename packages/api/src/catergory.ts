import api from './utils/http';

// 分类类型定义
export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  created_at?: Date;
  updated_at?: Date;
}

// 分类API服务
export const categoryAPI = {
  // 获取所有分类
  getAllCategories: async (): Promise<{ data: Category[] }> => {
    try {
      return await api.get('/categories');
    } catch (error) {
      console.error('获取分类列表失败:', error);
      throw error;
    }
  },

  // 获取单个分类
  getCategory: async (id: string): Promise<{ data: Category }> => {
    try {
      return await api.get(`/categories/${id}`);
    } catch (error) {
      console.error(`获取分类(ID: ${id})失败:`, error);
      throw error;
    }
  },
};

export default categoryAPI;