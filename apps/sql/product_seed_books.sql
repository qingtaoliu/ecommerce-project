-- 图书文具类目 (books) 的5条产品数据

-- 产品1：畅销小说
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31402640-0ba3-11f0-a240-2f283cb6dd31',
  '《时光旅行者》精装小说',
  '这本小说讲述了一位意外获得时空穿梭能力的普通人，在不同时空中的奇幻冒险故事。作者以细腻的笔触描绘了主人公在历史长河中的所见所闻，以及对人生、爱情和命运的思考。故事情节跌宕起伏，人物形象丰满立体，被誉为近年来最具想象力的科幻小说之一。精装版采用优质纸张印刷，装帧精美，值得收藏。',
  58.00,
  78.00,
  2000,
  '["https://picsum.photos/id/106/800/800", "https://picsum.photos/id/107/800/800", "https://picsum.photos/id/108/800/800"]',
  'https://picsum.photos/id/106/800/800',
  '图书文具',
  '畅销科幻小说，时空穿梭题材，精装收藏版，优质印刷',
  4.8,
  12000,
  '{"作者": ["张明"], "出版社": ["文艺出版社"], "出版日期": ["2023-05"], "页数": ["468页"], "装帧": ["精装"]}',
  '{"品牌": "文艺出版社", "ISBN": "9787532768899", "开本": "32开", "纸张": "胶版纸", "类型": "科幻小说"}',
  true,
  NOW(),
  NOW()
);

-- 产品2：儿童绘本
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31402640-0ba3-11f0-a240-2f283cb6dd31',
  '《森林历险记》儿童绘本套装',
  '这套绘本讲述了小动物们在森林中的奇妙冒险故事，融入了友情、勇气、团队合作等教育元素。全套6册，每册一个独立故事，情节生动有趣。绘本采用环保油墨印刷，色彩鲜艳，图画精美。大开本设计，方便家长与孩子共读。适合3-6岁儿童阅读，是培养孩子阅读兴趣和情感发展的理想读物。',
  99.00,
  129.00,
  1500,
  '["https://picsum.photos/id/109/800/800", "https://picsum.photos/id/110/800/800", "https://picsum.photos/id/111/800/800"]',
  'https://picsum.photos/id/109/800/800',
  '图书文具',
  '儿童绘本6册套装，森林冒险主题，环保印刷，适合3-6岁',
  4.9,
  8500,
  '{"作者": ["李小花"], "出版社": ["少年儿童出版社"], "出版日期": ["2023-08"], "册数": ["6册"], "适读年龄": ["3-6岁"]}',
  '{"品牌": "童趣", "ISBN": "9787534698123", "开本": "16开", "纸张": "铜版纸", "类型": "儿童绘本"}',
  true,
  NOW(),
  NOW()
);

-- 产品3：学习文具套装
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31402640-0ba3-11f0-a240-2f283cb6dd31',
  '多功能学习文具套装',
  '这款文具套装包含学生学习所需的各种文具，包括自动铅笔、中性笔、荧光笔、橡皮擦、尺子、便利贴等。采用环保材料制作，安全无毒。笔类书写流畅，不断墨。收纳盒采用PP材质，坚固耐用，便于整理和携带。简约时尚的设计风格，多种颜色可选。适合中小学生和办公人士使用。',
  49.90,
  69.90,
  3000,
  '["https://picsum.photos/id/112/800/800", "https://picsum.photos/id/113/800/800", "https://picsum.photos/id/114/800/800"]',
  'https://picsum.photos/id/112/800/800',
  '图书文具',
  '学生文具套装，多种文具一套齐全，环保材料，简约设计',
  4.7,
  15000,
  '{"套装内容": ["自动铅笔*2", "中性笔*4", "荧光笔*3", "橡皮擦*2", "直尺*1", "便利贴*2"], "材质": ["环保ABS", "PP"], "收纳盒尺寸": ["22x15x5cm"], "适用人群": ["学生", "办公人士"]}',
  '{"品牌": "学士", "型号": "XS-108", "颜色": "蓝色,粉色,绿色", "特点": "多功能,环保", "适用场景": "学习,办公"}',
  true,
  NOW(),
  NOW()
);

-- 产品4：经典文学全集
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31402640-0ba3-11f0-a240-2f283cb6dd31',
  '世界经典文学名著套装',
  '这套文学全集收录了世界文学史上最具影响力的20部经典名著，包括《战争与和平》、《红与黑》、《简·爱》等。全套采用精装硬壳设计，书脊烫金，典雅大方。内文采用轻型纸印刷，护眼不反光。新版全译本，语言流畅准确，并配有详细的导读和注释。是文学爱好者的必备藏书，也是馈赠亲友的理想礼物。',
  399.00,
  499.00,
  500,
  '["https://picsum.photos/id/115/800/800", "https://picsum.photos/id/116/800/800", "https://picsum.photos/id/117/800/800"]',
  'https://picsum.photos/id/115/800/800',
  '图书文具',
  '世界文学名著20册，精装烫金，全译本，配有导读和注释',
  4.8,
  3200,
  '{"作者": ["多位世界名家"], "出版社": ["文学出版社"], "出版日期": ["2023-03"], "册数": ["20册"], "装帧": ["精装"]}',
  '{"品牌": "文学馆", "ISBN": "9787020667321", "开本": "32开", "纸张": "轻型纸", "类型": "文学名著"}',
  true,
  NOW(),
  NOW()
);

-- 产品5：创意笔记本
INSERT INTO products (id, categoryId, name, description, price, originalPrice, stock, images, imageUrl, category, brief, rating, sales, specs, params, isActive, created_at, updated_at)
VALUES (
  uuid_generate_v4(), 
  '31402640-0ba3-11f0-a240-2f283cb6dd31',
  '复古皮面创意笔记本',
  '这款笔记本采用优质PU皮面，手感细腻，复古典雅。内页使用100g优质纸张，书写顺滑，不渗墨。独特的活页设计，可以自由添加、更换和调整页面。内置多种页面模板，包括横线、方格、空白和日程规划等，满足不同记录需求。配有精美书签和弹力绑带，方便携带和保存。是学习、工作和旅行记录的理想选择。',
  69.00,
  89.00,
  1200,
  '["https://picsum.photos/id/118/800/800", "https://picsum.photos/id/119/800/800", "https://picsum.photos/id/120/800/800"]',
  'https://picsum.photos/id/118/800/800',
  '图书文具',
  '复古PU皮面，活页可换，多种内页模板，配书签和绑带',
  4.7,
  9800,
  '{"材质": ["PU皮面", "100g纸张"], "尺寸": ["A5"], "页数": ["活页100张"], "内页类型": ["横线", "方格", "空白", "日程规划"], "颜色": ["棕色", "黑色", "蓝色"]}',
  '{"品牌": "纸语", "型号": "ZY-A5", "特点": "活页,复古", "适用场景": "学习,工作,旅行", "附件": "书签,绑带"}',
  true,
  NOW(),
  NOW()
);
