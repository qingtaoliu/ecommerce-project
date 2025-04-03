'use client';

import React from 'react';
import { App } from 'antd';

// 创建一个Modal提供者组件，用于包裹需要使用Modal的组件
export default function ModalProvider({ children }: { children: React.ReactNode }) {
  return <App>{children}</App>;
}
