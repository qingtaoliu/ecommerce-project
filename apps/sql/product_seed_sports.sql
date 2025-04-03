-- 运动户外类目 (sports) 的5条产品数据

-- 产品1：专业跑步鞋
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '314024d8-0ba3-11f0-a240-2f283cb6dd31',
  '专业减震跑步鞋',
  '这款跑步鞋采用创新的减震技术，有效缓解跑步时对关节的冲击。鞋面采用轻量化飞织材料，透气舒适。中底采用高弹性EVA材质，提供出色的回弹性能。橡胶外底设计有科学的抓地纹路，提供优异的抓地力和耐磨性。鞋内采用记忆海绵鞋垫，贴合脚型，提供舒适的支撑。适合日常跑步训练和马拉松比赛使用。',
  599.00,
  699.00,
  800,
  '["https://picsum.photos/id/91/800/800", "https://picsum.photos/id/92/800/800", "https://picsum.photos/id/93/800/800"]',
  'https://picsum.photos/id/91/800/800',
  '运动户外',
  '创新减震技术，轻量飞织鞋面，高弹EVA中底，防滑耐磨外底',
  4.8,
  3500,
  '{"鞋面": ["飞织材料"], "中底": ["EVA高弹材质"], "外底": ["橡胶防滑纹路"], "鞋垫": ["记忆海绵"], "重量": ["约280g（单只）"]}',
  '{"品牌": "速跑", "型号": "SR-R20", "颜色": "黑色,灰色,蓝色", "适用性别": "男女同款", "适用场景": "跑步,马拉松,日常训练"}',
  true,
  NOW(),
  NOW()
);

-- 产品2：户外登山包
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '314024d8-0ba3-11f0-a240-2f283cb6dd31',
  '专业户外登山包',
  '这款登山包采用高强度尼龙材质，防水耐磨，适合各种户外环境使用。人体工学背负系统，配备可调节胸带和腰带，减轻肩部压力，提高负重舒适度。大容量主仓设计，内部分隔合理，便于整理各类装备。外部设有多个功能口袋和附件挂点，方便快速取用小物件。配备防雨罩，在雨天也能保护装备干燥。适合登山、徒步、露营等户外活动使用。',
  399.00,
  499.00,
  600,
  '["https://picsum.photos/id/94/800/800", "https://picsum.photos/id/95/800/800", "https://picsum.photos/id/96/800/800"]',
  'https://picsum.photos/id/94/800/800',
  '运动户外',
  '高强度防水尼龙，人体工学背负，大容量多分区，附赠防雨罩',
  4.7,
  2800,
  '{"材质": ["高强度尼龙"], "容量": ["50L"], "背负系统": ["人体工学设计"], "功能": ["防水", "多分区", "附件挂点"], "附件": ["防雨罩"]}',
  '{"品牌": "探路者", "型号": "TLZ-50", "颜色": "军绿色,黑色,蓝色", "适用性别": "男女通用", "适用场景": "登山,徒步,露营"}',
  true,
  NOW(),
  NOW()
);

-- 产品3：智能运动手环
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '314024d8-0ba3-11f0-a240-2f283cb6dd31',
  '多功能智能运动手环',
  '这款智能运动手环配备高清彩色触摸屏，显示清晰，操作便捷。内置多种运动模式，包括跑步、骑行、游泳等，精准记录运动数据。24小时心率监测和血氧监测功能，全面了解身体状况。防水深度达50米，可在游泳时佩戴使用。超长续航，一次充电可使用14天。支持来电提醒、消息推送等智能功能，是运动和日常生活的理想伴侣。',
  199.00,
  259.00,
  1200,
  '["https://picsum.photos/id/97/800/800", "https://picsum.photos/id/98/800/800", "https://picsum.photos/id/99/800/800"]',
  'https://picsum.photos/id/97/800/800',
  '运动户外',
  '彩色触摸屏，多种运动模式，心率血氧监测，50米防水，14天续航',
  4.6,
  5200,
  '{"屏幕": ["1.1英寸彩色触摸屏"], "传感器": ["心率", "血氧", "加速度"], "防水": ["50米"], "电池": ["14天续航"], "运动模式": ["12种"]}',
  '{"品牌": "智动", "型号": "ZD-B5", "颜色": "黑色,蓝色,红色", "兼容系统": "Android 5.0+, iOS 9.0+", "特点": "运动监测"}',
  true,
  NOW(),
  NOW()
);

-- 产品4：瑜伽垫
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '314024d8-0ba3-11f0-a240-2f283cb6dd31',
  '环保防滑瑜伽垫',
  '这款瑜伽垫采用环保TPE材质，无毒无味，对人体和环境友好。双层结构设计，上层提供舒适的触感，下层增强防滑和缓冲效果。厚度为8mm，提供良好的缓冲和支撑，保护关节。闭孔结构，防水防汗，易于清洁。轻便设计，配有便携背带，方便携带。适合瑜伽、普拉提、健身等多种运动使用。',
  129.00,
  169.00,
  1500,
  '["https://picsum.photos/id/100/800/800", "https://picsum.photos/id/101/800/800", "https://picsum.photos/id/102/800/800"]',
  'https://picsum.photos/id/100/800/800',
  '运动户外',
  '环保TPE材质，双层结构，8mm厚度，防滑防水，便携设计',
  4.7,
  6800,
  '{"材质": ["环保TPE"], "厚度": ["8mm"], "尺寸": ["183cm x 61cm"], "重量": ["约1kg"], "特点": ["双层结构", "防滑", "防水"]}',
  '{"品牌": "瑜悦", "型号": "YY-8", "颜色": "紫色,蓝色,绿色,粉色", "适用人群": "瑜伽爱好者", "附件": "便携背带"}',
  true,
  NOW(),
  NOW()
);

-- 产品5：户外帐篷
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '314024d8-0ba3-11f0-a240-2f283cb6dd31',
  '全自动速开户外帐篷',
  '这款帐篷采用全自动弹簧结构，抛出即可自动展开，3秒完成搭建。外层采用210T防水涂银牛津布，防水等级达3000mm，有效阻挡雨水渗透。内层采用高密度纱网，透气防蚊虫。双层设计，有效隔热保温。加粗玻璃纤维支架，抗风性能强。底部加厚设计，防潮耐磨。适合2-3人使用，是户外露营的理想选择。',
  299.00,
  399.00,
  400,
  '["https://picsum.photos/id/103/800/800", "https://picsum.photos/id/104/800/800", "https://picsum.photos/id/105/800/800"]',
  'https://picsum.photos/id/103/800/800',
  '运动户外',
  '3秒全自动速开，210T防水牛津布，双层设计，加粗支架，适合2-3人',
  4.5,
  2200,
  '{"材质": ["210T防水牛津布", "高密度纱网"], "防水等级": ["3000mm"], "支架": ["玻璃纤维"], "容纳人数": ["2-3人"], "尺寸": ["展开尺寸210x150x110cm"]}',
  '{"品牌": "野行者", "型号": "YXZ-23", "颜色": "军绿色,蓝色,橙色", "重量": "约2.5kg", "适用场景": "露营,野营,沙滩"}',
  true,
  NOW(),
  NOW()
);
