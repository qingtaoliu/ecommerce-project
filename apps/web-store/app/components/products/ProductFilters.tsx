'use client';

import React, { useState, useEffect } from 'react';
import { Slider, Dropdown, Menu, Input, Button } from 'antd';
import { DownOutlined, SwapOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { categoryAPI, Category } from '../../services/catergory.api';

interface ProductFiltersProps {
  selectedCategories?: string[];
  selectedSort?: string;
  selectedMinPrice?: number;
  selectedMaxPrice?: number;
  selectedKeyword?: string;
  categories?: Category[];
}

// 排序选项
const sortOptions = [
  { value: 'newest', label: '最新上架' },
  { value: 'price_asc', label: '价格从低到高' },
  { value: 'price_desc', label: '价格从高到低' },
  { value: 'sales', label: '销量优先' },
  { value: 'rating', label: '评分优先' },
];

export default function ProductFilters({
  selectedCategories = ['all'],
  selectedSort = 'newest',
  selectedMinPrice,
  selectedMaxPrice,
  selectedKeyword,
  categories: initialCategories,
}: ProductFiltersProps) {
  const router = useRouter();
  
  // 状态管理
  const [categoriesState, setCategoriesState] = useState(selectedCategories);
  const [sort, setSort] = useState(selectedSort);
  const [keyword, setKeyword] = useState(selectedKeyword || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    selectedMinPrice || 0,
    selectedMaxPrice || 10000,
  ]);
  const [categories, setCategories] = useState<Category[]>(initialCategories || []);
  const [loading, setLoading] = useState<boolean>(!initialCategories);
  
  // 从接口获取分类数据
  useEffect(() => {
    if (!initialCategories) {
      const fetchCategories = async () => {
        try {
          setLoading(true);
          const response = await categoryAPI.getAllCategories();
          setCategories(response.data);
        } catch (error) {
          console.error('获取分类数据失败:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchCategories();
    }
  }, [initialCategories]);
  
  // 应用筛选器
  const applyFilters = (newCategories?: string[], newSort?: string, newPriceRange?: [number, number], newKeyword?: string) => {
    const params = new URLSearchParams();
    
    const finalCategories = newCategories !== undefined ? newCategories : categoriesState;
    const finalSort = newSort !== undefined ? newSort : sort;
    const finalPriceRange = newPriceRange !== undefined ? newPriceRange : priceRange;
    const finalKeyword = newKeyword !== undefined ? newKeyword : keyword;
    
    // 处理分类参数
    if (finalCategories && finalCategories.length > 0 && !finalCategories.includes('all')) {
      // 使用单个 categories 参数，多个值用逗号分隔
      params.append('categories', finalCategories.join(','));
    }
    
    if (finalSort && finalSort !== 'newest') {
      params.append('sort', finalSort);
    }
    
    if (finalPriceRange[0] > 0) {
      params.append('minPrice', finalPriceRange[0].toString());
    }
    
    if (finalPriceRange[1] < 10000) {
      params.append('maxPrice', finalPriceRange[1].toString());
    }
    
    if (finalKeyword) {
      params.append('keyword', finalKeyword);
    }
    
    // 重置页码
    params.append('page', '1');
    console.log('筛选参数:', params.toString());
    // 跳转到筛选后的页面
    router.push(`/products?${params.toString()}`);
  };
  
  // 重置筛选器
  const resetFilters = () => {
    setCategoriesState(['all']);
    setSort('newest');
    setKeyword('');
    setPriceRange([0, 10000]);
    router.push('/products');
  };

  // 处理分类变更
  const handleCategoryChange = (value: string[]) => {
    setCategoriesState(value);
    applyFilters(value, undefined, undefined);
  };

  // 处理排序变更
  const handleSortChange = (value: string) => {
    setSort(value);
    applyFilters(undefined, value, undefined);
  };

  // 处理价格范围变更
  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const handlePriceAfterChange = (value: [number, number]) => {
    applyFilters(undefined, undefined, value);
  };

  // 处理关键词变更
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeywordAfterChange = () => {
    applyFilters(undefined, undefined, undefined, keyword);
  };

  // 获取当前选中的排序选项标签
  const getCurrentSortLabel = () => {
    return sortOptions.find(option => option.value === sort)?.label || '默认排序';
  };
  
  // 构建分类选项列表
  const categoryOptions = [
    { value: 'all', label: '全部分类' },
    ...categories.map(cat => ({
      value: cat.name,
      label: cat.name
    }))
  ];
  
  return (
    <div className="mb-6 bg-gray-50 border border-gray-100 rounded-md p-4 mt-6">
      {/* 搜索框 - 放在最上方并优化 */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <Input.Search
          value={keyword}
          onChange={handleKeywordChange}
          onSearch={handleKeywordAfterChange}
          placeholder="搜索商品名称、描述或关键词..."
          enterButton="搜索"
          size="large"
          className="w-full"
          allowClear
        />
      </div>

      {/* 顶部筛选栏 */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
        {/* 分类选择 */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <span className="text-gray-500 mr-3 text-sm">分类:</span>
            <div className="flex space-x-4">
              {loading ? (
                <div className="flex space-x-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-5 w-16 bg-gray-200 animate-pulse rounded"></div>
                  ))}
                </div>
              ) : (
                categoryOptions.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      // 如果是"全部"分类，则清除其他所有选择
                      if (cat.value === 'all') {
                        handleCategoryChange(['all']);
                        return;
                      }
                      
                      // 处理多选逻辑
                      const newCategories = [...categoriesState];
                      
                      // 如果当前包含"全部"分类，则移除它
                      if (newCategories.includes('all')) {
                        const allIndex = newCategories.indexOf('all');
                        newCategories.splice(allIndex, 1);
                      }
                      
                      // 切换选中状态
                      if (newCategories.includes(cat.value)) {
                        // 如果已选中，则移除
                        const index = newCategories.indexOf(cat.value);
                        newCategories.splice(index, 1);
                        
                        // 如果移除后没有选中任何分类，则默认选中"全部"
                        if (newCategories.length === 0) {
                          newCategories.push('all');
                        }
                      } else {
                        // 如果未选中，则添加
                        newCategories.push(cat.value);
                      }
                      
                      handleCategoryChange(newCategories);
                    }}
                    className={`text-sm transition-colors ${
                      categoriesState.includes(cat.value)
                        ? 'text-red-600 font-medium'
                        : 'text-gray-700 hover:text-red-500'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 排序下拉菜单 */}
        <div className="flex items-center">
          <Dropdown
            overlay={
              <Menu>
                {sortOptions.map((option) => (
                  <Menu.Item 
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={sort === option.value ? 'ant-dropdown-menu-item-active' : ''}
                  >
                    {option.label}
                  </Menu.Item>
                ))}
              </Menu>
            }
            trigger={['click']}
          >
            <button className="flex items-center text-sm bg-white border border-gray-200 rounded px-3 py-1.5 hover:border-gray-300">
              <SwapOutlined className="mr-1 text-gray-500" />
              <span>{getCurrentSortLabel()}</span>
              <DownOutlined className="ml-1 text-xs text-gray-500" />
            </button>
          </Dropdown>
        </div>
      </div>

      {/* 价格筛选区域 */}
      <div className="flex items-center mb-6 bg-white p-3 rounded border border-gray-100">
        <div className="flex items-center mr-6">
          <FilterOutlined className="text-gray-500 mr-2" />
          <span className="text-sm text-gray-700">价格:</span>
        </div>
        
        <div className="flex-1 mx-4 max-w-md">
          <Slider
            range
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onChange={(value) => handlePriceChange(value as [number, number])}
            onAfterChange={(value) => handlePriceAfterChange(value as [number, number])}
            tooltip={{
              formatter: (value) => `¥${value}`
            }}
          />
        </div>
        
        {/* 价格输入框 */}
        <div className="flex items-center">
          <Input
            type="number"
            min={0}
            max={10000}
            value={priceRange[0]}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              handlePriceChange([value, priceRange[1]]);
            }}
            onBlur={() => handlePriceAfterChange(priceRange)}
            className="w-16"
            placeholder="最低"
            prefix="¥"
            size="small"
          />
          <span className="mx-2 text-gray-400">-</span>
          <Input
            type="number"
            min={0}
            max={10000}
            value={priceRange[1]}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              handlePriceChange([priceRange[0], value]);
            }}
            onBlur={() => handlePriceAfterChange(priceRange)}
            className="w-16"
            placeholder="最高"
            prefix="¥"
            size="small"
          />
          <Button
            onClick={() => handlePriceAfterChange(priceRange)}
            className="ml-2"
            type="primary"
            size="small"
            danger
          >
            确定
          </Button>
          
          {(priceRange[0] > 0 || priceRange[1] < 10000) && (
            <Button 
              onClick={() => {
                setPriceRange([0, 10000]);
                applyFilters(undefined, undefined, [0, 10000]);
              }}
              className="ml-2"
              type="link"
              size="small"
              danger
            >
              重置
            </Button>
          )}
        </div>
      </div>

      {/* 已选筛选条件 */}
      {(categoriesState.length > 0 && categoriesState[0] !== 'all' || sort !== 'newest' || priceRange[0] > 0 || priceRange[1] < 10000 || keyword) && (
        <div className="flex items-center mb-2 bg-white p-3 rounded border border-gray-100">
          <span className="text-sm text-gray-500 mr-3">已选条件:</span>
          <div className="flex flex-wrap gap-2">
            {categoriesState.length > 0 && categoriesState[0] !== 'all' && (
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded px-2 py-1">
                <span className="text-xs text-gray-700">
                  {categoriesState.join(', ')}
                </span>
                <button 
                  onClick={() => handleCategoryChange(['all'])}
                  className="ml-1 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            )}
            
            {sort !== 'newest' && (
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded px-2 py-1">
                <span className="text-xs text-gray-700">
                  {sortOptions.find(s => s.value === sort)?.label}
                </span>
                <button 
                  onClick={() => handleSortChange('newest')}
                  className="ml-1 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            )}
            
            {(priceRange[0] > 0 || priceRange[1] < 10000) && (
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded px-2 py-1">
                <span className="text-xs text-gray-700">
                  价格: ¥{priceRange[0]} - ¥{priceRange[1]}
                </span>
                <button 
                  onClick={() => {
                    setPriceRange([0, 10000]);
                    applyFilters(undefined, undefined, [0, 10000]);
                  }}
                  className="ml-1 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            )}
            
            {keyword && (
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded px-2 py-1">
                <span className="text-xs text-gray-700">
                  关键词: {keyword}
                </span>
                <button 
                  onClick={() => {
                    setKeyword('');
                    applyFilters(undefined, undefined, undefined, '');
                  }}
                  className="ml-1 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>
          
          <button 
            onClick={resetFilters}
            className="ml-auto text-sm text-red-600 hover:text-red-700"
          >
            清除所有筛选
          </button>
        </div>
      )}
    </div>
  );
}
