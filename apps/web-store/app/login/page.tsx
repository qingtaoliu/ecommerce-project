'use client';

import React from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined, WechatOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useSearchParams } from 'next/navigation';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}


export default function LoginPage() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const [loading, setLoading] = React.useState(false);
  const { login } = useAuth();

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      // 调用登录API
      await login(values.email, values.password);
      
      // 显示成功消息
      messageApi.success('登录成功');
      
      // 如果选择了"记住我"，可以在这里设置更长的令牌有效期
      // 目前在AuthContext中已经保存了令牌
      
      // 登录成功后重定向到指定页面或首页
      setTimeout(() => {
        router.push(redirectUrl);
      }, 1500);
    } catch (error: any) {
      // 显示错误消息
      messageApi.error(error.message || '登录失败，请检查您的邮箱和密码');
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
          <Text type="secondary">登录您的账户，享受更多专属服务</Text>
        </div>

        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: '请输入您的邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="邮箱" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入您的密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <Link href="/forgot-password" style={{ color: '#1677ff' }}>
                忘记密码?
              </Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>
          <Text type="secondary">其他登录方式</Text>
        </Divider>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
          <Button shape="circle" icon={<GithubOutlined />} size="large" />
          <Button shape="circle" icon={<WechatOutlined />} size="large" />
        </div>

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary">还没有账户? </Text>
          <Link href="/register" style={{ color: '#1677ff' }}>
            立即注册
          </Link>
        </div>
      </Card>
    </div>
  );
}
