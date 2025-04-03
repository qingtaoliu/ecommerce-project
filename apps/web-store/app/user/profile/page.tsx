'use client';

import React, { useState, useContext, useEffect } from 'react';
import { 
  Card, 
  Avatar, 
  Tabs, 
  Form, 
  Input, 
  Button, 
  Upload, 
  message, 
  Divider,
  Skeleton,
  Typography,
  Row,
  Col
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  LockOutlined, 
  UploadOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function UserProfile() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // 如果未登录，重定向到登录页面
  useEffect(() => {
    if (!auth?.isLoading && !auth?.user) {
      router.push('/login');
    }
  }, [auth?.isLoading, auth?.user, router]);

  // 初始化表单数据
  useEffect(() => {
    if (auth?.user) {
      form.setFieldsValue({
        username: auth.user.username,
        email: auth.user.email,
        nickname: auth.user.nickname || '',
        // 如果有其他字段，也可以在这里设置
      });
    }
  }, [auth?.user, form]);

  // 处理表单提交
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // 这里应该调用API更新用户信息
      console.log('提交的用户信息:', values);
      message.success('个人资料更新成功');
      setEditMode(false);
    } catch (error) {
      console.error('更新个人资料失败:', error);
      message.error('更新失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  // 处理密码修改
  const handlePasswordChange = async (values: any) => {
    setLoading(true);
    try {
      // 这里应该调用API修改密码
      console.log('提交的密码信息:', values);
      message.success('密码修改成功');
      passwordForm.resetFields();
    } catch (error) {
      console.error('密码修改失败:', error);
      message.error('密码修改失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  // 如果正在加载或未登录，显示加载状态
  if (auth?.isLoading || !auth?.user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex flex-col items-center">
            <Avatar 
              size={120} 
              src={auth.user.avatar} 
              icon={<UserOutlined />}
              className="mb-4 border-4 border-blue-100"
            />
            <Upload 
              showUploadList={false}
              beforeUpload={(file) => {
                // 这里应该处理头像上传
                console.log('上传的文件:', file);
                message.info('头像上传功能尚未实现');
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>更换头像</Button>
            </Upload>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <Title level={2} className="m-0">
                {auth.user.nickname || auth.user.username}
              </Title>
              {!editMode ? (
                <Button 
                  type="primary" 
                  icon={<EditOutlined />} 
                  onClick={() => setEditMode(true)}
                >
                  编辑资料
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    type="primary" 
                    icon={<SaveOutlined />} 
                    onClick={() => form.submit()}
                    loading={loading}
                  >
                    保存
                  </Button>
                  <Button 
                    icon={<CloseOutlined />} 
                    onClick={() => {
                      setEditMode(false);
                      form.resetFields();
                    }}
                  >
                    取消
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <Text type="secondary">
                <MailOutlined className="mr-2" />
                {auth.user.email}
              </Text>
            </div>
            
            <div className="mb-4">
              <Text type="secondary">
                <UserOutlined className="mr-2" />
                用户名: {auth.user.username}
              </Text>
            </div>
            
            <div className="mb-4">
              <Text type="secondary">
                注册时间: {new Date(auth.user.created_at).toLocaleDateString()}
              </Text>
            </div>
            
            {auth.user.last_login && (
              <div className="mb-4">
                <Text type="secondary">
                  上次登录: {new Date(auth.user.last_login).toLocaleString()}
                </Text>
              </div>
            )}
          </div>
        </div>
      </Card>
      
      <Card>
        <Tabs defaultActiveKey="profile">
          <TabPane tab="个人资料" key="profile">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              disabled={!editMode}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="username"
                    label="用户名"
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="用户名" />
                  </Form.Item>
                </Col>
                
                <Col span={12}>
                  <Form.Item
                    name="nickname"
                    label="昵称"
                  >
                    <Input prefix={<UserOutlined />} placeholder="昵称" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                      { required: true, message: '请输入邮箱' },
                      { type: 'email', message: '请输入有效的邮箱地址' }
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="邮箱" />
                  </Form.Item>
                </Col>
                
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="手机号码"
                  >
                    <Input prefix={<PhoneOutlined />} placeholder="手机号码" />
                  </Form.Item>
                </Col>
              </Row>
              
              {editMode && (
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    保存修改
                  </Button>
                </Form.Item>
              )}
            </Form>
          </TabPane>
          
          <TabPane tab="修改密码" key="password">
            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={handlePasswordChange}
            >
              <Form.Item
                name="currentPassword"
                label="当前密码"
                rules={[{ required: true, message: '请输入当前密码' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="当前密码" />
              </Form.Item>
              
              <Form.Item
                name="newPassword"
                label="新密码"
                rules={[
                  { required: true, message: '请输入新密码' },
                  { min: 6, message: '密码长度不能少于6个字符' }
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="新密码" />
              </Form.Item>
              
              <Form.Item
                name="confirmPassword"
                label="确认新密码"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: '请确认新密码' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次输入的密码不一致'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="确认新密码" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  修改密码
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
