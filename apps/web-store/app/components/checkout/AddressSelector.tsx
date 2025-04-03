'use client';

import React, { useState, useEffect } from 'react';
import { Radio, Button, Spin, Empty, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { addressAPI } from '@/app/services/address.api';

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

interface AddressSelectorProps {
  onSelect: (addressId: string) => void;
  selectedAddressId?: string;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({ onSelect, selectedAddressId }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [form] = Form.useForm();

  // 获取地址列表
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await addressAPI.getAddresses();
      const addressList = response.data.data || [];
      setAddresses(addressList);
      
      // 如果有默认地址且没有选中的地址，则自动选中默认地址
      if (!selectedAddressId) {
        const defaultAddress = addressList.find(addr => addr.isDefault);
        if (defaultAddress) {
          onSelect(defaultAddress.id);
        } else if (addressList.length > 0) {
          onSelect(addressList[0].id);
        }
      }
    } catch (error) {
      console.error('获取地址列表失败:', error);
      message.error('获取地址列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // 选择地址
  const handleSelect = (addressId: string) => {
    onSelect(addressId);
  };

  // 打开新增/编辑地址弹窗
  const showAddressModal = (address?: Address) => {
    setEditingAddress(address || null);
    form.resetFields();
    
    if (address) {
      form.setFieldsValue(address);
    }
    
    setModalVisible(true);
  };

  // 保存地址
  const handleSaveAddress = async (values: any) => {
    try {
      if (editingAddress) {
        // 编辑地址
        await addressAPI.updateAddress(editingAddress.id, values);
        message.success('地址更新成功');
      } else {
        // 新增地址
        const response = await addressAPI.createAddress(values);
        // 如果是第一个地址，自动选中
        if (addresses.length === 0) {
          onSelect(response.data.data.id);
        }
        message.success('地址添加成功');
      }
      
      setModalVisible(false);
      fetchAddresses();
    } catch (error) {
      console.error('保存地址失败:', error);
      message.error('保存地址失败');
    }
  };

  // 删除地址
  const handleDeleteAddress = async (addressId: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个地址吗？',
      onOk: async () => {
        try {
          await addressAPI.deleteAddress(addressId);
          message.success('地址删除成功');
          
          // 如果删除的是当前选中的地址，需要重新选择
          if (addressId === selectedAddressId) {
            const remainingAddresses = addresses.filter((addr: Address) => addr.id !== addressId);
            if (remainingAddresses.length > 0) {
              const defaultAddress = remainingAddresses.find((addr: Address) => addr.isDefault);
              onSelect(defaultAddress ? defaultAddress.id : remainingAddresses[0].id);
            } else {
              onSelect('');
            }
          }
          
          fetchAddresses();
        } catch (error) {
          console.error('删除地址失败:', error);
          message.error('删除地址失败');
        }
      }
    });
  };

  return (
    <div className="address-selector">
      {loading ? (
        <div className="flex justify-center py-6">
          <Spin />
        </div>
      ) : addresses.length === 0 ? (
        <Empty description="暂无收货地址">
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => showAddressModal()}
          >
            添加新地址
          </Button>
        </Empty>
      ) : (
        <div>
          <Radio.Group 
            value={selectedAddressId} 
            onChange={(e) => handleSelect(e.target.value)}
            className="w-full"
          >
            <div className="grid grid-cols-1 gap-4">
              {addresses.map((address: Address) => (
                <div 
                  key={address.id} 
                  className={`border rounded-lg p-4 ${selectedAddressId === address.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                >
                  <div className="flex items-start">
                    <Radio value={address.id} className="mt-1" />
                    <div className="ml-2 flex-1">
                      <div className="flex justify-between">
                        <div className="font-medium">
                          {address.recipientName} 
                          <span className="ml-4 text-gray-600">{address.phoneNumber}</span>
                          {address.isDefault && (
                            <span className="ml-2 text-xs bg-red-500 text-white px-1 py-0.5 rounded">默认</span>
                          )}
                        </div>
                        <div>
                          <Button 
                            type="text" 
                            icon={<EditOutlined />} 
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              showAddressModal(address);
                            }}
                          >
                            编辑
                          </Button>
                          <Button 
                            type="text" 
                            danger 
                            icon={<DeleteOutlined />} 
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAddress(address.id);
                            }}
                          >
                            删除
                          </Button>
                        </div>
                      </div>
                      <div className="text-gray-500 mt-1">
                        {address.province} {address.city} {address.district} {address.detailAddress}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Radio.Group>
          
          <div className="mt-4">
            <Button 
              type="dashed" 
              icon={<PlusOutlined />} 
              onClick={() => showAddressModal()}
              block
            >
              添加新地址
            </Button>
          </div>
        </div>
      )}

      {/* 新增/编辑地址弹窗 */}
      <Modal
        title={editingAddress ? '编辑收货地址' : '新增收货地址'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveAddress}
          initialValues={{ isDefault: false }}
        >
          <Form.Item
            name="recipientName"
            label="收货人"
            rules={[{ required: true, message: '请输入收货人姓名' }]}
          >
            <Input placeholder="请输入收货人姓名" />
          </Form.Item>
          
          <Form.Item
            name="phoneNumber"
            label="手机号码"
            rules={[
              { required: true, message: '请输入手机号码' },
              { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确' }
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
            <Input.TextArea placeholder="街道、门牌号等" rows={2} />
          </Form.Item>
          
          <Form.Item name="isDefault" valuePropName="checked">
            <Radio>设为默认收货地址</Radio>
          </Form.Item>
          
          <Form.Item className="mb-0 text-right">
            <Button onClick={() => setModalVisible(false)} className="mr-2">
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddressSelector;
