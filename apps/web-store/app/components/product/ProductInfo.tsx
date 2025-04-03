"use client";
import React, { useState, useContext } from 'react';
import { ProductDetail } from '@/app/data/products';
import { StarIcon, HeartIcon, ShareIcon } from '@/app/components/layout/Icons';
import { cartAPI } from '@/app/services/cart.api';
import { message, Modal, App } from 'antd';
import { useRouter } from 'next/navigation';
import { addressAPI } from '@/app/services/address.api';
import { ordersAPI } from '@/app/services/orders.api';
import { AuthContext } from '@/app/contexts/AuthContext';
import { authAPI } from '@/app/services/auth.api';

interface ProductInfoProps {
  product: ProductDetail;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useContext(AuthContext);
  const { message: messageApi, modal } = App.useApp();

  // 处理规格选择
  const handleSpecSelect = (specType: string, value: string) => {
    setSelectedSpecs(prev => ({
      ...prev,
      [specType]: value
    }));
  };

  // 处理数量变化
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  // 加入购物车
  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await cartAPI.addToCart({
        productId: product.id.toString(),
        quantity: quantity,
        attributes: Object.keys(selectedSpecs).length > 0 ? selectedSpecs : undefined
      });
      messageApi.success('已加入购物车');
    } catch (error) {
      console.error('加入购物车失败:', error);
      messageApi.error('加入购物车失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 立即购买
  const handleBuyNow = async () => {
    setLoading(true);
    try {
      // 检查用户是否已登录
      if (!auth?.isAuthenticated) {
        setLoading(false);
        modal.confirm({
          title: '请先登录',
          content: '您需要登录后才能购买商品',
          okText: '去登录',
          cancelText: '取消',
          onOk: () => {
            router.push(`/login?redirect=${encodeURIComponent(`/product/${product.id}`)}`);
          }
        });
        return;
      }
      
      // 直接创建订单
      const orderData = {
        shippingAddressId: '', // 需要先获取默认地址或跳转到地址选择页面
        items: [{
          productId: product.id.toString(),
          quantity: quantity
        }]
      };
      
      // 检查是否有默认地址
      const addressResponse = await addressAPI.getAddresses();
      console.log(addressResponse);
      const addresses = addressResponse.data.data || [];
      
      if (addresses.length === 0) {
        // 如果没有地址，跳转到地址管理页面
        messageApi.info('请先添加收货地址');
        router.push('/user/addresses?redirect=buy');
        return;
      }
      
      // 使用默认地址或第一个地址
      const defaultAddress = addresses.find((addr: any) => addr.isDefault) || addresses[0];
      orderData.shippingAddressId = defaultAddress.id;
      
      // 创建订单
      const response = await ordersAPI.createOrder(orderData);
      messageApi.success('订单创建成功');
      
      // 跳转到订单详情页
      router.push(`/orders/${response.data.data.id}`);
    } catch (error) {
      console.error('立即购买失败:', error);
      messageApi.error('操作失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-3/5 p-6 md:border-l border-gray-100">
      {/* 商品标题 */}
      <h1 className="text-xl md:text-2xl font-medium text-gray-800 mb-2">{product.name}</h1>
      
      {/* 商品简介 */}
      <p className="text-gray-500 text-sm mb-6">{product.brief}</p>
      
      {/* 价格区域 */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="text-gray-500 text-sm mb-1">优品价</div>
        <div className="flex items-baseline">
          <span className="text-orange-500 text-3xl font-bold">¥{product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-base line-through ml-3">¥{product.originalPrice}</span>
          )}
        </div>
      </div>
      
      {/* 商品元信息 */}
      <div className="flex gap-6 mb-6 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <StarIcon className="w-4 h-4 text-orange-400" />
          <span>{product.rating} 分</span>
        </div>
        <div>销量 {product.sales}+</div>
        <div>库存 {product.stock}</div>
      </div>
      
      {/* 规格选择 */}
      {Object.entries(product.specs).map(([specType, options]) => (
        <div key={specType} className="mb-6">
          <div className="text-gray-700 mb-2">{specType}</div>
          <div className="flex flex-wrap gap-3">
            {options.map(option => (
              <div 
                key={option}
                className={`px-4 py-2 border rounded-md cursor-pointer text-sm transition
                  ${selectedSpecs[specType] === option 
                    ? 'border-blue-500 bg-blue-50 text-blue-500' 
                    : 'border-gray-200 hover:border-blue-500'}`}
                onClick={() => handleSpecSelect(specType, option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* 数量选择 */}
      <div className="mb-8">
        <div className="text-gray-700 mb-2">数量</div>
        <div className="flex items-center">
          <div className="flex border border-gray-200 rounded-md">
            <button 
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input 
              type="number" 
              className="w-14 h-10 text-center border-x border-gray-200 focus:outline-none"
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              min={1}
              max={product.stock}
            />
            <button 
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>
        </div>
      </div>
      
      {/* 操作按钮 */}
      <div className="flex gap-4 mb-6">
        <button 
          className="px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-medium disabled:bg-blue-300"
          onClick={handleBuyNow}
          disabled={loading || product.stock <= 0}
        >
          立即购买
        </button>
        <button 
          className="px-8 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition font-medium disabled:bg-orange-300"
          onClick={handleAddToCart}
          disabled={loading || product.stock <= 0}
        >
          加入购物车
        </button>
        <button className="p-3 border border-gray-200 rounded-md hover:border-gray-300 transition">
          <HeartIcon className="w-5 h-5 text-gray-500" />
        </button>
        <button className="p-3 border border-gray-200 rounded-md hover:border-gray-300 transition">
          <ShareIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      
      {/* 服务承诺 */}
      <div className="flex gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <span>✓</span>
          <span>正品保证</span>
        </div>
        <div className="flex items-center gap-1">
          <span>✓</span>
          <span>急速发货</span>
        </div>
        <div className="flex items-center gap-1">
          <span>✓</span>
          <span>7天无理由退换</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
