import HomePage from "./components/home/HomePage";
import { productsAPI, categoryAPI } from '@repo/api';

// 这是一个服务器组件，会在服务器端执行
async function getProducts() {
  try {
    // 在服务器端调用API
    const hotProducts = await productsAPI.getHotProducts(8);
    const newProducts = await productsAPI.getNewProducts(8);
    const categories = await categoryAPI.getAllCategories();
    
    return { hotProducts: hotProducts.data, newProducts: newProducts.data, categories: categories.data };
  } catch (error) {
    console.error('获取热销商品失败:', error);
    return { hotProducts: [], newProducts: [], categories: [] };
  }
}

export default async function Home() {
  // 在服务器端获取数据
  const products = await getProducts();
  
  // 将数据传递给客户端组件
  return <HomePage hotProducts={products?.hotProducts || []} newProducts={products?.newProducts || []} categories={products?.categories || []} />;
}
