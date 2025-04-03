import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 关于我们 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">关于我们</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition">公司简介</Link></li>
              <li><Link href="/news" className="text-gray-300 hover:text-white transition">新闻动态</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition">联系我们</Link></li>
              <li><Link href="/careers" className="text-gray-300 hover:text-white transition">加入我们</Link></li>
            </ul>
          </div>

          {/* 帮助中心 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">帮助中心</h3>
            <ul className="space-y-2">
              <li><Link href="/help/shipping" className="text-gray-300 hover:text-white transition">配送方式</Link></li>
              <li><Link href="/help/payment" className="text-gray-300 hover:text-white transition">支付方式</Link></li>
              <li><Link href="/help/return" className="text-gray-300 hover:text-white transition">退换货政策</Link></li>
              <li><Link href="/help/faq" className="text-gray-300 hover:text-white transition">常见问题</Link></li>
            </ul>
          </div>

          {/* 商家服务 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">商家服务</h3>
            <ul className="space-y-2">
              <li><Link href="/merchant/join" className="text-gray-300 hover:text-white transition">商家入驻</Link></li>
              <li><Link href="/merchant/rules" className="text-gray-300 hover:text-white transition">商家规则</Link></li>
              <li><Link href="/merchant/service" className="text-gray-300 hover:text-white transition">商家服务</Link></li>
              <li><Link href="/merchant/marketing" className="text-gray-300 hover:text-white transition">营销中心</Link></li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系方式</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">客服电话：400-123-4567</li>
              <li className="text-gray-300">服务时间：9:00-22:00</li>
              <li className="text-gray-300">客服邮箱：service@example.com</li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 电商平台 版权所有 ICP备案号：12345678</p>
        </div>
      </div>
    </footer>
  );
}
