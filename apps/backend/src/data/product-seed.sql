-- 产品数据导入SQL
-- 使用方法: 在MySQL命令行中执行 source /path/to/product-seed.sql

-- 清空现有数据(谨慎使用)
-- TRUNCATE TABLE products;

-- 插入产品数据
INSERT INTO products (
  id, 
  categoryId, 
  name, 
  description, 
  price, 
  originalPrice, 
  stock, 
  images, 
  imageUrl, 
  category, 
  brief, 
  rating, 
  sales, 
  specs, 
  params, 
  isActive, 
  created_at, 
  updated_at
) VALUES 
-- 产品1: 高性能游戏笔记本电脑
(
  UUID(), 
  '电子产品', 
  '高性能游戏笔记本电脑', 
  '这款高性能游戏笔记本电脑采用最新第12代酷睿i7处理器和RTX 3060显卡，为游戏玩家和创意工作者提供卓越的性能体验。16GB高速内存和512GB大容量固态硬盘，让您的游戏和应用运行更加流畅。144Hz高刷新率屏幕，带来更加流畅的视觉体验，减少游戏中的卡顿和拖影。全RGB背光键盘，可自定义灯光效果，让您的游戏体验更加个性化。', 
  5999.00, 
  6999.00, 
  100, 
  '["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]', 
  'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
  'electronics', 
  '第12代酷睿i7处理器 | RTX 3060显卡 | 16GB内存 | 512GB固态硬盘 | 144Hz高刷新率', 
  4.8, 
  1200, 
  '{"处理器": ["i5-12500H", "i7-12700H", "i9-12900H"], "内存": ["8GB", "16GB", "32GB"], "存储": ["256GB SSD", "512GB SSD", "1TB SSD"], "显卡": ["RTX 3050", "RTX 3060", "RTX 3070"], "颜色": ["星空灰", "幻影黑"]}', 
  '{"品牌": "优品科技", "型号": "YP-Gaming Pro", "处理器": "第12代英特尔酷睿i7-12700H", "内存": "16GB DDR5 4800MHz", "硬盘": "512GB PCIe 4.0 NVMe SSD", "显卡": "NVIDIA GeForce RTX 3060 6GB GDDR6", "显示屏": "15.6英寸 IPS 144Hz 1920x1080", "电池": "80Wh", "重量": "2.3kg", "尺寸": "359 x 266 x 23.9 mm", "操作系统": "Windows 11 家庭版", "保修": "1年全国联保"}', 
  true, 
  NOW(), 
  NOW()
),

-- 产品2: 智能手表健康监测
(
  UUID(), 
  '电子产品', 
  '智能手表健康监测', 
  '这款智能手表配备了先进的健康监测功能，包括24小时心率监测、血氧饱和度检测、压力监测和睡眠质量分析。支持100多种运动模式，精确记录您的运动数据。50米防水深度，可以在游泳时佩戴。超长续航，单次充电可使用14天。1.43英寸AMOLED高清显示屏，显示效果清晰明亮。', 
  899.00, 
  1299.00, 
  200, 
  '["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]', 
  'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
  'electronics', 
  '24小时心率监测 | 血氧检测 | 50米防水 | 14天续航 | 多种运动模式', 
  4.6, 
  3500, 
  '{"表盘颜色": ["曜石黑", "银河白", "星空蓝"], "表带材质": ["硅胶", "尼龙", "皮革"], "表带颜色": ["黑色", "蓝色", "棕色", "绿色"]}', 
  '{"品牌": "智康", "型号": "ZK-Watch Pro", "屏幕": "1.43英寸 AMOLED 466x466", "电池容量": "450mAh", "续航时间": "标准模式14天，GPS模式48小时", "防水等级": "5ATM (50米防水)", "传感器": "心率、血氧、加速度、陀螺仪、气压、环境光", "连接": "Bluetooth 5.2, NFC", "兼容系统": "Android 6.0+, iOS 10.0+", "重量": "32g (不含表带)", "保修": "1年全国联保"}', 
  true, 
  NOW(), 
  NOW()
),

-- 产品3: 专业无线降噪耳机
(
  UUID(), 
  '电子产品', 
  '专业无线降噪耳机', 
  '这款专业级无线降噪耳机采用先进的主动降噪技术，可以有效隔绝95%的环境噪音，让您沉浸在音乐世界中。40mm大尺寸动圈单元，带来震撼的低音效果和清晰的高音表现。蓝牙5.2技术，连接稳定，延迟低。一次充电可使用40小时，快充10分钟可使用4小时。舒适的记忆海绵耳罩，长时间佩戴也不会感到疲劳。', 
  1299.00, 
  1699.00, 
  150, 
  '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]', 
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
  'electronics', 
  '主动降噪 | Hi-Fi音质 | 40小时续航 | 蓝牙5.2 | 触控操作', 
  4.7, 
  2800, 
  '{"颜色": ["曜石黑", "象牙白", "午夜蓝"], "连接方式": ["蓝牙无线", "有线"], "降噪模式": ["强降噪", "弱降噪", "自然模式", "关闭"]}', 
  '{"品牌": "声悦", "型号": "SY-WH900", "单元": "40mm钕磁铁动圈单元", "频响范围": "20Hz-40kHz", "阻抗": "32Ω", "蓝牙版本": "Bluetooth 5.2", "蓝牙协议": "A2DP, AVRCP, HFP, HSP", "编解码": "SBC, AAC, LDAC", "电池容量": "800mAh", "充电时间": "约2小时", "续航时间": "开启降噪约30小时，关闭降噪约40小时", "重量": "约250g", "保修": "1年全国联保"}', 
  true, 
  NOW(), 
  NOW()
),

-- 产品4: 轻薄时尚羽绒服
(
  UUID(), 
  '服装', 
  '轻薄时尚羽绒服', 
  '这款轻薄羽绒服采用90%高品质白鸭绒填充，保暖性能出色，即使在寒冷的冬季也能为您提供足够的温暖。特殊的防泼水面料处理，下雨天也不用担心。轻薄设计，穿着轻便不臃肿，可以轻松搭配各种服装。配有专用收纳袋，外出旅行携带方便。多种时尚颜色可选，满足不同场合的穿着需求。', 
  799.00, 
  1099.00, 
  300, 
  '["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]', 
  'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
  'clothing', 
  '90%白鸭绒 | 轻薄保暖 | 防泼水面料 | 多色可选 | 可收纳便携', 
  4.5, 
  4200, 
  '{"颜色": ["黑色", "藏青", "酒红", "墨绿", "浅灰"], "尺码": ["S", "M", "L", "XL", "XXL"], "款式": ["连帽", "立领"]}', 
  '{"品牌": "暖风", "型号": "NF-2023冬季新款", "材质": "外层：100%聚酯纤维，内层：90%白鸭绒，10%白鸭毛", "填充量": "90-120g（根据尺码不同）", "适用季节": "秋冬", "洗涤说明": "建议干洗，不可漂白，不可烘干", "产地": "中国", "保养方式": "存放时请使用透气防尘袋，避免长期压缩", "适用人群": "男女通用"}', 
  true, 
  NOW(), 
  NOW()
),

-- 产品5: 智能空气净化器
(
  UUID(), 
  '家居', 
  '智能空气净化器', 
  '这款智能空气净化器采用H13级HEPA滤网，可有效过滤PM2.5、花粉、粉尘等颗粒物，同时配备活性炭滤网，能够有效去除甲醛、苯等有害气体。内置高精度空气质量传感器，实时监测室内空气质量，并自动调节工作模式。支持手机APP远程控制，可随时查看空气质量数据，调整工作模式。静音设计，夜间模式运行噪音低至18分贝，不影响睡眠。适用面积25-45平方米，适合客厅、卧室等空间使用。', 
  1499.00, 
  1999.00, 
  120, 
  '["https://images.unsplash.com/photo-1527698266440-12104e498b76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1585771273269-2d8f8f4cd2ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1585771273068-9a0e63e2893b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]', 
  'https://images.unsplash.com/photo-1527698266440-12104e498b76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
  'home', 
  'HEPA滤网 | 甲醛去除 | 智能控制 | APP远程操作 | 静音设计', 
  4.8, 
  1800, 
  '{"颜色": ["白色", "银灰色"], "适用面积": ["小型(15-25㎡)", "中型(25-45㎡)", "大型(45-80㎡)"]}', 
  '{"品牌": "清风", "型号": "QF-AP500", "额定功率": "45W", "噪音范围": "18-52dB(A)", "颗粒物CADR": "500m³/h", "甲醛CADR": "200m³/h", "滤网系统": "初效滤网+H13 HEPA滤网+活性炭滤网", "滤网寿命": "约6-12个月（根据使用环境）", "适用面积": "25-45㎡", "工作模式": "自动模式、睡眠模式、强力模式、自定义模式", "连接方式": "WiFi、蓝牙", "尺寸": "260×260×600mm", "重量": "5.8kg", "电源": "AC 220V, 50Hz", "保修": "2年整机保修，终身服务"}', 
  true, 
  NOW(), 
  NOW()
),

-- 产品6: 多功能厨师机
(
  UUID(), 
  '家居', 
  '多功能厨师机', 
  '这款多功能厨师机是厨房的得力助手，可以满足揉面、搅拌、打蛋、绞肉等多种烹饪需求。1200W大功率电机，轻松应对各种硬面团。8档变速设计，适应不同食材的处理需求。5.5L大容量不锈钢搅拌碗，一次可制作多人份量的食物。配备多种实用配件，包括面团钩、打蛋器、搅拌桨、肉馅器等。人性化设计，操作简单，清洗方便。适合家庭日常使用和专业烘焙爱好者。', 
  2499.00, 
  2999.00, 
  80, 
  '["https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1591207680234-8887b8dab3d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]', 
  'https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
  'home', 
  '1200W大功率 | 8档变速 | 多种配件 | 揉面搅拌打蛋 | 家用商用', 
  4.6, 
  1200, 
  '{"颜色": ["银色", "红色", "黑色", "白色"], "功率": ["800W", "1000W", "1200W"], "容量": ["4.5L", "5.5L", "7L"]}', 
  '{"品牌": "贝厨", "型号": "BC-KM1200", "额定功率": "1200W", "额定电压": "220V~50Hz", "容量": "5.5L", "速度档位": "8档+脉冲功能", "材质": "机身：压铸铝合金，搅拌碗：304不锈钢", "配件": "面团钩、平搅拌桨、打蛋器、防溅盖、肉馅器", "产品尺寸": "380×240×350mm", "产品重量": "约7.5kg", "线长": "1.2m", "保修": "3年整机保修"}', 
  true, 
  NOW(), 
  NOW()
),

-- 产品7: 智能门锁指纹密码锁
(
  UUID(), 
  '家居', 
  '智能门锁指纹密码锁', 
  '这款智能门锁采用先进的指纹识别技术，0.1秒快速识别，识别率高达98%。支持多种开锁方式，包括指纹、密码、手机APP、NFC、机械钥匙等。C级锁芯，防盗性能优越。支持临时密码功能，可为访客、家政人员等设置限时密码。低电量提醒功能，电量不足时会通过APP推送提醒。智能防撬报警，异常开锁会立即触发报警并推送消息。适用于家庭、公寓、办公室等多种场景。', 
  1299.00, 
  1599.00, 
  150, 
  '["https://images.unsplash.com/photo-1558002038-1055e2dae1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1544172911-1e56a2b23907?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]', 
  'https://images.unsplash.com/photo-1558002038-1055e2dae1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
  'home', 
  '指纹识别 | 密码解锁 | 手机APP控制 | 临时密码 | C级锁芯', 
  4.7, 
  2500, 
  '{"颜色": ["银色", "香槟金", "摩卡棕", "星空黑"], "开门方向": ["左开门", "右开门"], "适用门厚": ["35-60mm", "60-90mm", "90-120mm"]}', 
  '{"品牌": "安居", "型号": "AJ-SL300", "材质": "锌合金+304不锈钢面板", "锁体类型": "C级锁芯，全自动智能锁体", "开锁方式": "指纹、密码、APP、NFC、机械钥匙", "指纹容量": "100组", "密码容量": "30组", "电池规格": "4节5号电池（AA电池）", "电池寿命": "约12个月（每天开门10次计算）", "应急供电": "Type-C接口应急供电", "工作温度": "-20℃至60℃", "工作湿度": "20%至90%", "防水等级": "IP65", "适用门类型": "木门、防盗门、防火门", "保修": "3年整机保修"}', 
  true, 
  NOW(), 
  NOW()
);
