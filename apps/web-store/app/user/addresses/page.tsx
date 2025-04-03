'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, List, Tag, Popconfirm, message, Spin, Empty, Modal, Form, Input, Radio, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { addressAPI } from '@/app/services/address.api';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthContext } from '@/app/contexts/AuthContext';

const { TextArea } = Input;

interface Address {
  id: string;
  recipientName: string;
  phoneNumber: string;
  province: string;
  city: string;
  district: string;
  detailAddress: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const auth = useContext(AuthContext);

  // 检查用户是否已登录
  useEffect(() => {
    if (!auth?.isLoading && !auth?.isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent('/user/addresses')}`);
    }
  }, [auth?.isLoading, auth?.isAuthenticated, router]);

  // 获取地址列表
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await addressAPI.getAddresses();
      setAddresses(response.data.data || []);
    } catch (error) {
      console.error('获取地址列表失败:', error);
      message.error('获取地址列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.isAuthenticated) {
      fetchAddresses();
    }
  }, [auth?.isAuthenticated]);

  // 打开添加地址模态框
  const handleAddAddress = () => {
    setEditingAddress(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 打开编辑地址模态框
  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    form.setFieldsValue({
      recipientName: address.recipientName,
      phoneNumber: address.phoneNumber,
      province: address.province,
      city: address.city,
      district: address.district,
      detailAddress: address.detailAddress,
      isDefault: address.isDefault
    });
    setModalVisible(true);
  };

  // 删除地址
  const handleDeleteAddress = async (id: string) => {
    try {
      await addressAPI.deleteAddress(id);
      message.success('地址删除成功');
      fetchAddresses();
    } catch (error) {
      console.error('删除地址失败:', error);
      message.error('删除地址失败');
    }
  };

  // 设为默认地址
  const handleSetDefault = async (id: string) => {
    try {
      await addressAPI.setDefaultAddress(id);
      message.success('已设为默认地址');
      fetchAddresses();
    } catch (error) {
      console.error('设置默认地址失败:', error);
      message.error('设置默认地址失败');
    }
  };

  // 提交表单
  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      if (editingAddress) {
        // 更新地址
        await addressAPI.updateAddress(editingAddress.id, values);
        message.success('地址更新成功');
      } else {
        // 添加地址
        await addressAPI.addAddress(values);
        message.success('地址添加成功');
      }
      setModalVisible(false);
      fetchAddresses();
      
      // 如果是从购买页面跳转过来的，添加完地址后返回
      if (redirect === 'buy') {
        router.back();
      }
    } catch (error) {
      console.error('保存地址失败:', error);
      message.error('保存地址失败');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && addresses.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" tip="加载地址信息..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card
        className="mb-8"
        title={<h1 className="text-2xl font-bold">我的收货地址</h1>}
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddAddress}>
            添加新地址
          </Button>
        }
      >
        {addresses.length === 0 ? (
          <Empty
            description="您还没有添加收货地址"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" onClick={handleAddAddress}>
              添加地址
            </Button>
          </Empty>
        ) : (
          <List
            dataSource={addresses}
            renderItem={(address) => (
              <List.Item
                key={address.id}
                actions={[
                  <Button 
                    key="edit" 
                    type="link" 
                    icon={<EditOutlined />}
                    onClick={() => handleEditAddress(address)}
                  >
                    编辑
                  </Button>,
                  <Popconfirm
                    key="delete"
                    title="确定要删除这个地址吗？"
                    onConfirm={() => handleDeleteAddress(address.id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type="link" danger icon={<DeleteOutlined />}>
                      删除
                    </Button>
                  </Popconfirm>,
                  !address.isDefault && (
                    <Button
                      key="default"
                      type="link"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      设为默认
                    </Button>
                  )
                ]}
              >
                <List.Item.Meta
                  avatar={<EnvironmentOutlined className="text-2xl text-blue-500" />}
                  title={
                    <div className="flex items-center">
                      <span className="mr-2 font-medium">{address.recipientName}</span>
                      <span className="mr-2 text-gray-500">{address.phoneNumber}</span>
                      {address.isDefault && <Tag color="blue">默认</Tag>}
                    </div>
                  }
                  description={
                    <div className="text-gray-500">
                      {address.province} {address.city} {address.district} {address.detailAddress}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>

      {/* 添加/编辑地址模态框 */}
      <Modal
        title={editingAddress ? '编辑收货地址' : '添加收货地址'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ isDefault: false }}
        >
          <Form.Item
            name="recipientName"
            label="收件人"
            rules={[{ required: true, message: '请输入收件人姓名' }]}
          >
            <Input placeholder="请输入收件人姓名" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="手机号码"
            rules={[
              { required: true, message: '请输入手机号码' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
            ]}
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>

          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              name="province"
              label="省份"
              rules={[{ required: true, message: '请输入省份' }]}
            >
              <Input placeholder="省份" />
            </Form.Item>

            <Form.Item
              name="city"
              label="城市"
              rules={[{ required: true, message: '请输入城市' }]}
            >
              <Input placeholder="城市" />
            </Form.Item>

            <Form.Item
              name="district"
              label="区/县"
              rules={[{ required: true, message: '请输入区/县' }]}
            >
              <Input placeholder="区/县" />
            </Form.Item>
          </div>

          <Form.Item
            name="detailAddress"
            label="详细地址"
            rules={[{ required: true, message: '请输入详细地址' }]}
          >
            <TextArea
              placeholder="请输入详细地址，如街道、门牌号等"
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>

          <Form.Item name="isDefault" valuePropName="checked">
            <Radio checked={form.getFieldValue('isDefault')}>
              设为默认收货地址
            </Radio>
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end space-x-4">
              <Button onClick={() => setModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit" loading={submitting}>
                保存
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
