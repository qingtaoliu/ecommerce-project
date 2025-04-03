-- 电子产品类目 (electronics) 的5条产品数据

-- 产品1：高端智能手机
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '313e54f0-0ba3-11f0-a240-2f283cb6dd31',
  '超级智能手机 Pro Max',
  '这款超级智能手机配备了6.7英寸的超视网膜XDR显示屏，A16仿生芯片，提供卓越的性能和电池续航能力。三摄像头系统支持4K视频录制和夜间模式拍摄。支持5G网络，Face ID面部识别，以及最新的操作系统。',
  6999.00,
  7999.00,
  500,
  '["https://picsum.photos/id/1/800/800", "https://picsum.photos/id/2/800/800", "https://picsum.photos/id/3/800/800"]',
  'https://picsum.photos/id/1/800/800',
  '电子产品',
  '新一代旗舰智能手机，搭载A16仿生芯片，6.7英寸超视网膜XDR显示屏',
  4.8,
  3500,
  '{"屏幕": ["6.7英寸", "超视网膜XDR显示屏"], "处理器": ["A16仿生芯片"], "存储": ["128GB", "256GB", "512GB"], "摄像头": ["4800万像素主摄", "1200万像素超广角", "1200万像素长焦"], "电池": ["4323mAh"]}',
  '{"品牌": "超级", "型号": "Pro Max", "上市年份": "2023", "颜色": "午夜色,银色,金色,深空黑", "防水等级": "IP68"}',
  true,
  NOW(),
  NOW()
);

-- 产品2：无线降噪耳机
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '313e54f0-0ba3-11f0-a240-2f283cb6dd31',
  '专业无线降噪耳机',
  '这款专业无线降噪耳机采用先进的主动降噪技术，可以有效隔绝外界噪音，让您沉浸在音乐世界中。高品质的音频驱动单元提供清晰的高音和震撼的低音。舒适的耳罩设计和长达30小时的电池续航，让您可以长时间佩戴而不感到疲劳。',
  1299.00,
  1499.00,
  800,
  '["https://picsum.photos/id/4/800/800", "https://picsum.photos/id/5/800/800", "https://picsum.photos/id/6/800/800"]',
  'https://picsum.photos/id/4/800/800',
  '电子产品',
  '专业级主动降噪耳机，30小时超长续航，高清音质体验',
  4.7,
  2800,
  '{"类型": ["头戴式", "无线"], "降噪": ["主动降噪"], "连接": ["蓝牙5.0"], "电池": ["30小时"], "重量": ["250g"]}',
  '{"品牌": "音乐家", "型号": "WH-1000X", "颜色": "黑色,银色,蓝色", "防水等级": "IPX4", "包装清单": "耳机,充电线,收纳盒,说明书"}',
  true,
  NOW(),
  NOW()
);

-- 产品3：智能手表
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '313e54f0-0ba3-11f0-a240-2f283cb6dd31',
  '全能智能手表',
  '这款智能手表配备了1.4英寸AMOLED高清显示屏，支持心率监测、血氧监测、睡眠分析等多种健康功能。内置GPS定位系统，可以准确记录您的运动轨迹。支持100多种运动模式，防水深度达50米，可以满足各种运动场景的需求。',
  1499.00,
  1699.00,
  600,
  '["https://picsum.photos/id/7/800/800", "https://picsum.photos/id/8/800/800", "https://picsum.photos/id/9/800/800"]',
  'https://picsum.photos/id/7/800/800',
  '电子产品',
  '多功能智能手表，支持心率血氧监测，100+运动模式，50米防水',
  4.6,
  1900,
  '{"屏幕": ["1.4英寸", "AMOLED"], "传感器": ["心率", "血氧", "加速度"], "防水": ["50米"], "电池": ["14天待机"], "连接": ["蓝牙5.0", "GPS"]}',
  '{"品牌": "健康卫士", "型号": "GT-Pro", "颜色": "黑色,绿色,橙色", "表带材质": "硅胶", "兼容系统": "Android 6.0+, iOS 10.0+"}',
  true,
  NOW(),
  NOW()
);

-- 产品4：便携式蓝牙音箱
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '313e54f0-0ba3-11f0-a240-2f283cb6dd31',
  '户外防水蓝牙音箱',
  '这款便携式蓝牙音箱采用IPX7级防水设计，可以在户外各种环境中使用。双被动低音辐射器提供震撼的低音效果，360度环绕立体声让您身临其境。内置8800mAh大容量电池，可以连续播放24小时，还可以为手机等设备充电。',
  399.00,
  499.00,
  1000,
  '["https://picsum.photos/id/10/800/800", "https://picsum.photos/id/11/800/800", "https://picsum.photos/id/12/800/800"]',
  'https://picsum.photos/id/10/800/800',
  '电子产品',
  'IPX7级防水蓝牙音箱，24小时超长续航，360°环绕立体声',
  4.5,
  3200,
  '{"防水": ["IPX7"], "电池": ["8800mAh", "24小时播放"], "音效": ["360度环绕立体声"], "连接": ["蓝牙5.0"], "功能": ["移动电源"]}',
  '{"品牌": "音乐盒", "型号": "SoundBox Pro", "颜色": "黑色,蓝色,红色", "尺寸": "180x80x80mm", "重量": "560g"}',
  true,
  NOW(),
  NOW()
);

-- 产品5：高清投影仪
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '313e54f0-0ba3-11f0-a240-2f283cb6dd31',
  '4K智能家用投影仪',
  '这款4K智能投影仪采用先进的LED光源技术，亮度高达900ANSI流明，可以投射出清晰明亮的画面。支持4K超高清分辨率，HDR10图像处理技术让画面更加生动。内置智能系统，可以直接安装各种流媒体应用。自动对焦和梯形校正功能让您轻松设置。',
  3299.00,
  3699.00,
  300,
  '["https://picsum.photos/id/13/800/800", "https://picsum.photos/id/14/800/800", "https://picsum.photos/id/15/800/800"]',
  'https://picsum.photos/id/13/800/800',
  '电子产品',
  '4K超高清智能投影仪，900ANSI流明，自动对焦，内置智能系统',
  4.4,
  850,
  '{"分辨率": ["4K (3840x2160)"], "亮度": ["900ANSI流明"], "对比度": ["3000:1"], "投影尺寸": ["40-200英寸"], "接口": ["HDMI*2", "USB*2", "蓝牙", "WiFi"]}',
  '{"品牌": "影院派", "型号": "X900", "颜色": "白色", "光源寿命": "30000小时", "系统": "智能安卓系统"}',
  true,
  NOW(),
  NOW()
);
