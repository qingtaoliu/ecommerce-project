'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, InputNumber, Empty, Card, Checkbox, Divider, message, Modal, App } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cartAPI } from '../services/cart.api';
import { ordersAPI } from '../services/orders.api';
import { authAPI } from '../services/auth.api';
import AddressSelector from '@/app/components/checkout/AddressSelector';
import { AuthContext } from '@/app/contexts/AuthContext';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  selected: boolean;
}

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const auth = useContext(AuthContext);
  const { message: messageApi, modal } = App.useApp();

  // 获取购物车数据
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await cartAPI.getCartItems();
      const items = response.data.data.map(item => ({
        ...item,
        selected: false
      }));
      setCartItems(items);
      setLoading(false);
    } catch (error) {
      console.error('获取购物车数据失败:', error);
      messageApi.error('获取购物车数据失败');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // 更新购物车商品数量
  const handleQuantityChange = async (item: CartItem, value: number) => {
    try {
      await cartAPI.updateCartItem(item.id, { quantity: value });
      setCartItems(prev => 
        prev.map(i => 
          i.id === item.id ? { ...i, quantity: value } : i
        )
      );
    } catch (error) {
      console.error('更新数量失败:', error);
      messageApi.error('更新数量失败');
    }
  };

  // 删除商品
  const removeItem = async (id: string) => {
    try {
      await cartAPI.removeCartItem(id);
      setCartItems(prev => prev.filter(item => item.id !== id));
      messageApi.success('商品已从购物车移除');
    } catch (error) {
      console.error('删除商品失败:', error);
      messageApi.error('删除商品失败');
    }
  };

  // 选择/取消选择商品
  const toggleSelectItem = (id: string) => {
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setCartItems(updatedItems);
    setSelectAll(updatedItems.every(item => item.selected));
  };

  // 全选/取消全选
  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(prev => 
      prev.map(item => ({ ...item, selected: newSelectAll }))
    );
  };

  // 计算选中商品总价
  const calculateTotal = () => {
    return cartItems
      .filter(item => item.selected)
      .reduce((total, item) => total + (item.price * item.quantity), 0)
      .toFixed(2);
  };

  // 获取选中的商品数量
  const getSelectedCount = () => {
    return cartItems.filter(item => item.selected).length;
  };

  // 提交订单
  const handleCheckout = async () => {
    if (getSelectedCount() === 0) {
      messageApi.warning('请至少选择一件商品');
      return;
    }
    
    // 检查用户是否已登录
    if (!auth?.isAuthenticated) {
      modal.confirm({
        title: '请先登录',
        content: '您需要登录后才能结算购物车',
        okText: '去登录',
        cancelText: '取消',
        onOk: () => {
          router.push(`/login?redirect=${encodeURIComponent('/cart')}`);
        }
      });
      return;
    }
    
    setCheckoutModalVisible(true);
  };

  // 确认提交订单
  const confirmOrder = async () => {
    if (!selectedAddressId) {
      messageApi.warning('请选择收货地址');
      return;
    }

    setSubmitting(true);
    try {
      const selectedItems = cartItems.filter(item => item.selected);
      const orderData = {
        shippingAddressId: selectedAddressId,
        items: selectedItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      };

      const response = await ordersAPI.createOrder(orderData);
      messageApi.success('订单创建成功');
      setCheckoutModalVisible(false);
      
      // 跳转到订单详情页
      router.push(`/orders/${response.data.data.id}`);
    } catch (error) {
      console.error('创建订单失败:', error);
      messageApi.error('创建订单失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: <Checkbox checked={selectAll} onChange={toggleSelectAll} />,
      dataIndex: 'selected',
      key: 'selected',
      render: (_: any, record: CartItem) => (
        <Checkbox checked={record.selected} onChange={() => toggleSelectItem(record.id)} />
      ),
      width: 50
    },
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: CartItem) => (
        <div className="flex items-center">
          <img src={record.imageUrl} alt={text} className="w-16 h-16 object-cover mr-4" />
          <Link href={`/product/${record.productId}`} className="text-blue-600 hover:text-blue-800">
            {text}
          </Link>
        </div>
      )
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price.toFixed(2)}`,
      width: 100
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: CartItem) => (
        <InputNumber 
          min={1} 
          max={99} 
          value={quantity} 
          onChange={(value) => handleQuantityChange(record, value as number)}
        />
      ),
      width: 120
    },
    {
      title: '小计',
      key: 'subtotal',
      render: (record: CartItem) => `¥${(record.price * record.quantity).toFixed(2)}`,
      width: 100
    },
    {
      title: '操作',
      key: 'action',
      render: (record: CartItem) => (
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => removeItem(record.id)}
        >
          删除
        </Button>
      ),
      width: 100
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <ShoppingCartOutlined className="mr-2" /> 我的购物车
      </h1>

      {loading ? (
        <div className="text-center py-10">加载中...</div>
      ) : cartItems.length === 0 ? (
        <Empty 
          description="购物车是空的" 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button type="primary" onClick={() => router.push('/products')}>
            去购物
          </Button>
        </Empty>
      ) : (
        <>
          <Table 
            rowKey="id"
            columns={columns} 
            dataSource={cartItems}
            pagination={false}
            className="mb-6"
          />
          
          <Card className="mt-4">
            <div className="flex justify-between items-center">
              <div>
                <Checkbox 
                  checked={selectAll} 
                  onChange={toggleSelectAll}
                >
                  全选
                </Checkbox>
                <Button 
                  type="link" 
                  danger 
                  disabled={getSelectedCount() === 0}
                  onClick={() => {
                    modal.confirm({
                      title: '确认删除',
                      content: '确定要删除选中的商品吗？',
                      onOk: async () => {
                        const promises = cartItems
                          .filter(item => item.selected)
                          .map(item => removeItem(item.id));
                        await Promise.all(promises);
                      }
                    });
                  }}
                >
                  删除选中商品
                </Button>
              </div>
              <div className="text-right">
                <div className="mb-2">
                  已选择 <span className="text-red-500 font-bold">{getSelectedCount()}</span> 件商品，
                  合计: <span className="text-red-500 font-bold text-xl">¥{calculateTotal()}</span>
                </div>
                <Button 
                  type="primary" 
                  size="large"
                  disabled={getSelectedCount() === 0}
                  onClick={handleCheckout}
                >
                  结算
                </Button>
              </div>
            </div>
          </Card>
        </>
      )}

      {/* 结算弹窗 */}
      <Modal
        title="确认订单"
        open={checkoutModalVisible}
        onCancel={() => setCheckoutModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setCheckoutModalVisible(false)}>
            取消
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={submitting} 
            onClick={confirmOrder}
          >
            提交订单
          </Button>,
        ]}
        width={700}
      >
        <div className="py-4">
          <h3 className="text-lg font-medium mb-4">选择收货地址</h3>
          <AddressSelector 
            onSelect={(addressId: string) => setSelectedAddressId(addressId)} 
            selectedAddressId={selectedAddressId}
          />
          
          <Divider />
          
          <h3 className="text-lg font-medium mb-4">订单商品</h3>
          <div className="max-h-60 overflow-y-auto">
            {cartItems.filter(item => item.selected).map(item => (
              <div key={item.id} className="flex items-center mb-4 pb-4 border-b">
                <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover mr-3" />
                <div className="flex-1">
                  <div className="text-sm">{item.name}</div>
                  <div className="text-gray-500 text-xs">¥{item.price.toFixed(2)} × {item.quantity}</div>
                </div>
                <div className="text-right font-medium">
                  ¥{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-right">
            <div className="text-lg">
              总计: <span className="text-red-500 font-bold">¥{calculateTotal()}</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CartPage;
