-- 美妆个护类目 (beauty) 的5条产品数据

-- 产品1：保湿面霜
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31401fce-0ba3-11f0-a240-2f283cb6dd31',
  '深层保湿修护面霜',
  '这款面霜采用多重保湿成分，包括玻尿酸、神经酰胺和甘油，能够深入肌肤底层，提供长效保湿。添加维生素E和角鲨烷，有效修护受损肌肤屏障。质地轻盈不油腻，易吸收，适合各种肤质使用。无添加香精、酒精和防腐剂，温和不刺激，敏感肌也可安心使用。',
  199.00,
  259.00,
  800,
  '["https://picsum.photos/id/46/800/800", "https://picsum.photos/id/47/800/800", "https://picsum.photos/id/48/800/800"]',
  'https://picsum.photos/id/46/800/800',
  '美妆个护',
  '多重保湿成分，深层滋养修护，轻盈不油腻，敏感肌适用',
  4.8,
  3500,
  '{"成分": ["玻尿酸", "神经酰胺", "甘油", "维生素E", "角鲨烷"], "适用肤质": ["干性", "中性", "油性", "混合性", "敏感性"], "容量": ["50ml"], "保质期": ["36个月"], "产地": ["法国"]}',
  '{"品牌": "润颜", "型号": "HM-50", "功效": "保湿,修护,舒缓", "使用方法": "取适量于面部轻轻按摩至吸收", "适用人群": "所有人群"}',
  true,
  NOW(),
  NOW()
);

-- 产品2：精华液
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31401fce-0ba3-11f0-a240-2f283cb6dd31',
  '烟酰胺美白精华液',
  '这款精华液含有5%高浓度烟酰胺成分，有效淡化黑色素沉着，改善肤色不均，提亮肤色。添加透明质酸和甘草提取物，提供保湿和舒缓效果。轻薄水润质地，易吸收不黏腻。采用无油配方，不会引起粉刺和痘痘。每日使用，可有效改善暗沉、黄气和色斑问题。',
  169.00,
  229.00,
  1000,
  '["https://picsum.photos/id/49/800/800", "https://picsum.photos/id/50/800/800", "https://picsum.photos/id/51/800/800"]',
  'https://picsum.photos/id/49/800/800',
  '美妆个护',
  '5%烟酰胺高浓度，提亮肤色，改善暗沉，水润不黏腻',
  4.7,
  4200,
  '{"成分": ["5%烟酰胺", "透明质酸", "甘草提取物"], "适用肤质": ["所有肤质"], "容量": ["30ml"], "保质期": ["36个月"], "产地": ["韩国"]}',
  '{"品牌": "白皙", "型号": "WS-30", "功效": "美白,提亮,保湿", "使用方法": "早晚洁面后使用，取适量于面部轻拍至吸收", "适用人群": "肤色不均人群"}',
  true,
  NOW(),
  NOW()
);

-- 产品3：洗发水
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31401fce-0ba3-11f0-a240-2f283cb6dd31',
  '滋养修护洗发水',
  '这款洗发水采用天然植物提取物，温和清洁头皮和秀发。添加摩洛哥坚果油和角蛋白，深层滋养受损发丝，修复分叉和断裂。独特配方，有效控油去屑，解决头痒和头皮屑问题。清新自然的香气，使用后秀发柔顺有光泽，易于梳理。适合干枯受损、染烫后的头发使用。',
  89.00,
  119.00,
  1500,
  '["https://picsum.photos/id/52/800/800", "https://picsum.photos/id/53/800/800", "https://picsum.photos/id/54/800/800"]',
  'https://picsum.photos/id/52/800/800',
  '美妆个护',
  '天然植物提取，深层滋养修护，控油去屑，适合干枯受损发质',
  4.6,
  5800,
  '{"成分": ["摩洛哥坚果油", "角蛋白", "泛醇", "薄荷提取物"], "适用发质": ["干枯", "受损", "染烫"], "容量": ["500ml"], "保质期": ["36个月"], "香型": ["清新自然香"]}',
  '{"品牌": "秀发", "型号": "XF-500", "功效": "滋养,修护,控油,去屑", "使用方法": "取适量于湿发上揉搓起泡，按摩头皮和发丝，然后冲洗干净", "适用人群": "干枯受损发质人群"}',
  true,
  NOW(),
  NOW()
);

-- 产品4：口红
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31401fce-0ba3-11f0-a240-2f283cb6dd31',
  '丝绒哑光唇膏',
  '这款口红采用丝绒哑光质地，上色饱满，不易脱色。添加多种保湿成分，包括荷荷巴油和维生素E，滋润双唇，不干不裂。轻盈舒适的配方，不会有黏腻感。多种时尚色调可选，从日常裸色到浓郁正红，满足不同场合需求。防水防汗配方，持久不易脱妆。',
  129.00,
  169.00,
  1200,
  '["https://picsum.photos/id/55/800/800", "https://picsum.photos/id/56/800/800", "https://picsum.photos/id/57/800/800"]',
  'https://picsum.photos/id/55/800/800',
  '美妆个护',
  '丝绒哑光质地，饱满显色，持久不脱色，滋润不干裂',
  4.8,
  6500,
  '{"成分": ["荷荷巴油", "维生素E", "蜂蜡"], "质地": ["丝绒哑光"], "色号": ["#01裸色", "#02珊瑚色", "#03正红色", "#04玫瑰色", "#05豆沙色"], "净含量": ["3.5g"], "保质期": ["36个月"]}',
  '{"品牌": "色彩", "型号": "VL-35", "功效": "显色,持久,滋润", "使用方法": "直接涂抹于唇部，或使用唇刷勾勒唇形后填充", "适用人群": "所有人群"}',
  true,
  NOW(),
  NOW()
);

-- 产品5：电动牙刷
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31401fce-0ba3-11f0-a240-2f283cb6dd31',
  '声波电动牙刷',
  '这款电动牙刷采用先进的声波技术，每分钟高达31000次震动，有效清除牙菌斑和牙渍。配备4种刷牙模式：清洁、美白、敏感和按摩，满足不同口腔护理需求。智能计时功能，每30秒提醒更换刷牙区域，2分钟自动停止，培养科学刷牙习惯。长达30天的超长续航，一次充电可持续使用一个月。IPX7级防水设计，可在淋浴时使用。',
  299.00,
  399.00,
  800,
  '["https://picsum.photos/id/58/800/800", "https://picsum.photos/id/59/800/800", "https://picsum.photos/id/60/800/800"]',
  'https://picsum.photos/id/58/800/800',
  '美妆个护',
  '声波震动技术，4种刷牙模式，智能计时，30天续航，IPX7防水',
  4.7,
  4200,
  '{"技术": ["声波震动"], "震动频率": ["31000次/分钟"], "模式": ["清洁", "美白", "敏感", "按摩"], "电池": ["锂电池，30天续航"], "防水等级": ["IPX7"]}',
  '{"品牌": "洁齿", "型号": "SB-100", "颜色": "白色,黑色,粉色", "包装清单": "牙刷主体,刷头2个,充电底座,说明书", "适用人群": "成人"}',
  true,
  NOW(),
  NOW()
);
