-- 插入用户数据
INSERT INTO users (id, username, email, password, phone, role) VALUES
(UUID(), 'admin', 'admin@example.com', '$2b$10$xxxxxxxxxxx', '13800138000', 'admin'),
(UUID(), 'user1', 'user1@example.com', '$2b$10$xxxxxxxxxxx', '13800138001', 'user'),
(UUID(), 'user2', 'user2@example.com', '$2b$10$xxxxxxxxxxx', '13800138002', 'user');

-- 插入类别数据
INSERT INTO categories (id, name) VALUES
(UUID(), '手机'),
(UUID(), '电脑'),
(UUID(), '配件');

-- 插入产品数据
INSERT INTO products (id, name, description, price, stock, category_id) VALUES
(UUID(), 'iPhone 15', '最新款iPhone', 6999.00, 100, (SELECT id FROM categories WHERE name = '手机')),
(UUID(), 'MacBook Pro', '专业级笔记本', 12999.00, 50, (SELECT id FROM categories WHERE name = '电脑')),
(UUID(), 'AirPods Pro', '主动降噪耳机', 1999.00, 200, (SELECT id FROM categories WHERE name = '配件'));

-- 插入购物车数据
INSERT INTO cart (id, user_id) VALUES
(UUID(), (SELECT id FROM users WHERE username = 'user1'));

-- 插入购物车商品
INSERT INTO cart_items (id, cart_id, product_id, quantity) VALUES
(UUID(), (SELECT id FROM cart WHERE user_id = (SELECT id FROM users WHERE username = 'user1')),
        (SELECT id FROM products WHERE name = 'iPhone 15'), 1);

-- 插入订单数据
INSERT INTO orders (id, user_id, total_price, status) VALUES
(UUID(), (SELECT id FROM users WHERE username = 'user1'), 6999.00, 'paid');

-- 插入订单商品
INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES
(UUID(), (SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'user1')),
        (SELECT id FROM products WHERE name = 'iPhone 15'), 1, 6999.00);

-- 插入收货地址
INSERT INTO shipping_addresses (id, user_id, recipient_name, phone, address, zip_code, is_default) VALUES
(UUID(), (SELECT id FROM users WHERE username = 'user1'), '张三', '13800138001', '北京市朝阳区xxx街道', '100000', true);

-- 插入物流信息
INSERT INTO shipments (id, order_id, tracking_number, status) VALUES
(UUID(), (SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'user1')),
        'SF1234567890', 'shipped');

-- 插入商品评价
INSERT INTO reviews (id, user_id, product_id, rating, comment) VALUES
(UUID(), (SELECT id FROM users WHERE username = 'user1'),
        (SELECT id FROM products WHERE name = 'iPhone 15'),
        5, '非常好用的手机！');

-- 插入收藏数据
INSERT INTO favorites (id, user_id, product_id) VALUES
(UUID(), (SELECT id FROM users WHERE username = 'user1'),
        (SELECT id FROM products WHERE name = 'MacBook Pro'));