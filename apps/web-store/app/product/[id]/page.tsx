import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '../../components/product/ProductDetail';
import { getProductDetail } from '../../data/productDetails';
import { productsAPI } from '../../services/products.api';

interface Props {
  params: {
    id: string;
  };
}

// 从API获取产品详情
async function fetchProductDetail(id: string) {
  try {
    console.log("正在获取产品详情，ID:", id);
    const response = await productsAPI.getProductById(id);
    console.log("API响应:", response.data);
    
    // 检查响应数据结构
    if (response.data && response.data.data) {
      return response.data.data;
    } else if (response.data) {
      return response.data;
    }
    
    // 如果API返回空数据，尝试从本地数据获取
    console.log("API返回空数据，尝试从本地获取");
    return getProductDetail(id);
  } catch (error) {
    console.error('获取产品详情失败:', error);
    // 如果API请求失败，尝试从本地数据获取
    console.log("API请求失败，尝试从本地获取");
    return getProductDetail(id);
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 先等待 params 解析完成
  const resolvedParams = await Promise.resolve(params);
  const product = await fetchProductDetail(resolvedParams.id);
  
  if (!product) {
    return {
      title: '产品未找到 - 优品商城',
      description: '抱歉，您查找的产品不存在或已下架。',
    };
  }

  return {
    title: `${product.name} - 优品商城`,
    description: product.brief,
    openGraph: {
      images: [product.imageUrl],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  // 先等待 params 解析完成
  const resolvedParams = await Promise.resolve(params);
  // console.log("获取产品详情:", resolvedParams.id);
  const product = await fetchProductDetail(resolvedParams.id);
  
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
