export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  rating: number;
  sales: number;
  link: string;
  category: string;
}

export interface ProductDetail extends Product {
  description: string;
  brief: string;
  images: string[];
  specs: {
    [key: string]: string[]
  };
  stock: number;
  params: {
    [key: string]: string
  };
  reviews: Review[];
}

export interface Review {
  id: number;
  userName: string;
  avatar?: string;
  rating: number;
  content: string;
  date: string;
  images?: string[];
  specs?: string;
}

// 热销商品数据
export const hotProducts: Product[] = [
  {
    id: 1,
    name: '高性能游戏笔记本电脑',
    imageUrl: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 5999,
    originalPrice: 6999,
    rating: 4.8,
    sales: 1200,
    link: '/product/1',
    category: 'electronics'
  },
  {
    id: 2,
    name: '智能手表健康监测',
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 899,
    originalPrice: 1299,
    rating: 4.6,
    sales: 3500,
    link: '/product/2',
    category: 'electronics'
  },
  {
    id: 3,
    name: '无线蓝牙降噪耳机',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 799,
    originalPrice: 999,
    rating: 4.7,
    sales: 2800,
    link: '/product/3',
    category: 'electronics'
  },
  {
    id: 4,
    name: '专业级单反相机套装',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 4299,
    originalPrice: 4999,
    rating: 4.9,
    sales: 560,
    link: '/product/4',
    category: 'electronics'
  },
  {
    id: 5,
    name: '智能家居安防套装',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-bb0237f1b416?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 1299,
    originalPrice: 1599,
    rating: 4.5,
    sales: 1800,
    link: '/product/5',
    category: 'home'
  },
  {
    id: 6,
    name: '多功能厨房料理机',
    imageUrl: 'https://images.unsplash.com/photo-1574269906883-67810b96a773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 699,
    originalPrice: 899,
    rating: 4.6,
    sales: 3200,
    link: '/product/6',
    category: 'home'
  },
  {
    id: 7,
    name: '高清投影仪家用',
    imageUrl: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 2499,
    originalPrice: 2999,
    rating: 4.7,
    sales: 950,
    link: '/product/7',
    category: 'electronics'
  },
  {
    id: 8,
    name: '智能扫地机器人',
    imageUrl: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 1599,
    originalPrice: 1899,
    rating: 4.8,
    sales: 2100,
    link: '/product/8',
    category: 'home'
  }
];

// 新品上市数据
export const newProducts: Product[] = [
  {
    id: 9,
    name: '轻薄触控笔记本电脑',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 4999,
    originalPrice: 5499,
    rating: 4.7,
    sales: 850,
    link: '/product/9',
    category: 'electronics'
  },
  {
    id: 10,
    name: '智能空气净化器',
    imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 1299,
    originalPrice: 1499,
    rating: 4.6,
    sales: 1200,
    link: '/product/10',
    category: 'home'
  },
  {
    id: 11,
    name: '防水运动智能手环',
    imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 299,
    originalPrice: 399,
    rating: 4.5,
    sales: 5600,
    link: '/product/11',
    category: 'electronics'
  },
  {
    id: 12,
    name: '便携式蓝牙音箱',
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 399,
    originalPrice: 499,
    rating: 4.8,
    sales: 3200,
    link: '/product/12',
    category: 'electronics'
  },
  {
    id: 13,
    name: '智能体脂秤',
    imageUrl: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 199,
    originalPrice: 249,
    rating: 4.4,
    sales: 4800,
    link: '/product/13',
    category: 'health'
  },
  {
    id: 14,
    name: '多功能电煮锅',
    imageUrl: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 259,
    originalPrice: 329,
    rating: 4.6,
    sales: 2900,
    link: '/product/14',
    category: 'home'
  },
  {
    id: 15,
    name: '智能门锁指纹锁',
    imageUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 899,
    originalPrice: 1099,
    rating: 4.7,
    sales: 1500,
    link: '/product/15',
    category: 'home'
  },
  {
    id: 16,
    name: '无线充电器',
    imageUrl: 'https://images.unsplash.com/photo-1618577608951-cf3b868b9b07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 129,
    originalPrice: 169,
    rating: 4.5,
    sales: 6800,
    link: '/product/16',
    category: 'electronics'
  }
];

// 分类数据
export interface Category {
  id: number;
  name: string;
  icon: string;
  link: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: '电子产品',
    icon: '/icons/electronics.png',
    link: '/category/electronics'
  },
  {
    id: 2,
    name: '服装鞋包',
    icon: '/icons/clothing.png',
    link: '/category/clothing'
  },
  {
    id: 3,
    name: '家居用品',
    icon: '/icons/home.png',
    link: '/category/home'
  },
  {
    id: 4,
    name: '美妆个护',
    icon: '/icons/beauty.png',
    link: '/category/beauty'
  },
  {
    id: 5,
    name: '食品生鲜',
    icon: '/icons/food.png',
    link: '/category/food'
  },
  {
    id: 6,
    name: '母婴用品',
    icon: '/icons/baby.png',
    link: '/category/baby'
  },
  {
    id: 7,
    name: '运动户外',
    icon: '/icons/sports.png',
    link: '/category/sports'
  },
  {
    id: 8,
    name: '图书文具',
    icon: '/icons/books.png',
    link: '/category/books'
  },
  {
    id: 9,
    name: '家用电器',
    icon: '/icons/appliances.png',
    link: '/category/appliances'
  },
  {
    id: 10,
    name: '更多分类',
    icon: '/icons/more.png',
    link: '/categories'
  }
];

// 轮播图数据
export interface BannerItem {
  id: number;
  imageUrl: string;
  alt: string;
  link: string;
}

export const bannerItems: BannerItem[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    alt: '春季促销活动',
    link: '/promotion/spring'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    alt: '新品上市',
    link: '/new-arrivals'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    alt: '限时折扣',
    link: '/flash-sale'
  }
];
