import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="relative flex items-center">
        {/* 图标部分 */}
        <div className="relative">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-500"
          >
            {/* 购物袋形状 */}
            <path 
              d="M10 8L6 16V32C6 33.0609 6.42143 34.0783 7.17157 34.8284C7.92172 35.5786 8.93913 36 10 36H30C31.0609 36 32.0783 35.5786 32.8284 34.8284C33.5786 34.0783 34 33.0609 34 32V16L30 8H10Z" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* 购物袋提手 */}
            <path 
              d="M6 16H34" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* 购物袋提手 */}
            <path 
              d="M26 16C26 18.1217 25.1571 20.1566 23.6569 21.6569C22.1566 23.1571 20.1217 24 18 24C15.8783 24 13.8434 23.1571 12.3431 21.6569C10.8429 20.1566 10 18.1217 10 16" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* 优字 */}
            <text 
              x="20" 
              y="28" 
              fontFamily="Arial, sans-serif" 
              fontSize="12" 
              fontWeight="bold" 
              fill="currentColor" 
              textAnchor="middle"
            >
              优
            </text>
          </svg>
          
          {/* 闪光效果 */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
        </div>
        
        {/* 文字部分 */}
        <div className="ml-2 font-bold">
          <span className="text-blue-500 text-2xl">优品</span>
          <span className="text-gray-700 text-lg">商城</span>
        </div>
      </div>
    </Link>
  );
}
