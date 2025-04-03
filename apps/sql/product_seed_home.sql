-- 家居用品类目 (home) 的5条产品数据

-- 产品1：智能空气净化器
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31401c36-0ba3-11f0-a240-2f283cb6dd31',
  '智能空气净化器',
  '这款空气净化器采用多层过滤系统，包括初效滤网、HEPA滤网和活性炭滤网，可有效过滤PM2.5、甲醛、异味等有害物质。配备高精度空气质量传感器，实时监测室内空气质量。智能APP控制，可远程操作，定时开关。静音设计，睡眠模式下噪音低至18分贝，适合卧室使用。',
  1299.00,
  1599.00,
  600,
  '["https://picsum.photos/id/31/800/800", "https://picsum.photos/id/32/800/800", "https://picsum.photos/id/33/800/800"]',
  'https://picsum.photos/id/31/800/800',
  '家居用品',
  '多层过滤系统，智能APP控制，静音设计，高效除甲醛',
  4.8,
  2200,
  '{"过滤系统": ["初效滤网", "HEPA滤网", "活性炭滤网"], "CADR值": ["500m³/h"], "适用面积": ["35-60㎡"], "噪音": ["18-50dB"], "功率": ["45W"]}',
  '{"品牌": "清风", "型号": "KJ-500", "颜色": "白色", "尺寸": "260x260x600mm", "滤网寿命": "约6-12个月"}',
  true,
  NOW(),
  NOW()
);

-- 产品2：多功能厨师机
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31401c36-0ba3-11f0-a240-2f283cb6dd31',
  '多功能厨师机',
  '这款厨师机集合了搅拌、揉面、打发、绞肉等多种功能，一机多用，满足各种烹饪需求。采用全金属齿轮传动，1000W大功率电机，强劲动力持久耐用。6档调速设计，精准控制搅拌速度。5.5L大容量不锈钢搅拌碗，满足家庭烘焙需求。配件丰富，包括打蛋器、面团钩、搅拌桨等，扩展性强。',
  1699.00,
  1999.00,
  400,
  '["https://picsum.photos/id/34/800/800", "https://picsum.photos/id/35/800/800", "https://picsum.photos/id/36/800/800"]',
  'https://picsum.photos/id/34/800/800',
  '家居用品',
  '多功能一体机，1000W大功率，6档调速，5.5L大容量，配件丰富',
  4.7,
  1800,
  '{"功率": ["1000W"], "容量": ["5.5L"], "速度": ["6档调速"], "材质": ["不锈钢搅拌碗", "全金属齿轮"], "配件": ["打蛋器", "面团钩", "搅拌桨"]}',
  '{"品牌": "厨艺师", "型号": "KM-1000", "颜色": "银色,红色,黑色", "尺寸": "380x240x350mm", "产地": "中国"}',
  true,
  NOW(),
  NOW()
);

-- 产品3：智能门锁
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31401c36-0ba3-11f0-a240-2f283cb6dd31',
  '智能门锁指纹密码锁',
  '这款智能门锁支持指纹、密码、IC卡、钥匙和APP五种开锁方式，满足不同使用需求。采用半导体指纹识别技术，识别速度快，准确率高。C级锁芯设计，防盗性能出色。智能防窥视密码功能，保护您的密码安全。远程开锁功能，可通过APP为家人或访客临时开门。低电量提醒和应急充电功能，确保您不会被锁在门外。',
  1299.00,
  1599.00,
  500,
  '["https://picsum.photos/id/37/800/800", "https://picsum.photos/id/38/800/800", "https://picsum.photos/id/39/800/800"]',
  'https://picsum.photos/id/37/800/800',
  '家居用品',
  '五种开锁方式，C级锁芯，智能防窥视，远程开锁，应急充电',
  4.8,
  2500,
  '{"开锁方式": ["指纹", "密码", "IC卡", "钥匙", "APP"], "锁芯等级": ["C级"], "指纹容量": ["100枚"], "密码容量": ["20组"], "电池": ["4节5号电池，续航约12个月"]}',
  '{"品牌": "安全卫士", "型号": "SL-X5", "颜色": "黑色,银色,香槟金", "适用门类型": "木门,防盗门", "安装方式": "免布线"}',
  true,
  NOW(),
  NOW()
);

-- 产品4：北欧风格沙发
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31401c36-0ba3-11f0-a240-2f283cb6dd31',
  '北欧简约布艺沙发',
  '这款沙发采用北欧简约设计风格，线条流畅，造型优美。高密度海绵填充，坐感舒适有弹性。优质布艺面料，柔软亲肤，耐磨耐脏。实木框架结构，稳固耐用。可拆洗设计，方便清洁保养。适合现代简约、北欧风格等家居装饰风格。',
  2999.00,
  3599.00,
  200,
  '["https://picsum.photos/id/40/800/800", "https://picsum.photos/id/41/800/800", "https://picsum.photos/id/42/800/800"]',
  'https://picsum.photos/id/40/800/800',
  '家居用品',
  '北欧简约风格，高密度海绵，优质布艺，实木框架，可拆洗',
  4.6,
  980,
  '{"材质": ["实木框架", "高密度海绵", "优质布艺"], "款式": ["三人位"], "尺寸": ["210x90x85cm"], "承重": ["300kg"], "特点": ["可拆洗"]}',
  '{"品牌": "北欧印象", "型号": "SF-301", "颜色": "浅灰色,深灰色,米色,蓝色", "风格": "北欧简约", "包装方式": "拆装"}',
  true,
  NOW(),
  NOW()
);

-- 产品5：智能台灯
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31401c36-0ba3-11f0-a240-2f283cb6dd31',
  '智能护眼台灯',
  '这款台灯采用高品质LED光源，无频闪，无蓝光危害，有效保护眼睛。支持无极调光调色，可根据不同场景需求调节亮度和色温。内置光线传感器，可根据环境光线自动调节亮度。触控操作，简单便捷。支持APP控制和语音助手控制，实现智能化体验。内置定时功能，可设置自动开关时间。',
  299.00,
  399.00,
  1000,
  '["https://picsum.photos/id/43/800/800", "https://picsum.photos/id/44/800/800", "https://picsum.photos/id/45/800/800"]',
  'https://picsum.photos/id/43/800/800',
  '家居用品',
  'LED无频闪无蓝光，无极调光调色，智能感应，APP控制，定时功能',
  4.7,
  3200,
  '{"光源": ["LED"], "功率": ["12W"], "色温": ["2700K-6500K可调"], "亮度": ["无极调节"], "控制方式": ["触控", "APP", "语音"]}',
  '{"品牌": "光明", "型号": "TL-S12", "颜色": "白色,黑色", "电源": "USB-C供电", "特点": "护眼,智能"}',
  true,
  NOW(),
  NOW()
);
