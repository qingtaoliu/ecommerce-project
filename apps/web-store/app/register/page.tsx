'use client';

import React from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  nickname?: string;
  phone?: string;
  agreement: boolean;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register, error: authError } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      // 调用AuthContext中的register方法
      const { agreement, ...registerData } = values;
      await register(registerData);
      
      messageApi.success('注册成功');
      
      // 注册成功后重定向到首页
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error: any) {
      messageApi.error(error.message || '注册失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(to right, #f6f9fc, #eef2f7)'
    }}>
      {contextHolder}
      <Card 
        style={{ 
          width: 400, 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Link href="/">
            <Title level={2} style={{ margin: 0, color: '#1677ff' }}>优品商城</Title>
          </Link>
          <Text type="secondary">创建您的账户，开启购物之旅</Text>
        </div>

        <Form
          name="register_form"
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入您的用户名' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入您的邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="邮箱" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入您的密码' },
              { min: 6, message: '密码长度至少为6位' },
              {
                pattern: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                message: '密码必须包含至少一个大写字母、一个小写字母和一个数字或特殊字符'
              }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认您的密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              { 
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('请同意用户协议和隐私政策')),
              },
            ]}
          >
            <Checkbox>
              我已阅读并同意
              <a href="/terms" style={{ color: '#1677ff', margin: '0 4px' }}>
                用户协议
              </a>
              和
              <a href="/privacy" style={{ color: '#1677ff', margin: '0 4px' }}>
                隐私政策
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
              注册
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary">已有账户? </Text>
          <Link href="/login" style={{ color: '#1677ff' }}>
            立即登录
          </Link>
        </div>
      </Card>
    </div>
  );
}
