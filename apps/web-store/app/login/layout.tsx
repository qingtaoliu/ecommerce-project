import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '登录 - 优品商城',
  description: '登录您的优品商城账户，享受便捷的购物体验。',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
