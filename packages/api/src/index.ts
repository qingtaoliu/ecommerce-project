// 导出所有API服务
import { authAPI } from './auth';
import { productsAPI } from './products';
import { cartAPI } from './cart';
import { ordersAPI } from './orders';
import { userAPI } from './user';
import { categoryAPI } from './catergory';
import { addressAPI } from './address';
import http from './utils/http';


export {
  authAPI,
  productsAPI,
  cartAPI,
  ordersAPI,
  userAPI,
  categoryAPI,
  addressAPI,
  http
};
