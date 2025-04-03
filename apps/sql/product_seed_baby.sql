-- 母婴用品类目 (baby) 的5条产品数据

-- 产品1：婴儿奶粉
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '3140235c-0ba3-11f0-a240-2f283cb6dd31',
  '有机婴幼儿配方奶粉',
  '这款奶粉采用荷兰进口有机奶源，奶牛饲养在无污染的有机牧场，不使用抗生素和激素。配方中添加DHA、ARA、叶黄素等营养成分，促进婴幼儿大脑和视力发育。特别添加益生菌和益生元，有助于肠道健康。采用湿法工艺生产，易溶解，口感接近母乳。全程冷链运输，保证奶粉新鲜度和营养价值。',
  328.00,
  398.00,
  1000,
  '["https://picsum.photos/id/76/800/800", "https://picsum.photos/id/77/800/800", "https://picsum.photos/id/78/800/800"]',
  'https://picsum.photos/id/76/800/800',
  '母婴用品',
  '荷兰有机奶源，添加DHA和益生菌，湿法工艺，易溶解好吸收',
  4.9,
  5600,
  '{"奶源": ["荷兰有机牧场"], "阶段": ["1段 0-6个月"], "配方": ["接近母乳"], "规格": ["800g"], "保质期": ["24个月"], "储存方法": ["密封干燥处"]}',
  '{"品牌": "爱贝优", "型号": "ABY-1", "产品类型": "婴幼儿奶粉", "是否有机": "是", "生产工艺": "湿法工艺"}',
  true,
  NOW(),
  NOW()
);

-- 产品2：婴儿推车
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '3140235c-0ba3-11f0-a240-2f283cb6dd31',
  '轻便折叠婴儿推车',
  '这款婴儿推车采用航空级铝合金材质，轻便坚固。创新的一键折叠设计，可单手操作，折叠后体积小，便于存放和携带。五点式安全带和可调节靠背，保证宝宝乘坐安全舒适。大容量储物篮，方便携带宝宝用品。前轮360度旋转，后轮独立刹车系统，操控灵活安全。防紫外线遮阳蓬，全方位保护宝宝。',
  1299.00,
  1599.00,
  500,
  '["https://picsum.photos/id/79/800/800", "https://picsum.photos/id/80/800/800", "https://picsum.photos/id/81/800/800"]',
  'https://picsum.photos/id/79/800/800',
  '母婴用品',
  '航空铝合金材质，一键折叠，五点式安全带，防紫外线遮阳蓬',
  4.8,
  2800,
  '{"材质": ["航空级铝合金"], "重量": ["5.8kg"], "适用年龄": ["0-3岁"], "承重": ["25kg"], "折叠尺寸": ["60x50x25cm"]}',
  '{"品牌": "贝贝乐", "型号": "BBL-A8", "颜色": "深灰色,浅灰色,藏青色", "安全认证": "3C认证", "特点": "轻便折叠"}',
  true,
  NOW(),
  NOW()
);

-- 产品3：婴儿纸尿裤
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '3140235c-0ba3-11f0-a240-2f283cb6dd31',
  '超薄透气婴儿纸尿裤',
  '这款纸尿裤采用进口SAP高分子吸收材料，瞬吸锁水，保持表层干爽。3D立体剪裁，贴合宝宝身形，不漏尿不勒腿。全棉柔软表层，亲肤不刺激，适合宝宝娇嫩肌肤。透气底膜设计，有效预防红屁股。弹性腰围和魔术贴，穿脱方便，活动自如。每片独立包装，卫生便携。',
  139.00,
  169.00,
  2000,
  '["https://picsum.photos/id/82/800/800", "https://picsum.photos/id/83/800/800", "https://picsum.photos/id/84/800/800"]',
  'https://picsum.photos/id/82/800/800',
  '母婴用品',
  '进口SAP吸收材料，3D立体剪裁，全棉柔软表层，透气防红屁股',
  4.7,
  9500,
  '{"材质": ["全棉表层", "SAP吸收层", "透气底膜"], "尺寸": ["M码 6-11kg"], "片数": ["72片/包"], "适用年龄": ["3-12个月"], "保质期": ["3年"]}',
  '{"品牌": "柔爱", "型号": "RA-M72", "产品类型": "婴儿纸尿裤", "适用性别": "男女通用", "特点": "超薄透气"}',
  true,
  NOW(),
  NOW()
);

-- 产品4：婴儿洗护套装
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '3140235c-0ba3-11f0-a240-2f283cb6dd31',
  '天然婴儿洗护套装',
  '这款洗护套装包含婴儿洗发沐浴露、润肤乳、爽身粉和护臀膏，满足宝宝日常清洁和护理需求。全部采用天然植物提取成分，不含皂基、酒精、硅油等刺激性成分，温和不刺激。通过严格的皮肤刺激测试，适合新生儿娇嫩肌肤使用。清新淡雅的香味，不会对宝宝造成负担。精美礼盒包装，是送礼的理想选择。',
  199.00,
  259.00,
  800,
  '["https://picsum.photos/id/85/800/800", "https://picsum.photos/id/86/800/800", "https://picsum.photos/id/87/800/800"]',
  'https://picsum.photos/id/85/800/800',
  '母婴用品',
  '天然植物提取，无刺激成分，通过皮肤测试，新生儿可用',
  4.8,
  4200,
  '{"成分": ["天然植物提取物"], "套装内容": ["洗发沐浴露200ml", "润肤乳200ml", "爽身粉150g", "护臀膏50g"], "适用年龄": ["0岁+"], "保质期": ["3年"], "产地": ["法国"]}',
  '{"品牌": "婴之源", "型号": "YZY-4", "产品类型": "婴儿洗护套装", "是否含香料": "天然低香", "特点": "温和无刺激"}',
  true,
  NOW(),
  NOW()
);

-- 产品5：婴儿辅食机
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '3140235c-0ba3-11f0-a240-2f283cb6dd31',
  '多功能婴儿辅食机',
  '这款辅食机集蒸煮、搅拌、加热、解冻和消毒五大功能于一体，一机多用，满足宝宝从辅食初期到成长期的不同需求。采用食品级PP材质，安全无毒。智能温控系统，精准控制温度，保留食物营养。大容量搅拌杯，一次可制作多份辅食，节省时间。触控式操作面板，使用简单方便。可拆卸设计，清洗更加便捷。',
  399.00,
  499.00,
  600,
  '["https://picsum.photos/id/88/800/800", "https://picsum.photos/id/89/800/800", "https://picsum.photos/id/90/800/800"]',
  'https://picsum.photos/id/88/800/800',
  '母婴用品',
  '五合一多功能，食品级材质，智能温控，大容量，易清洁',
  4.6,
  3200,
  '{"材质": ["食品级PP"], "功能": ["蒸煮", "搅拌", "加热", "解冻", "消毒"], "容量": ["600ml"], "电源": ["220V"], "功率": ["300W"]}',
  '{"品牌": "乐厨", "型号": "LC-F5", "颜色": "白色,粉色", "适用年龄": "6个月+", "特点": "多功能一体"}',
  true,
  NOW(),
  NOW()
);
