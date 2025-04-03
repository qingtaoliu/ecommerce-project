import { ProductDetail } from './products';

// 商品详情数据
export const productDetails: { [key: string]: ProductDetail } = {
  '1': {
    id: 1,
    name: '高性能游戏笔记本电脑',
    imageUrl: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 5999,
    originalPrice: 6999,
    rating: 4.8,
    sales: 1200,
    link: '/product/1',
    category: 'electronics',
    brief: '第12代酷睿i7处理器 | RTX 3060显卡 | 16GB内存 | 512GB固态硬盘 | 144Hz高刷新率',
    description: '这款高性能游戏笔记本电脑采用最新第12代酷睿i7处理器和RTX 3060显卡，为游戏玩家和创意工作者提供卓越的性能体验。16GB高速内存和512GB大容量固态硬盘，让您的游戏和应用运行更加流畅。144Hz高刷新率屏幕，带来更加流畅的视觉体验，减少游戏中的卡顿和拖影。全RGB背光键盘，可自定义灯光效果，让您的游戏体验更加个性化。',
    images: [
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      '处理器': ['i5-12500H', 'i7-12700H', 'i9-12900H'],
      '内存': ['8GB', '16GB', '32GB'],
      '存储': ['256GB SSD', '512GB SSD', '1TB SSD'],
      '显卡': ['RTX 3050', 'RTX 3060', 'RTX 3070'],
      '颜色': ['星空灰', '幻影黑']
    },
    stock: 100,
    params: {
      '品牌': '优品科技',
      '型号': 'YP-Gaming Pro',
      '处理器': '第12代英特尔酷睿i7-12700H',
      '内存': '16GB DDR5 4800MHz',
      '硬盘': '512GB PCIe 4.0 NVMe SSD',
      '显卡': 'NVIDIA GeForce RTX 3060 6GB GDDR6',
      '显示屏': '15.6英寸 IPS 144Hz 1920x1080',
      '电池': '80Wh',
      '重量': '2.3kg',
      '尺寸': '359 x 266 x 23.9 mm',
      '操作系统': 'Windows 11 家庭版',
      '保修': '1年全国联保'
    },
    reviews: [
      {
        id: 101,
        userName: '游戏达人',
        avatar: 'G',
        rating: 5,
        content: '这台笔记本的性能真的很强大，玩《赛博朋克2077》全特效都能保持60帧以上，散热也做得不错，长时间游戏键盘区域温度可控。屏幕素质很好，色彩鲜艳，刷新率高，玩游戏很流畅。唯一的缺点可能是重量稍微有点大，但考虑到性能，这是可以接受的。',
        date: '2024-12-15',
        images: [
          'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1587614297882-0954cf37d933?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        specs: 'i7-12700H | 16GB | 512GB SSD | RTX 3060 | 星空灰'
      },
      {
        id: 102,
        userName: '设计师小王',
        avatar: 'W',
        rating: 4,
        content: '作为一名平面设计师，这台笔记本的性能完全满足我的需求。Adobe套件运行流畅，渲染速度快。屏幕色彩准确度高，这对我的工作非常重要。键盘手感不错，长时间打字也很舒适。电池续航一般，大约4-5小时，希望能再长一些。',
        date: '2024-12-10',
        specs: 'i7-12700H | 32GB | 1TB SSD | RTX 3060 | 幻影黑'
      },
      {
        id: 103,
        userName: '学生党',
        avatar: 'S',
        rating: 5,
        content: '这台电脑性价比很高，比同配置的其他品牌便宜不少。性能强劲，无论是学习编程还是偶尔玩游戏都很流畅。键盘背光很酷，可以自定义颜色。风扇声音在游戏时有点大，但平时使用很安静。总体来说非常满意这次购买！',
        date: '2024-12-05',
        specs: 'i5-12500H | 16GB | 512GB SSD | RTX 3050 | 星空灰'
      }
    ]
  },
  '2': {
    id: 2,
    name: '智能手表健康监测',
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 899,
    originalPrice: 1299,
    rating: 4.6,
    sales: 3500,
    link: '/product/2',
    category: 'electronics',
    brief: '心率监测 | 血氧检测 | 睡眠分析 | 50米防水 | 14天续航',
    description: '这款智能手表集成了多种健康监测功能，包括24小时心率监测、血氧饱和度检测、压力监测和睡眠质量分析。支持50多种运动模式，精准记录您的运动数据。50米防水设计，游泳也可佩戴。14天超长续航，充电一次，使用两周。1.3英寸AMOLED高清屏幕，阳光下也清晰可见。',
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      '表盘材质': ['钢化玻璃', '蓝宝石玻璃'],
      '表带材质': ['硅胶', '尼龙', '皮革'],
      '颜色': ['曜石黑', '月光银', '星空蓝']
    },
    stock: 200,
    params: {
      '品牌': '优品科技',
      '型号': 'YP-Watch Pro',
      '屏幕': '1.3英寸 AMOLED 360x360',
      '电池容量': '420mAh',
      '续航时间': '标准模式14天，GPS模式40小时',
      '防水等级': '5ATM（50米防水）',
      '传感器': '光学心率传感器、加速度传感器、陀螺仪、气压计、环境光传感器',
      '连接': 'Bluetooth 5.0, NFC',
      '兼容系统': 'Android 6.0及以上, iOS 10.0及以上',
      '尺寸': '46.4 x 46.4 x 10.7 mm',
      '重量': '32g（不含表带）',
      '保修': '1年全国联保'
    },
    reviews: [
      {
        id: 201,
        userName: '运动爱好者',
        avatar: 'R',
        rating: 5,
        content: '这款手表的运动监测功能非常准确，我用它跑步、游泳和骑行，数据都很精准。电池续航也很给力，充一次电可以用将近两周。表带舒适，长时间佩戴也不会有不适感。防水性能很好，游泳时使用没有任何问题。',
        date: '2024-12-18',
        images: [
          'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        specs: '蓝宝石玻璃 | 硅胶表带 | 曜石黑'
      },
      {
        id: 202,
        userName: '健康达人',
        avatar: 'H',
        rating: 4,
        content: '手表的健康监测功能很全面，心率、血氧、睡眠监测都很准确。App界面设计得很好，数据展示清晰明了。唯一的小缺点是有时候手腕抬起亮屏不够灵敏，需要明显的动作才能点亮屏幕。总体来说是一款性价比很高的健康手表。',
        date: '2024-12-12',
        specs: '钢化玻璃 | 尼龙表带 | 星空蓝'
      }
    ]
  },
  '3': {
    id: 3,
    name: '专业无线降噪耳机',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 1299,
    originalPrice: 1699,
    rating: 4.7,
    sales: 2800,
    link: '/product/3',
    category: 'electronics',
    brief: '主动降噪 | Hi-Fi音质 | 40小时续航 | 蓝牙5.2 | 触控操作',
    description: '这款专业级无线降噪耳机采用先进的主动降噪技术，可以有效隔绝95%的环境噪音，让您沉浸在音乐世界中。40mm大尺寸动圈单元，带来震撼的低音效果和清晰的高音表现。蓝牙5.2技术，连接稳定，延迟低。一次充电可使用40小时，快充10分钟可使用4小时。舒适的记忆海绵耳罩，长时间佩戴也不会感到疲劳。',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      '颜色': ['曜石黑', '象牙白', '午夜蓝'],
      '连接方式': ['蓝牙无线', '有线'],
      '降噪模式': ['强降噪', '弱降噪', '自然模式', '关闭']
    },
    stock: 150,
    params: {
      '品牌': '声悦',
      '型号': 'SY-WH900',
      '单元': '40mm钕磁铁动圈单元',
      '频响范围': '20Hz-40kHz',
      '阻抗': '32Ω',
      '蓝牙版本': 'Bluetooth 5.2',
      '蓝牙协议': 'A2DP, AVRCP, HFP, HSP',
      '编解码': 'SBC, AAC, LDAC',
      '电池容量': '800mAh',
      '充电时间': '约2小时',
      '续航时间': '开启降噪约30小时，关闭降噪约40小时',
      '重量': '约250g',
      '保修': '1年全国联保'
    },
    reviews: [
      {
        id: 301,
        userName: '音乐发烧友',
        avatar: 'Y',
        rating: 5,
        content: '音质非常棒，低音下潜深，中频人声清晰，高频不刺耳。降噪效果也很好，在嘈杂的地铁上也能安静地听音乐。',
        date: '2023-06-15'
      },
      {
        id: 302,
        userName: '通勤族',
        avatar: 'T',
        rating: 4,
        content: '降噪效果很赞，电池续航也很给力。唯一的缺点是耳机有点重，长时间佩戴会有些累。',
        date: '2023-07-02'
      }
    ]
  },
  '4': {
    id: 4,
    name: '轻薄时尚羽绒服',
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 799,
    originalPrice: 1099,
    rating: 4.5,
    sales: 4200,
    link: '/product/4',
    category: 'clothing',
    brief: '90%白鸭绒 | 轻薄保暖 | 防泼水面料 | 多色可选 | 可收纳便携',
    description: '这款轻薄羽绒服采用90%高品质白鸭绒填充，保暖性能出色，即使在寒冷的冬季也能为您提供足够的温暖。特殊的防泼水面料处理，下雨天也不用担心。轻薄设计，穿着轻便不臃肿，可以轻松搭配各种服装。配有专用收纳袋，外出旅行携带方便。多种时尚颜色可选，满足不同场合的穿着需求。',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      '颜色': ['黑色', '藏青', '酒红', '墨绿', '浅灰'],
      '尺码': ['S', 'M', 'L', 'XL', 'XXL'],
      '款式': ['连帽', '立领']
    },
    stock: 300,
    params: {
      '品牌': '暖风',
      '型号': 'NF-2023冬季新款',
      '材质': '外层：100%聚酯纤维，内层：90%白鸭绒，10%白鸭毛',
      '填充量': '90-120g（根据尺码不同）',
      '适用季节': '秋冬',
      '洗涤说明': '建议干洗，不可漂白，不可烘干',
      '产地': '中国',
      '保养方式': '存放时请使用透气防尘袋，避免长期压缩',
      '适用人群': '男女通用'
    },
    reviews: [
      {
        id: 401,
        userName: '时尚达人',
        avatar: 'S',
        rating: 5,
        content: '这件羽绒服真的很轻薄，但保暖效果却很好。面料质感也不错，穿上很有质感。',
        date: '2023-11-20'
      },
      {
        id: 402,
        userName: '北方小伙',
        avatar: 'B',
        rating: 4,
        content: '保暖性不错，零下几度穿着也很暖和。就是袖口没有松紧设计，冷风容易灌进来。',
        date: '2023-12-15'
      }
    ]
  },
  '5': {
    id: 5,
    name: '智能空气净化器',
    imageUrl: 'https://images.unsplash.com/photo-1527698266440-12104e498b76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 1499,
    originalPrice: 1999,
    rating: 4.8,
    sales: 1800,
    link: '/product/5',
    category: 'home',
    brief: 'HEPA滤网 | 甲醛去除 | 智能控制 | APP远程操作 | 静音设计',
    description: '这款智能空气净化器采用H13级HEPA滤网，可有效过滤PM2.5、花粉、粉尘等颗粒物，同时配备活性炭滤网，能够有效去除甲醛、苯等有害气体。内置高精度空气质量传感器，实时监测室内空气质量，并自动调节工作模式。支持手机APP远程控制，可随时查看空气质量数据，调整工作模式。静音设计，夜间模式运行噪音低至18分贝，不影响睡眠。适用面积25-45平方米，适合客厅、卧室等空间使用。',
    images: [
      'https://images.unsplash.com/photo-1527698266440-12104e498b76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585771273269-2d8f8f4cd2ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585771273068-9a0e63e2893b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      '颜色': ['白色', '银灰色'],
      '适用面积': ['小型(15-25㎡)', '中型(25-45㎡)', '大型(45-80㎡)']
    },
    stock: 120,
    params: {
      '品牌': '清风',
      '型号': 'QF-AP500',
      '额定功率': '45W',
      '噪音范围': '18-52dB(A)',
      '颗粒物CADR': '500m³/h',
      '甲醛CADR': '200m³/h',
      '滤网系统': '初效滤网+H13 HEPA滤网+活性炭滤网',
      '滤网寿命': '约6-12个月（根据使用环境）',
      '适用面积': '25-45㎡',
      '工作模式': '自动模式、睡眠模式、强力模式、自定义模式',
      '连接方式': 'WiFi、蓝牙',
      '尺寸': '260×260×600mm',
      '重量': '5.8kg',
      '电源': 'AC 220V, 50Hz',
      '保修': '2年整机保修，终身服务'
    },
    reviews: [
      {
        id: 501,
        userName: '过敏体质',
        avatar: 'G',
        rating: 5,
        content: '自从用了这款净化器，家里的灰尘明显减少，我的过敏症状也得到了很大改善。APP控制很方便，可以在上班时提前打开，回家就能享受干净的空气。',
        date: '2023-09-10'
      },
      {
        id: 502,
        userName: '新房业主',
        avatar: 'X',
        rating: 5,
        content: '新房装修后买的，甲醛去除效果很好，每天检测数值都在下降。运行声音也很小，晚上开着睡觉完全不受影响。',
        date: '2023-10-05'
      }
    ]
  },
  '6': {
    id: 6,
    name: '多功能厨师机',
    imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 2499,
    originalPrice: 2999,
    rating: 4.6,
    sales: 1200,
    link: '/product/6',
    category: 'home',
    brief: '1200W大功率 | 8档变速 | 多种配件 | 揉面搅拌打蛋 | 家用商用',
    description: '这款多功能厨师机是厨房的得力助手，可以满足揉面、搅拌、打蛋、绞肉等多种烹饪需求。1200W大功率电机，轻松应对各种硬面团。8档变速设计，适应不同食材的处理需求。5.5L大容量不锈钢搅拌碗，一次可制作多人份量的食物。配备多种实用配件，包括面团钩、打蛋器、搅拌桨、肉馅器等。人性化设计，操作简单，清洗方便。适合家庭日常使用和专业烘焙爱好者。',
    images: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591207680234-8887b8dab3d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      '颜色': ['银色', '红色', '黑色', '白色'],
      '功率': ['800W', '1000W', '1200W'],
      '容量': ['4.5L', '5.5L', '7L']
    },
    stock: 80,
    params: {
      '品牌': '贝厨',
      '型号': 'BC-KM1200',
      '额定功率': '1200W',
      '额定电压': '220V~50Hz',
      '容量': '5.5L',
      '速度档位': '8档+脉冲功能',
      '材质': '机身：压铸铝合金，搅拌碗：304不锈钢',
      '配件': '面团钩、平搅拌桨、打蛋器、防溅盖、肉馅器',
      '产品尺寸': '380×240×350mm',
      '产品重量': '约7.5kg',
      '线长': '1.2m',
      '保修': '3年整机保修'
    },
    reviews: [
      {
        id: 601,
        userName: '烘焙爱好者',
        avatar: 'H',
        rating: 5,
        content: '非常好用的厨师机，揉面团特别省力，做蛋糕、饼干、面包都很方便。机器很稳，即使揉硬面团也不会跳动。',
        date: '2023-08-12'
      },
      {
        id: 602,
        userName: '家庭主妇',
        avatar: 'J',
        rating: 4,
        content: '功能很全面，做各种面食都很方便。唯一不足的是机器有点重，移动不太方便，建议固定在一个位置使用。',
        date: '2023-09-20'
      }
    ]
  },
  '7': {
    id: 7,
    name: '智能门锁指纹密码锁',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055e2dae1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 1299,
    originalPrice: 1599,
    rating: 4.7,
    sales: 2500,
    link: '/product/7',
    category: 'home',
    brief: '指纹识别 | 密码解锁 | 手机APP控制 | 临时密码 | C级锁芯',
    description: '这款智能门锁采用先进的指纹识别技术，0.1秒快速识别，识别率高达98%。支持多种开锁方式，包括指纹、密码、手机APP、NFC、机械钥匙等。C级锁芯，防盗性能优越。支持临时密码功能，可为访客、家政人员等设置限时密码。低电量提醒功能，电量不足时会通过APP推送提醒。智能防撬报警，异常开锁会立即触发报警并推送消息。适用于家庭、公寓、办公室等多种场景。',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055e2dae1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544172911-1e56a2b23907?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      '颜色': ['银色', '香槟金', '摩卡棕', '星空黑'],
      '开门方向': ['左开门', '右开门'],
      '适用门厚': ['35-60mm', '60-90mm', '90-120mm']
    },
    stock: 150,
    params: {
      '品牌': '安居',
      '型号': 'AJ-SL300',
      '材质': '锌合金+304不锈钢面板',
      '锁体类型': 'C级锁芯，全自动智能锁体',
      '开锁方式': '指纹、密码、APP、NFC、机械钥匙',
      '指纹容量': '100组',
      '密码容量': '30组',
      '电池规格': '4节5号电池（AA电池）',
      '电池寿命': '约12个月（每天开门10次计算）',
      '应急供电': 'Type-C接口应急供电',
      '工作温度': '-20℃至60℃',
      '工作湿度': '20%至90%',
      '防水等级': 'IP65',
      '适用门类型': '木门、防盗门、防火门',
      '保修': '3年整机保修'
    },
    reviews: [
      {
        id: 701,
        userName: '科技控',
        avatar: 'K',
        rating: 5,
        content: '安装简单，功能强大，指纹识别速度很快，几乎没有识别失败的情况。APP控制也很方便，可以远程查看开门记录，还能给临时来访的朋友设置临时密码。',
        date: '2023-07-15'
      },
      {
        id: 702,
        userName: '装修业主',
        avatar: 'Z',
        rating: 4,
        content: '锁的质感和做工都很好，使用起来也很方便。唯一的小缺点是电池消耗有点快，大约8个月就需要更换一次。',
        date: '2023-08-22'
      }
    ]
  },
};

// 获取商品详情
export function getProductDetail(id: string): ProductDetail | undefined {
  return productDetails[id];
}
