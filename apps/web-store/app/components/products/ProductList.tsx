'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pagination, Empty } from 'antd';
import { Product } from '../../data/products';

interface ProductListProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
}

export default function ProductList({ products, currentPage, totalPages }: ProductListProps) {
  // 处理分页变化
  const handlePageChange = (page: number) => {
    // 获取当前URL参数
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    
    // 更新页码参数
    params.set('page', page.toString());
    
    // 跳转到新页面
    window.location.href = `${window.location.pathname}?${params.toString()}`;
  };

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Empty description="暂无商品" />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link 
            href={`/product/${product.id}`} 
            key={product.id}
            className="group bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  )}% 折扣
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-red-600 font-bold">¥{product.price}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-gray-400 text-sm line-through ml-2">
                      ¥{product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500">{product.sales}人付款</div>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-current" : "fill-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination 
            current={currentPage} 
            total={totalPages * 10} 
            onChange={handlePageChange} 
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`}
            pageSize={10}
            itemRender={(page, type, originalElement) => {
              if (type === 'prev') {
                return <a>上一页</a>;
              }
              if (type === 'next') {
                return <a>下一页</a>;
              }
              return originalElement;
            }}
          />
        </div>
      )}
    </div>
  );
}
