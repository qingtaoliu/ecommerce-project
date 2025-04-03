'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Spin, Card, Steps, Divider, Button, Tag, message, Modal, Space } from 'antd';
import { 
  ShoppingCartOutlined, 
  CreditCardOutlined, 
  GiftOutlined, 
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  WalletOutlined
} from '@ant-design/icons';
import { ordersAPI } from '@/app/services/orders.api';
import Link from 'next/link';

// 与后端保持一致的订单状态枚举
export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

// 订单状态映射
const orderStatusMap = {
  'pending': { text: '待付款', color: 'orange', step: 0 },
  'confirmed': { text: '已付款', color: 'green', step: 1 },
  'shipped': { text: '已发货', color: 'blue', step: 2 },
  'delivered': { text: '已完成', color: 'green', step: 3 },
  'cancelled': { text: '已取消', color: 'red', step: 0 }
};

const OrderDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wechat' | 'card'>('alipay');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const orderId = params.id as string;

  // 获取订单详情
  const fetchOrderDetail = async () => {
    setLoading(true);
    try {
      const response = await ordersAPI.getOrderById(orderId);
      setOrder(response.data.data);
    } catch (error) {
      console.error('获取订单详情失败:', error);
      message.error('获取订单详情失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetail();
    }
  }, [orderId]);

  // 取消订单
  const handleCancelOrder = () => {
    Modal.confirm({
      title: '确认取消订单',
      icon: <ExclamationCircleOutlined />,
      content: '取消订单后，该订单将无法恢复，确定要取消吗？',
      onOk: async () => {
        setCancelLoading(true);
        try {
          await ordersAPI.cancelOrder(orderId);
          message.success('订单已取消');
          fetchOrderDetail();
        } catch (error) {
          console.error('取消订单失败:', error);
          message.error('取消订单失败');
        } finally {
          setCancelLoading(false);
        }
      }
    });
  };

  // 支付订单
  const handlePayOrder = async () => {
    setPayLoading(true);
    try {
      // 这里应该跳转到支付页面或调用支付API
      // 目前只是模拟支付成功
      await ordersAPI.payOrder(orderId);
      message.success('支付成功');
      fetchOrderDetail();
    } catch (error) {
      console.error('支付失败:', error);
      message.error('支付失败');
    } finally {
      setPayLoading(false);
    }
  };

  // 处理支付
  const handlePayment = () => {
    setPaymentModalVisible(true);
  };

  // 确认支付
  const handleConfirmPayment = async () => {
    try {
      setPaymentProcessing(true);
      
      // 模拟支付处理
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 调用支付API
      await ordersAPI.payOrder(orderId, paymentMethod);
      
      // 支付成功
      message.success('支付成功！');
      setPaymentModalVisible(false);
      
      // 刷新订单数据
      fetchOrderDetail();
    } catch (err) {
      message.error(err instanceof Error ? err.message : '支付过程中发生错误');
    } finally {
      setPaymentProcessing(false);
    }
  };

  // 取消支付
  const handleCancelPayment = () => {
    setPaymentModalVisible(false);
  };

  // 格式化时间
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  // 计算订单总价
  const calculateTotal = (items: any[]) => {
    return items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" tip="加载订单信息..." />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <div className="text-center py-8">
            <CloseCircleOutlined className="text-red-500 text-5xl mb-4" />
            <h2 className="text-2xl font-medium mb-4">订单不存在</h2>
            <p className="text-gray-500 mb-6">该订单可能已被删除或您没有权限查看</p>
            <Link href="/orders">
              <Button type="primary">查看我的订单</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }
  console.log(order);
  const status = orderStatusMap[order.status as keyof typeof orderStatusMap] || { text: '未知状态', color: 'default', step: 0 };
  const isCompleted = ['delivered', 'cancelled'].includes(order.status);
  const isPending = order.status === 'pending';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">订单详情</h1>
      <Space direction="vertical" className='w-full' size={16}>
        {/* 订单状态卡片 */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="text-lg font-medium mb-2">
                订单状态: <Tag color={status.color}>{status.text}</Tag>
              </div>
              <div className="text-gray-500">
                订单号: {order.id}
              </div>
              <div className="text-gray-500">
                下单时间: {formatDate(order.created_at)}
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              {isPending && (
                <div className="space-x-4">
                  <Button 
                    type="primary" 
                    icon={<WalletOutlined />}
                    loading={payLoading}
                    onClick={handlePayment}
                  >
                    立即支付
                  </Button>
                  <Button 
                    danger 
                    loading={cancelLoading}
                    onClick={handleCancelOrder}
                  >
                    取消订单
                  </Button>
                </div>
              )}
              {!isPending && !isCompleted && (
                <Button type="primary" onClick={() => router.push(`/orders/${orderId}/track`)}>
                  查看物流
                </Button>
              )}
            </div>
          </div>
          
          <Divider />
          
          {/* 订单进度 */}
          <Steps 
            current={status.step} 
            items={[
              {
                title: '提交订单',
                icon: <ShoppingCartOutlined />
              },
              {
                title: '付款成功',
                icon: <CreditCardOutlined />
              },
              {
                title: '商品发货',
                icon: <GiftOutlined />
              },
              {
                title: '交易完成',
                icon: <CheckCircleOutlined />
              }
            ]}
          />
        </Card>
        
        {/* 收货信息 */}
        <Card title="收货信息" className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">{order.shippingAddress?.recipientName}</p>
              <p>{order.shippingAddress?.phoneNumber}</p>
              <p>{order.shippingAddress?.province} {order.shippingAddress?.city} {order.shippingAddress?.district}</p>
              <p>{order.shippingAddress?.detailAddress}</p>
            </div>
            
            {order.shipment && (
              <div>
                <p><span className="font-medium">物流公司:</span> {order.shipment.carrier}</p>
                <p><span className="font-medium">物流单号:</span> {order.shipment.trackingNumber}</p>
                <p><span className="font-medium">发货时间:</span> {formatDate(order.shipment.shippedAt)}</p>
              </div>
            )}
          </div>
        </Card>
        
        {/* 商品信息 */}
        <Card title="商品信息" className="mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商品</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">单价</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">数量</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">小计</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={item.product?.imageUrl || '/images/placeholder.png'} 
                          alt={item.product?.name} 
                          className="w-12 h-12 object-cover mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            <Link href={`/product/${item.productId}`} className="hover:text-blue-500">
                              {item.product?.name || '商品已下架'}
                            </Link>
                          </div>
                          {item.attributes && Object.keys(item.attributes).length > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              {Object.entries(item.attributes).map(([key, value]) => (
                                <span key={key} className="mr-2">{key}: {value}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ¥{(parseFloat(item.price) / item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      ¥{parseFloat(item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="text-right mt-6">
            <div className="text-gray-500 mb-1">
              共 {order.items.length} 件商品，合计: <span className="text-xl text-red-500 font-bold">¥{calculateTotal(order.items)}</span>
            </div>
            {order.notes && (
              <div className="text-gray-500 text-sm">
                订单备注: {order.notes}
              </div>
            )}
          </div>
        </Card>
      </Space>
      
      {/* 订单操作 */}
      <div className="flex justify-center md:justify-end space-x-4 mt-8">
        <Button onClick={() => router.push('/orders')}>
          返回订单列表
        </Button>
        
        {order.status === 'delivered' && (
          <Button type="primary" onClick={() => router.push(`/review/order/${orderId}`)}>
            评价商品
          </Button>
        )}
      </div>
      
      {/* 支付模态框 */}
      <Modal
        title="订单支付"
        open={paymentModalVisible}
        onCancel={handleCancelPayment}
        footer={[
          <Button key="back" onClick={handleCancelPayment}>
            取消
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={paymentProcessing} 
            onClick={handleConfirmPayment}
          >
            确认支付
          </Button>,
        ]}
      >
        <div className="py-4">
          <h3 className="text-lg font-medium mb-4">选择支付方式</h3>
          
          <div className="space-y-4">
            <div 
              className={`p-4 border rounded-lg cursor-pointer flex items-center ${paymentMethod === 'alipay' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPaymentMethod('alipay')}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">
                <svg viewBox="64 64 896 896" focusable="false" data-icon="alipay" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M789 610.3c-38.7-12.9-90.7-32.7-148.5-53.6 34.8-60.3 62.5-129 80.7-203.6H530.5v-68.6h233.6v-38.3H530.5V132h-95.4c-16.7 0-16.7 16.5-16.7 16.5v97.8H182.2v38.3h236.3v68.6H223.4v38.3h378.4a667.18 667.18 0 01-54.5 132.9c-122.8-40.4-253.8-73.2-336.1-53-52.6 13-86.5 36.1-106.5 60.3-91.4 111-25.9 279.6 167.2 279.6C386 811.2 496 747.6 581.2 643 708.3 704 960 808.7 960 808.7V659.4s-31.6-2.5-171-49.1zM253.9 746.6c-150.5 0-195-118.3-120.6-183.1 24.8-21.9 70.2-32.6 94.4-35 89.4-8.8 172.2 25.2 269.9 72.8-68.8 89.5-156.3 145.3-243.7 145.3z"></path></svg>
              </div>
              <div>
                <div className="font-medium">支付宝</div>
                <div className="text-sm text-gray-500">推荐使用支付宝付款</div>
              </div>
            </div>
            
            <div 
              className={`p-4 border rounded-lg cursor-pointer flex items-center ${paymentMethod === 'wechat' ? 'border-green-500 bg-green-50' : ''}`}
              onClick={() => setPaymentMethod('wechat')}
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">
                <svg viewBox="64 64 896 896" focusable="false" data-icon="wechat" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 019.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 006.4-2.6 9 9 0 002.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 01-36 35.9z"></path></svg>
              </div>
              <div>
                <div className="font-medium">微信支付</div>
                <div className="text-sm text-gray-500">使用微信扫码支付</div>
              </div>
            </div>
            
            <div 
              className={`p-4 border rounded-lg cursor-pointer flex items-center ${paymentMethod === 'card' ? 'border-purple-500 bg-purple-50' : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white mr-3">
                <CreditCardOutlined />
              </div>
              <div>
                <div className="font-medium">银行卡支付</div>
                <div className="text-sm text-gray-500">使用储蓄卡/信用卡支付</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between">
              <span className="text-gray-500">订单金额：</span>
              <span className="font-bold">¥{calculateTotal(order.items)}</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderDetailPage;
