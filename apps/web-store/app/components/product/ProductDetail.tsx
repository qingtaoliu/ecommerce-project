import React from 'react';
import Link from 'next/link';
import { ProductDetail as ProductDetailType } from '@/app/data/products';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';

interface ProductDetailProps {
  product: ProductDetailType;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  console.log(product);
  return (
    <main className="container mx-auto px-4 py-6 mt-8">
      {/* 面包屑导航 */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-500 transition">首页</Link>
        <span className="mx-2">&gt;</span>
        <Link href={`/category/${product.category}`} className="hover:text-blue-500 transition">
          {getCategoryName(product.category)}
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      {/* 商品详情区域 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 flex flex-col md:flex-row">
        {/* 商品图片区域 */}
        <ProductGallery images={product.images} name={product.name} />

        {/* 商品信息区域 */}
        <ProductInfo product={product} />
      </div>

      {/* 商品详情选项卡 */}
      <ProductTabs product={product} />
    </main>
  );
}

// 获取分类名称
function getCategoryName(category: string): string {
  const categoryMap: Record<string, string> = {
    'electronics': '电子产品',
    'clothing': '服装鞋包',
    'home': '家居用品',
    'beauty': '美妆个护',
    'food': '食品生鲜',
    'baby': '母婴用品',
    'sports': '运动户外',
    'books': '图书文具',
    'appliances': '家用电器'
  };
  
  return categoryMap[category] || '其他分类';
}
