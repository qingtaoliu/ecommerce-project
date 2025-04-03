import { productsAPI } from '../services/products.api';
import { categoryAPI } from '../services/catergory.api';
import ProductList from '../components/products/ProductList';
import ProductFilters from '../components/products/ProductFilters';

// 从API获取产品列表
async function getProducts(
  category?: string,
  sort?: string,
  minPrice?: number,
  maxPrice?: number,
  page: number = 1,
  limit: number = 20,
  categories?: string | string[],
  keyword?: string
) {
  console.log("获取产品参数:", { category, categories, sort, minPrice, maxPrice, page, limit, keyword });
  try {
    // 转换排序参数
    let orderBy: string | undefined;
    let orderDirection: 'ASC' | 'DESC' | undefined;
    
    if (sort) {
      switch (sort) {
        case 'price_asc':
          orderBy = 'price';
          orderDirection = 'ASC';
          break;
        case 'price_desc':
          orderBy = 'price';
          orderDirection = 'DESC';
          break;
        case 'newest':
          orderBy = 'createdAt';
          orderDirection = 'DESC';
          break;
        case 'sales':
          orderBy = 'sales';
          orderDirection = 'DESC';
          break;
        case 'rating':
          orderBy = 'rating';
          orderDirection = 'DESC';
          break;
      }
    }
    
    // 处理分类参数
    let categoryParams: { categoryId?: string, categories?: string[] } = {};
    
    // 优先使用 categories 参数
    if (categories) {
      if (Array.isArray(categories)) {
        if (categories.length > 0 && !categories.includes('all')) {
          categoryParams.categories = categories;
        }
      } else if (typeof categories === 'string' && categories !== 'all') {
        if (categories.includes(',')) {
          categoryParams.categories = categories.split(',').map(c => c.trim());
        } else {
          categoryParams.categories = [categories];
        }
      }
    }
    // 如果没有 categories 参数，则使用 category 参数
    else if (category && category !== 'all') {
      if (category.includes(',')) {
        categoryParams.categories = category.split(',').map(c => c.trim());
      } else {
        categoryParams.categories = [category];
      }
    }
    
    console.log("分类参数:", categoryParams);
    
    // 使用productsAPI服务获取数据
    const response = await productsAPI.getProducts({
      page,
      pageSize: limit,
      ...categoryParams,
      orderBy,
      orderDirection,
      minPrice,
      maxPrice,
      keyword
    });
    
    // 使用后端返回的分页元数据
    const { data, meta } = response.data;
    return { 
      data, 
      total: meta.total, 
      page: meta.page, 
      limit: meta.pageSize,
      totalPages: meta.totalPages
    };
  } catch (error) {
    console.error('获取产品列表失败:', error);
    return { data: [], total: 0, page, limit, totalPages: 0 };
  }
}

// 获取分类列表
async function getCategories() {
  try {
    const response = await categoryAPI.getAllCategories();
    return response.data;
  } catch (error) {
    console.error('获取分类列表失败:', error);
    return [];
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    category?: string;
    categories?: string | string[];
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    keyword?: string;
  };
}) {
  // 使用解构赋值前先等待 searchParams
  const searchParamsResolved = await Promise.resolve(searchParams);
  
  const { 
    category,
    categories,
    sort, 
    minPrice, 
    maxPrice, 
    page = '1',
    keyword
  } = searchParamsResolved;
  
  console.log("搜索参数:", { category, categories, sort, minPrice, maxPrice, page, keyword });
  const parsedPage = parseInt(page, 10) || 1;
  const parsedMinPrice = minPrice ? parseFloat(minPrice) : undefined;
  const parsedMaxPrice = maxPrice ? parseFloat(maxPrice) : undefined;
  const pageSize = 12; // 每页显示12个产品

  // 并行获取产品和分类数据
  const [
    { data: products, total, page: currentPage, limit, totalPages },
    allCategories
  ] = await Promise.all([
    getProducts(
      category,
      sort,
      parsedMinPrice,
      parsedMaxPrice,
      parsedPage,
      pageSize,
      categories,
      keyword
    ),
    getCategories()
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">全部商品</h1>
      
      <div className="flex flex-col mb-8">
        {/* 筛选器 */}
        <div className="w-full">
          <ProductFilters 
            selectedCategories={
              categories 
                ? (Array.isArray(categories) 
                  ? categories 
                  : categories.split(',').map(c => c.trim()))
                : (category && category !== 'all' 
                  ? [category] 
                  : ['all'])
            }
            selectedSort={sort}
            selectedMinPrice={parsedMinPrice}
            selectedMaxPrice={parsedMaxPrice}
            selectedKeyword={keyword}
            categories={allCategories}
          />
        </div>
        
        {/* 产品列表 */}
        <div className="w-full">
          <ProductList 
            products={products} 
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
