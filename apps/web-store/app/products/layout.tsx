import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '商品列表 - 优品商城',
  description: '浏览优品商城的全部商品，包括电子产品、服装、家居用品等多种类别。',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
