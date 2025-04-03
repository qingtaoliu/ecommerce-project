"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { ProductDetail } from '@/app/data/products';
import { StarIcon } from '@/app/components/layout/Icons';

interface ProductTabsProps {
  product: ProductDetail;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
      {/* 选项卡头部 */}
      <div className="flex border-b border-gray-100">
        <button 
          className={`px-8 py-4 text-base font-medium relative ${
            activeTab === 'description' 
              ? 'text-blue-500' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('description')}
        >
          商品详情
          {activeTab === 'description' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
          )}
        </button>
        <button 
          className={`px-8 py-4 text-base font-medium relative ${
            activeTab === 'params' 
              ? 'text-blue-500' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('params')}
        >
          规格参数
          {activeTab === 'params' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
          )}
        </button>
        <button 
          className={`px-8 py-4 text-base font-medium relative ${
            activeTab === 'reviews' 
              ? 'text-blue-500' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('reviews')}
        >
          用户评价({product?.reviews?.length})
          {activeTab === 'reviews' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
          )}
        </button>
      </div>

      {/* 选项卡内容 */}
      <div className="p-6">
        {/* 商品详情 */}
        {activeTab === 'description' && (
          <div className="product-description">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
              {product.description}
            </p>
            {product.images.map((image, index) => (
              <div key={index} className="my-6 flex justify-center">
                <Image 
                  src={image} 
                  alt={`${product.name} - 详情图 ${index + 1}`}
                  width={800}
                  height={600}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        )}

        {/* 规格参数 */}
        {activeTab === 'params' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {Object.entries(product.params).map(([key, value], index) => (
                  <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <th className="py-3 px-4 text-left font-normal text-gray-500 w-1/4">{key}</th>
                    <td className="py-3 px-4 text-gray-700">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 用户评价 */}
        {activeTab === 'reviews' && (
          <div>
            {/* 评价统计 */}
            <div className="flex border-b border-gray-100 pb-6 mb-6">
              <div className="w-48 text-center pr-6 border-r border-gray-100">
                <div className="text-3xl font-bold text-orange-500 mb-1">{product.rating}</div>
                <div className="flex justify-center text-orange-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4" />
                  ))}
                </div>
                <div className="text-sm text-gray-500">{product.reviews.length}条评价</div>
              </div>
              <div className="flex-1 pl-8">
                {/* 评价分布 */}
                <div className="space-y-2">
                  {['好评', '中评', '差评'].map((type, index) => (
                    <div key={type} className="flex items-center">
                      <div className="w-12 text-sm text-gray-500">{type}</div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full mx-3 overflow-hidden">
                        <div 
                          className="h-full bg-orange-400 rounded-full" 
                          style={{ width: index === 0 ? '90%' : index === 1 ? '8%' : '2%' }}
                        ></div>
                      </div>
                      <div className="w-12 text-right text-sm text-gray-500">
                        {index === 0 ? '90%' : index === 1 ? '8%' : '2%'}
                      </div>
                    </div>
                  ))}
                </div>
                {/* 评价标签 */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {['全部', '有图', '最新', '好评', '追评'].map((tag, index) => (
                    <div 
                      key={tag} 
                      className={`px-3 py-1 text-sm rounded-full cursor-pointer ${
                        index === 0 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 评价列表 */}
            <div className="space-y-6">
              {product.reviews.map(review => (
                <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
                  <div className="flex justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-medium">
                        {review.avatar || review.userName.charAt(0)}
                      </div>
                      <div className="font-medium">{review.userName}</div>
                    </div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                  <div className="flex text-orange-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-orange-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <div className="text-gray-700 mb-3">{review.content}</div>
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {review.images.map((image, index) => (
                        <div key={index} className="relative w-20 h-20 rounded-md overflow-hidden">
                          <Image 
                            src={image} 
                            alt={`评价图片 ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {review.specs && (
                    <div className="text-sm text-gray-500">
                      购买规格：{review.specs}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
