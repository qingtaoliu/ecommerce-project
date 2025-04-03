-- 主SQL文件，引入所有类目的产品数据

-- 创建UUID扩展（如果需要）
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 引入各类目的SQL文件
\i product_seed_electronics.sql
\i product_seed_clothing.sql
\i product_seed_home.sql
\i product_seed_beauty.sql
\i product_seed_food.sql
\i product_seed_baby.sql
\i product_seed_sports.sql
\i product_seed_books.sql
\i product_seed_appliances.sql
