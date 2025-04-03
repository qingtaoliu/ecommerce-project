import Image from "next/image";
import Link from "next/link";
import { Product } from "../../data/products";

interface ProductSectionProps {
  title: string;
  products: Product[];
  loading?: boolean;
}

export default function ProductSection({ title, products, loading = false }: ProductSectionProps) {
  // 创建骨架屏数组
  const skeletonArray = Array.from({ length: 8 }, (_, index) => index);
  console.log(products);
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          // 加载状态显示骨架屏
          skeletonArray.map((index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48 w-full bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                <div className="flex items-center justify-between mt-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          // 数据加载完成显示商品列表
          products.map((product) => (
            <Link
              href={product.link}
              key={product.id}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="relative h-48 w-full overflow-hidden">
                {product.imageUrl && (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                {product.originalPrice && (
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
                    {product.originalPrice && (
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
          ))
        )}
      </div>
    </div>
  );
}
