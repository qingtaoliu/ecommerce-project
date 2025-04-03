'use client';

import { useEffect, useState } from 'react';
import Banner from './Banner';
import CategorySection from './CategorySection';
import ProductSection from './ProductSection';
import { Product } from '../../data/products';
// import { Category } from '../../data/catergory';

interface HomePageProps {
  hotProducts: Product[];
  newProducts: Product[];
  categories: [];
}

export default function HomePage({ hotProducts, newProducts, categories }: HomePageProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 mt-8">
      {/* 轮播Banner */}
      <Banner />
      
      {/* 商品分类 */}
      <CategorySection categories={categories} />
      
      {/* 热销商品 */}
      <ProductSection title="热销商品" products={hotProducts} />
      
      {/* 新品上市 */}
      <ProductSection title="新品上市" products={newProducts} />
    </main>
  );
}
