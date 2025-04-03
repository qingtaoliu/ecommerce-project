'use client';

import Link from 'next/link';
import { SearchIcon, ShoppingCartIcon, UserIcon } from '../layout/Icons';
import Logo from './Logo';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Dropdown, Menu, Avatar, Badge, Divider, Tooltip, MenuProps, Spin } from 'antd';
import { 
  DownOutlined, 
  LogoutOutlined, 
  UserOutlined, 
  ShoppingOutlined, 
  HeartOutlined, 
  BellOutlined,
  LoadingOutlined
} from '@ant-design/icons';

export default function Header() {
  // 使用AuthContext获取用户登录状态
  const auth = useContext(AuthContext);
  
  if (!auth) {
    // 如果上下文不可用，显示默认未登录状态
    return (
      <DefaultHeader isLoggedIn={false} />
    );
  }
  
  const { user, logout, isLoading } = auth;

  // 用户下拉菜单
  const userMenu: MenuProps = {
    items: [
      {
        key: 'user-info',
        label: (
          <div className="px-4 py-3">
            <p className="text-sm leading-5 font-medium text-gray-900 truncate">
              {user?.nickname || user?.username}
            </p>
            <p className="text-xs leading-4 font-normal text-gray-500 truncate">
              {user?.email}
            </p>
          </div>
        ),
      },
      {
        type: 'divider',
      },
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: <Link href="/user/profile">个人资料</Link>,
        className: 'py-2',
      },
      {
        key: 'orders',
        icon: <ShoppingOutlined />,
        label: <Link href="/user/orders">我的订单</Link>,
        className: 'py-2',
      },
      {
        key: 'favorites',
        icon: <HeartOutlined />,
        label: <Link href="/user/favorites">我的收藏</Link>,
        className: 'py-2',
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: '退出登录',
        className: 'py-2 text-red-500 hover:text-red-700',
        onClick: logout,
      },
    ],
    className: 'w-56 py-2',
  };

  // 加载图标
  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* 顶部导航 */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Logo />

          {/* 搜索栏 */}
          <div className="flex w-1/2">
            <input
              type="text"
              placeholder="搜索商品"
              className="w-full px-4 py-2 border-2 border-blue-500 border-r-0 rounded-l-md focus:outline-none"
            />
            <button className="bg-blue-500 text-white px-5 py-2 rounded-r-md hover:bg-blue-600 transition">
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>

          {/* 用户操作 */}
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-6">
              {/* 通知 */}
              <Tooltip title="消息通知">
                <Badge count={3} size="small">
                  <div className="text-gray-600 hover:text-blue-500 transition cursor-pointer">
                    <BellOutlined style={{ fontSize: '20px' }} />
                  </div>
                </Badge>
              </Tooltip>
              
              {/* 收藏夹 */}
              <Tooltip title="我的收藏">
                <Link href="/user/favorites" className="text-gray-600 hover:text-blue-500 transition">
                  <HeartOutlined style={{ fontSize: '20px' }} />
                </Link>
              </Tooltip>
              
              {/* 购物车 */}
              <Tooltip title="购物车">
                <Badge count={5} size="small">
                  <Link href="/cart" className="text-gray-600 hover:text-blue-500 transition">
                    <ShoppingCartIcon className="w-5 h-5" />
                  </Link>
                </Badge>
              </Tooltip>
            </div>
            
            <Divider type="vertical" className="h-6" />
            
            {isLoading ? (
              // 加载状态
              <div className="h-10 flex items-center justify-center px-4">
                <Spin indicator={antIcon} />
              </div>
            ) : user ? (
              // 已登录状态
              <Dropdown menu={userMenu} trigger={['click']} placement="bottomRight">
                <div className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-blue-500 transition">
                  <Avatar 
                    size={32} 
                    src={user.avatar || undefined}
                    className="border-2 border-blue-100"
                  >
                    {user.nickname?.[0] || user.username?.[0] || 'U'}
                  </Avatar>
                  <div>
                    <span className="text-sm font-medium">{user.nickname || user.username}</span>
                    <DownOutlined style={{ fontSize: '10px', marginLeft: '3px' }} />
                  </div>
                </div>
              </Dropdown>
            ) : (
              // 未登录状态
              <div className="flex gap-3">
                <Link href="/login" className="px-4 py-1.5 text-sm font-medium text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50 transition">
                  登录
                </Link>
                <Link href="/register" className="px-4 py-1.5 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">
                  注册
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 分类导航 */}
        {/* <nav className="flex gap-8 py-4 border-t border-gray-100">
          <Link href="/category/all" className="font-medium text-gray-800 hover:text-blue-500 transition">
            全部商品
          </Link>
          <Link href="/category/electronics" className="font-medium text-gray-800 hover:text-blue-500 transition">
            电子产品
          </Link>
          <Link href="/category/clothing" className="font-medium text-gray-800 hover:text-blue-500 transition">
            服装鞋包
          </Link>
          <Link href="/category/home" className="font-medium text-gray-800 hover:text-blue-500 transition">
            家居用品
          </Link>
          <Link href="/category/beauty" className="font-medium text-gray-800 hover:text-blue-500 transition">
            美妆个护
          </Link>
          <Link href="/category/food" className="font-medium text-gray-800 hover:text-blue-500 transition">
            食品生鲜
          </Link>
        </nav> */}
      </div>
    </header>
  );
}

// 默认Header组件
function DefaultHeader({ isLoggedIn = false }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* 顶部导航 */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Logo />

          {/* 搜索栏 */}
          <div className="flex w-1/2">
            <input
              type="text"
              placeholder="搜索商品"
              className="w-full px-4 py-2 border-2 border-blue-500 border-r-0 rounded-l-md focus:outline-none"
            />
            <button className="bg-blue-500 text-white px-5 py-2 rounded-r-md hover:bg-blue-600 transition">
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>

          {/* 用户操作 */}
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-6">
              {/* 购物车 */}
              <Tooltip title="购物车">
                <Badge count={0} size="small">
                  <Link href="/cart" className="text-gray-600 hover:text-blue-500 transition">
                    <ShoppingCartIcon className="w-5 h-5" />
                  </Link>
                </Badge>
              </Tooltip>
            </div>
            
            <Divider type="vertical" className="h-6" />
            
            {isLoggedIn ? (
              // 已登录状态（默认）
              <Link href="/user" className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition">
                <UserIcon className="w-5 h-5" />
                <span>我的账户</span>
              </Link>
            ) : (
              // 未登录状态
              <div className="flex gap-3">
                <Link href="/login" className="px-4 py-1.5 text-sm font-medium text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50 transition">
                  登录
                </Link>
                <Link href="/register" className="px-4 py-1.5 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">
                  注册
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 分类导航
        <nav className="flex gap-8 py-4 border-t border-gray-100">
          <Link href="/category/all" className="font-medium text-gray-800 hover:text-blue-500 transition">
            全部商品
          </Link>
          <Link href="/category/electronics" className="font-medium text-gray-800 hover:text-blue-500 transition">
            电子产品
          </Link>
          <Link href="/category/clothing" className="font-medium text-gray-800 hover:text-blue-500 transition">
            服装鞋包
          </Link>
          <Link href="/category/home" className="font-medium text-gray-800 hover:text-blue-500 transition">
            家居用品
          </Link>
          <Link href="/category/beauty" className="font-medium text-gray-800 hover:text-blue-500 transition">
            美妆个护
          </Link>
          <Link href="/category/food" className="font-medium text-gray-800 hover:text-blue-500 transition">
            食品生鲜
          </Link>
        </nav> */}
      </div>
    </header>
  );
}
