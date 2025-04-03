-- 服装鞋包类目 (clothing) 的5条产品数据

-- 产品1：轻薄羽绒服
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31400eb2-0ba3-11f0-a240-2f283cb6dd31',
  '轻薄时尚羽绒服',
  '这款轻薄羽绒服采用90%白鸭绒填充，保暖性能出色，同时重量轻盈，穿着舒适。外层面料采用防水防风材质，有效阻挡风雨侵袭。简约时尚的设计风格，多种颜色可选，适合日常通勤和户外活动穿着。',
  599.00,
  799.00,
  1200,
  '["https://picsum.photos/id/16/800/800", "https://picsum.photos/id/17/800/800", "https://picsum.photos/id/18/800/800"]',
  'https://picsum.photos/id/16/800/800',
  '服装鞋包',
  '90%白鸭绒填充，轻盈保暖，防水防风，多色可选',
  4.7,
  2500,
  '{"填充物": ["90%白鸭绒"], "面料": ["尼龙防水面料"], "款式": ["修身"], "季节": ["秋冬"], "重量": ["约350g"]}',
  '{"品牌": "暖风", "型号": "LT-90", "颜色": "黑色,藏青色,酒红色,米白色", "适用性别": "男女同款", "洗涤说明": "干洗"}',
  true,
  NOW(),
  NOW()
);

-- 产品2：休闲运动鞋
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31400eb2-0ba3-11f0-a240-2f283cb6dd31',
  '轻便透气运动鞋',
  '这款运动鞋采用轻量化设计，鞋面由透气飞织材料制成，让双脚保持干爽舒适。鞋底采用高弹性EVA材质，提供出色的缓震效果和回弹性能。人体工学鞋型设计，贴合脚型，减少运动中的摩擦和不适感。适合日常休闲和轻度运动使用。',
  329.00,
  399.00,
  1500,
  '["https://picsum.photos/id/19/800/800", "https://picsum.photos/id/20/800/800", "https://picsum.photos/id/21/800/800"]',
  'https://picsum.photos/id/19/800/800',
  '服装鞋包',
  '轻量化飞织鞋面，高弹EVA鞋底，舒适透气，多色可选',
  4.6,
  3800,
  '{"鞋面": ["飞织材料"], "鞋底": ["EVA"], "闭合方式": ["系带"], "功能": ["轻便", "透气"], "适用场景": ["日常", "轻度运动"]}',
  '{"品牌": "步轻", "型号": "FW-201", "颜色": "黑色,白色,灰色,蓝色", "适用性别": "男女同款", "产地": "中国"}',
  true,
  NOW(),
  NOW()
);

-- 产品3：时尚单肩包
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31400eb2-0ba3-11f0-a240-2f283cb6dd31',
  '简约时尚单肩包',
  '这款单肩包采用优质PU皮革材质，触感柔软，质感出色。简约大方的设计风格，百搭不过时。内部空间宽敞，设有多个功能分区，可轻松收纳手机、钱包、化妆品等日常物品。可调节肩带，背负舒适。适合日常通勤、约会、购物等场合使用。',
  259.00,
  329.00,
  800,
  '["https://picsum.photos/id/22/800/800", "https://picsum.photos/id/23/800/800", "https://picsum.photos/id/24/800/800"]',
  'https://picsum.photos/id/22/800/800',
  '服装鞋包',
  '优质PU皮革，简约百搭，大容量多分区，肩带可调节',
  4.5,
  1700,
  '{"材质": ["PU皮革"], "容量": ["大"], "内部结构": ["拉链暗袋", "手机袋", "证件袋"], "闭合方式": ["磁扣"], "肩带": ["可调节"]}',
  '{"品牌": "包语", "型号": "SB-102", "颜色": "黑色,棕色,米白色,红色", "尺寸": "30x12x25cm", "适用场景": "日常,通勤,约会"}',
  true,
  NOW(),
  NOW()
);

-- 产品4：修身西装
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31400eb2-0ba3-11f0-a240-2f283cb6dd31',
  '商务修身西装套装',
  '这款西装套装采用优质混纺面料，手感柔软，垂坠感好。修身剪裁，勾勒出完美身形。精细的做工和考究的细节处理，展现不凡品质。套装包含西装外套和西裤，可搭配不同衬衫和领带，适合商务场合、正式宴会等多种场合穿着。',
  899.00,
  1099.00,
  500,
  '["https://picsum.photos/id/25/800/800", "https://picsum.photos/id/26/800/800", "https://picsum.photos/id/27/800/800"]',
  'https://picsum.photos/id/25/800/800',
  '服装鞋包',
  '优质混纺面料，修身剪裁，精细做工，商务正装首选',
  4.7,
  1200,
  '{"面料": ["65%聚酯纤维", "35%粘胶纤维"], "款式": ["修身"], "套装组成": ["西装外套", "西裤"], "季节": ["四季"], "工艺": ["精细缝制"]}',
  '{"品牌": "绅士风", "型号": "MS-301", "颜色": "深灰色,藏青色,黑色", "适用性别": "男士", "洗涤说明": "干洗"}',
  true,
  NOW(),
  NOW()
);

-- 产品5：针织连衣裙
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31400eb2-0ba3-11f0-a240-2f283cb6dd31',
  '优雅针织连衣裙',
  '这款针织连衣裙采用优质羊毛混纺面料，柔软亲肤，保暖舒适。A字裙型设计，修饰身形，展现优雅气质。简约大方的设计风格，搭配不同配饰可轻松应对多种场合。适合秋冬季节穿着，是职场女性的理想选择。',
  459.00,
  599.00,
  700,
  '["https://picsum.photos/id/28/800/800", "https://picsum.photos/id/29/800/800", "https://picsum.photos/id/30/800/800"]',
  'https://picsum.photos/id/28/800/800',
  '服装鞋包',
  '羊毛混纺面料，A字裙型，简约优雅，秋冬必备',
  4.6,
  1600,
  '{"面料": ["70%羊毛", "30%聚酯纤维"], "款式": ["A字裙"], "领型": ["圆领"], "袖长": ["长袖"], "裙长": ["中长裙"]}',
  '{"品牌": "雅致", "型号": "WD-105", "颜色": "黑色,驼色,酒红色", "适用性别": "女士", "洗涤说明": "手洗或干洗"}',
  true,
  NOW(),
  NOW()
);
