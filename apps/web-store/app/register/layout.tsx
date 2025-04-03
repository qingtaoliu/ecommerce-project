import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '注册 - 优品商城',
  description: '在优品商城注册账户，享受便捷的购物体验。',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
