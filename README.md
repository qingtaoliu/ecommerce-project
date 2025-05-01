# 电商项目 (E-commerce Project)

## 项目概览

本项目是一个全栈电商解决方案，采用微服务架构和 Monorepo 管理方式，提供完整的电商业务功能实现。

### 核心功能

- 多端支持：Web商城、小程序、管理后台
- 微服务架构：基于 NestJS 的后端服务
- UI 组件库：可复用的 React 组件系统
- 统一规范：共享的 TypeScript 配置和 ESLint 规则

## 技术栈

### 前端技术
- **Web框架**: Next.js 13+
- **UI框架**: React 18
- **小程序**: 微信小程序原生框架
- **状态管理**: React Context + Hooks
- **样式方案**: Tailwind CSS

### 后端技术
- **服务框架**: NestJS
- **数据库**: MySQL
- **缓存**: Redis
- **消息队列**: RabbitMQ

### 开发工具
- **构建系统**: Turborepo
- **包管理器**: pnpm
- **开发语言**: TypeScript
- **代码规范**: ESLint + Prettier

## 项目结构

```
├── apps/                      # 应用程序
│   ├── backend/               # NestJS 后端服务
│   ├── web-store/             # Next.js 商城前端
│   ├── mini-program/          # 微信小程序
│   ├── sql/                   # 数据库脚本
│   └── ui-design/             # UI 设计文件
├── packages/                  # 共享包
│   ├── api/                   # API 类型定义
│   ├── eslint-config/         # ESLint 配置
│   ├── typescript-config/     # TypeScript 配置
│   └── ui/                    # 共享 UI 组件
└── turbo.json                 # Turborepo 配置
```

## 开发指南

### 环境要求
- Node.js 18+
- pnpm 8+
- MySQL 8.0+
- Redis 6+

### 本地开发

1. 安装依赖
```bash
pnpm install
```

2. 配置环境变量
```bash
cp apps/backend/.env.example apps/backend/.env
# 编辑 .env 文件配置数据库等信息
```

3. 启动开发服务器
```bash
pnpm dev
```

## 缓存配置

项目使用 Turborepo 的远程缓存功能加速构建：

```bash
pnpm turbo login
pnpm turbo link
```

## 部署说明

### 后端服务
```bash
cd apps/backend
pnpm build
pnpm start:prod
```

### Web商城
```bash
cd apps/web-store
pnpm build
pnpm start
```

### 小程序
使用微信开发者工具导入 `apps/mini-program` 目录

## 文档链接

- [后端API文档](apps/backend/README.md)
- [Web商城文档](apps/web-store/README.md)
- [组件库文档](packages/ui/README.md)

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'feat: add some feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情
