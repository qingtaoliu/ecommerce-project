-- 食品生鲜类目 (food) 的5条产品数据

-- 产品1：有机大米
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '3140214a-0ba3-11f0-a240-2f283cb6dd31',
  '东北有机黑土大米',
  '这款大米产自东北黑土地区，采用有机种植方式，不使用化肥和农药。颗粒饱满，晶莹剔透，煮熟后米粒分明，香气扑鼻。富含多种氨基酸和微量元素，营养价值高。真空包装，锁住新鲜口感和营养。适合日常食用，也可用于制作各种米食。',
  59.90,
  79.90,
  2000,
  '["https://picsum.photos/id/61/800/800", "https://picsum.photos/id/62/800/800", "https://picsum.photos/id/63/800/800"]',
  'https://picsum.photos/id/61/800/800',
  '食品生鲜',
  '东北黑土地有机种植，颗粒饱满，香气扑鼻，营养丰富',
  4.8,
  8500,
  '{"产地": ["东北黑土地区"], "种植方式": ["有机种植"], "规格": ["5kg/袋"], "保质期": ["12个月"], "储存方法": ["阴凉干燥处"]}',
  '{"品牌": "黑土仓", "型号": "HT-5", "产品类型": "大米", "是否有机": "是", "包装方式": "真空包装"}',
  true,
  NOW(),
  NOW()
);

-- 产品2：坚果礼盒
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '3140214a-0ba3-11f0-a240-2f283cb6dd31',
  '精选混合坚果礼盒',
  '这款坚果礼盒包含多种精选坚果，包括巴旦木、核桃、腰果、榛子和开心果。每种坚果都经过严格筛选和科学烘焙，保留原始风味和营养。独立小包装设计，保证新鲜度，方便携带。富含不饱和脂肪酸、蛋白质和多种维生素，是健康零食的理想选择。精美礼盒包装，适合送礼和自用。',
  139.00,
  169.00,
  1000,
  '["https://picsum.photos/id/64/800/800", "https://picsum.photos/id/65/800/800", "https://picsum.photos/id/66/800/800"]',
  'https://picsum.photos/id/64/800/800',
  '食品生鲜',
  '多种精选坚果，科学烘焙，独立包装，营养丰富，送礼佳品',
  4.7,
  6200,
  '{"成分": ["巴旦木", "核桃", "腰果", "榛子", "开心果"], "规格": ["30g*15包"], "保质期": ["9个月"], "储存方法": ["密封保存，避免阳光直射"], "产地": ["多国原料，中国加工"]}',
  '{"品牌": "果果乐", "型号": "GGL-15", "产品类型": "坚果礼盒", "是否含添加剂": "否", "包装方式": "礼盒装"}',
  true,
  NOW(),
  NOW()
);

-- 产品3：进口牛排
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '3140214a-0ba3-11f0-a240-2f283cb6dd31',
  '澳洲进口谷饲牛排套装',
  '这款牛排选用澳洲优质谷饲牛肉，经过120天以上谷物饲养，肉质鲜嫩多汁，大理石纹理丰富。套装包含西冷牛排、肋眼牛排和菲力牛排，满足不同烹饪需求。采用急速冷冻技术，锁住肉质鲜嫩和营养。每块牛排都经过专业分割和修整，厚度均匀，烹饪更加简便。附送专业烹饪指南，轻松在家享受餐厅级美食体验。',
  299.00,
  369.00,
  500,
  '["https://picsum.photos/id/67/800/800", "https://picsum.photos/id/68/800/800", "https://picsum.photos/id/69/800/800"]',
  'https://picsum.photos/id/67/800/800',
  '食品生鲜',
  '澳洲谷饲牛肉，大理石纹理丰富，三种部位，鲜嫩多汁',
  4.9,
  3800,
  '{"产地": ["澳大利亚"], "饲养方式": ["谷物饲养120天+"], "规格": ["西冷牛排200g*2, 肋眼牛排200g*2, 菲力牛排150g*2"], "保质期": ["冷冻-18℃以下12个月"], "储存方法": ["冷冻保存"]}',
  '{"品牌": "澳乐福", "型号": "ALF-6", "产品类型": "牛排", "等级": "Choice级", "包装方式": "真空包装"}',
  true,
  NOW(),
  NOW()
);

-- 产品4：有机蔬菜礼盒
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '3140214a-0ba3-11f0-a240-2f283cb6dd31',
  '有机蔬菜礼盒',
  '这款有机蔬菜礼盒包含多种时令有机蔬菜，全部采用有机种植方式，不使用化肥和农药。从采摘到包装，全程冷链配送，保证新鲜度。每周根据时令变化调整蔬菜种类，保证多样性和营养均衡。可订阅每周配送服务，省去挑选烦恼。适合注重健康饮食的家庭使用。',
  99.00,
  129.00,
  300,
  '["https://picsum.photos/id/70/800/800", "https://picsum.photos/id/71/800/800", "https://picsum.photos/id/72/800/800"]',
  'https://picsum.photos/id/70/800/800',
  '食品生鲜',
  '多种时令有机蔬菜，全程冷链配送，新鲜健康，可订阅配送',
  4.6,
  2500,
  '{"产地": ["本地有机农场"], "种植方式": ["有机种植"], "规格": ["约5kg/箱，8-10种蔬菜"], "保质期": ["7天"], "储存方法": ["冷藏保存"]}',
  '{"品牌": "绿农场", "型号": "LNC-8", "产品类型": "有机蔬菜", "是否有机": "是", "配送方式": "冷链配送"}',
  true,
  NOW(),
  NOW()
);

-- 产品5：特级橄榄油
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '3140214a-0ba3-11f0-a240-2f283cb6dd31',
  '西班牙特级初榨橄榄油',
  '这款橄榄油采用西班牙安达卢西亚地区的优质橄榄，通过冷榨工艺提取，保留了橄榄的原始风味和营养成分。酸度低于0.3%，属于特级初榨橄榄油中的顶级品质。富含单不饱和脂肪酸和多酚类物质，有助于心脑血管健康。适合凉拌沙拉、面包蘸食或低温烹饪使用。深绿色玻璃瓶包装，有效防止光照氧化。',
  159.00,
  199.00,
  800,
  '["https://picsum.photos/id/73/800/800", "https://picsum.photos/id/74/800/800", "https://picsum.photos/id/75/800/800"]',
  'https://picsum.photos/id/73/800/800',
  '食品生鲜',
  '西班牙安达卢西亚产区，特级初榨，酸度<0.3%，冷榨工艺',
  4.8,
  4200,
  '{"产地": ["西班牙安达卢西亚"], "等级": ["特级初榨"], "酸度": ["<0.3%"], "规格": ["500ml"], "保质期": ["18个月"], "储存方法": ["避光、阴凉干燥处"]}',
  '{"品牌": "橄榄树", "型号": "EV-500", "产品类型": "橄榄油", "提取工艺": "冷榨", "包装方式": "深绿色玻璃瓶"}',
  true,
  NOW(),
  NOW()
);
