-- 家用电器类目 (appliances) 的5条产品数据

-- 产品1：智能电饭煲
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31403180-0ba3-11f0-a240-2f283cb6dd31',
  '智能IH电饭煲',
  '这款电饭煲采用IH电磁加热技术，实现360°立体加热，煮饭更均匀，口感更佳。内胆采用5层钛金涂层，不粘不糊，易清洁。配备高精度温控系统，可精确控制烹饪温度。智能菜单设置，包含煮饭、煲粥、煮汤、蒸煮等多种功能。支持APP远程控制，定时预约，回家即可享用热腾腾的饭菜。',
  699.00,
  899.00,
  800,
  '["https://picsum.photos/id/121/800/800", "https://picsum.photos/id/122/800/800", "https://picsum.photos/id/123/800/800"]',
  'https://picsum.photos/id/121/800/800',
  'appliances',
  'IH电磁加热，5层钛金内胆，智能菜单，APP远程控制，定时预约',
  4.8,
  5200,
  '{"容量": ["4L"], "功率": ["1100W"], "加热方式": ["IH电磁加热"], "内胆材质": ["5层钛金涂层"], "功能": ["煮饭", "煲粥", "煮汤", "蒸煮"]}',
  '{"品牌": "厨之星", "型号": "CZX-40IH", "颜色": "香槟金,星空灰", "电源": "220V~50Hz", "产品尺寸": "30x25x25cm"}',
  true,
  NOW(),
  NOW()
);

-- 产品2：变频空调
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31403180-0ba3-11f0-a240-2f283cb6dd31',
  '智能变频冷暖空调',
  '这款空调采用高效变频压缩机，制冷制热更快，温度控制更精准，同时节能省电。搭载智能温控系统，根据室内温度自动调节运行频率。配备自清洁功能，有效抑制细菌滋生。支持WiFi智能控制，可通过手机APP远程操作。静音设计，运行噪音低至20分贝，不影响休息和工作。适用面积15-23平方米，适合卧室、客厅等空间使用。',
  2599.00,
  2999.00,
  300,
  '["https://picsum.photos/id/124/800/800", "https://picsum.photos/id/125/800/800", "https://picsum.photos/id/126/800/800"]',
  'https://picsum.photos/id/124/800/800',
  'appliances',
  '高效变频压缩机，智能温控，自清洁，WiFi控制，静音设计',
  4.7,
  2800,
  '{"匹数": ["1.5匹"], "功率": ["制冷1330W/制热1420W"], "能效等级": ["一级能效"], "适用面积": ["15-23㎡"], "噪音": ["20-38dB"]}',
  '{"品牌": "舒适家", "型号": "KFR-35GW", "颜色": "白色", "电源": "220V~50Hz", "冷暖类型": "冷暖型"}',
  true,
  NOW(),
  NOW()
);

-- 产品3：洗衣机
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31403180-0ba3-11f0-a240-2f283cb6dd31',
  '滚筒洗衣机',
  '这款滚筒洗衣机采用变频电机，运行更加平稳，噪音低，寿命长。大容量设计，可满足4-6人家庭的日常洗涤需求。配备智能投放系统，根据衣物重量和脏污程度自动投放洗涤剂。内置多种洗涤程序，包括棉麻、羊毛、快洗、大件等，满足不同衣物的洗涤需求。95℃高温煮洗功能，深度杀菌除螨。支持WiFi连接，可通过手机APP远程控制和监控洗涤过程。',
  2999.00,
  3599.00,
  400,
  '["https://picsum.photos/id/127/800/800", "https://picsum.photos/id/128/800/800", "https://picsum.photos/id/129/800/800"]',
  'https://picsum.photos/id/127/800/800',
  'appliances',
  '变频电机，10KG大容量，智能投放，多种洗涤程序，WiFi控制',
  4.8,
  3200,
  '{"容量": ["10KG"], "电机类型": ["变频电机"], "能效等级": ["一级能效"], "转速": ["1400转/分钟"], "程序": ["棉麻", "羊毛", "快洗", "大件", "高温煮洗"]}',
  '{"品牌": "洁净", "型号": "XQG-100V", "颜色": "银色,白色", "电源": "220V~50Hz", "产品尺寸": "60x65x85cm"}',
  true,
  NOW(),
  NOW()
);

-- 产品4：智能电视
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31403180-0ba3-11f0-a240-2f283cb6dd31',
  '4K超高清智能电视',
  '这款智能电视采用4K超高清屏幕，分辨率高达3840x2160，画面细腻清晰。HDR10+技术支持，提供更广的动态范围和更丰富的色彩表现。搭载四核处理器，运行流畅，响应迅速。智能语音控制功能，支持语音搜索、控制和内容推荐。内置多种流媒体应用，海量影视资源随心观看。蓝牙5.0技术，可连接音箱、耳机等设备，提升音频体验。超薄边框设计，视觉效果更佳。',
  3299.00,
  3999.00,
  200,
  '["https://picsum.photos/id/130/800/800", "https://picsum.photos/id/131/800/800", "https://picsum.photos/id/132/800/800"]',
  'https://picsum.photos/id/130/800/800',
  'appliances',
  '4K超高清，HDR10+，四核处理器，智能语音控制，超薄边框',
  4.7,
  1800,
  '{"尺寸": ["55英寸"], "分辨率": ["3840x2160"], "处理器": ["四核"], "刷新率": ["60Hz"], "接口": ["HDMI*3", "USB*2", "网络端口*1"]}',
  '{"品牌": "视界", "型号": "SJ-55A8", "颜色": "黑色", "电源": "220V~50Hz", "支持技术": "HDR10+,杜比音效"}',
  true,
  NOW(),
  NOW()
);

-- 产品5：冰箱
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31403180-0ba3-11f0-a240-2f283cb6dd31',
  '对开门变频冰箱',
  '这款冰箱采用对开门设计，大容量满足多口之家的存储需求。变频压缩机技术，制冷更快，温度控制更精准，同时节能省电。风冷无霜设计，免除除霜烦恼。智能温控系统，多个独立温区，满足不同食材的存储需求。抗菌保鲜技术，有效抑制细菌滋生，延长食材保鲜时间。静音设计，运行噪音低，不影响生活质量。外观简约时尚，多种颜色可选，融入各种家装风格。',
  4599.00,
  5299.00,
  150,
  '["https://picsum.photos/id/133/800/800", "https://picsum.photos/id/134/800/800", "https://picsum.photos/id/135/800/800"]',
  'https://picsum.photos/id/133/800/800',
  'appliances',
  '对开门设计，变频压缩机，风冷无霜，多温区控制，抗菌保鲜',
  4.8,
  1200,
  '{"容量": ["456L"], "压缩机": ["变频压缩机"], "能效等级": ["一级能效"], "制冷方式": ["风冷无霜"], "温区": ["多温区"]}',
  '{"品牌": "冷鲜", "型号": "BCD-456WD", "颜色": "银色,黑色,金色", "电源": "220V~50Hz", "产品尺寸": "90x70x180cm"}',
  true,
  NOW(),
  NOW()
);
