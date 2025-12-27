# AI导航网站 - Next.js版本

一个现代化的中国AI网站导航平台，使用 Next.js + Supabase + Meilisearch 构建。

## 技术栈

- **前端**: Next.js 14 (React 18, TypeScript)
- **数据库**: Supabase (PostgreSQL)
- **搜索**: Meilisearch (中文搜索体验优秀)
- **部署**: Docker & Docker Compose

## 功能特点

- 🎨 现代化美观的UI设计
- 🔍 Meilisearch中文搜索（实时、快速、准确）
- 📂 分类筛选功能
- 📱 响应式设计，支持移动端
- 🚀 快速加载和流畅交互
- 🔐 后台管理界面（增删改查）
- 🐳 Docker一键部署

## 快速开始

### 前置要求

1. Node.js 18+ 
2. Docker & Docker Compose
3. Supabase账号（免费版即可）

### 1. 克隆项目并安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `env.example` 为 `.env` 并填入你的配置：

```bash
# Windows
copy env.example .env

# Linux/Mac
cp env.example .env
```

编辑 `.env` 文件：

```env
# Supabase配置（从Supabase Dashboard获取）
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Meilisearch配置
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_MASTER_KEY=masterKey
```

### 3. 设置Supabase数据库

#### 方式一：使用Supabase Dashboard（推荐）

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 创建新项目（或使用现有项目）
3. 进入 SQL Editor，运行 `supabase/migrations/001_initial_schema.sql` 中的SQL语句

#### 方式二：使用Supabase CLI

```bash
# 安装Supabase CLI
npm install -g supabase

# 初始化Supabase
supabase init

# 连接你的项目
supabase link --project-ref your-project-ref

# 推送迁移
supabase db push
```

### 4. 导入初始数据

```bash
npm run db:seed
```

### 5. 同步数据到Meilisearch

```bash
npm run sync:meilisearch
```

### 6. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## Docker部署

### 使用Docker Compose（推荐）

```bash
# 确保.env文件已配置

# 构建并启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

访问 http://localhost:9000

### 单独构建Docker镜像

```bash
docker build -t ai-navigation .

docker run -d \
  -p 9000:9000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  -e MEILISEARCH_HOST=http://meilisearch:7700 \
  -e MEILISEARCH_MASTER_KEY=masterKey \
  ai-navigation
```

## 项目结构

```
.
├── app/                    # Next.js App Router
│   ├── api/               # API路由
│   ├── admin/             # 后台管理页面
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # React组件
│   ├── WebsiteCard.tsx
│   ├── SearchBox.tsx
│   └── CategoryFilter.tsx
├── lib/                   # 工具库
│   ├── supabase.ts       # Supabase客户端
│   └── meilisearch.ts    # Meilisearch客户端
├── supabase/             # 数据库迁移文件
│   └── migrations/
├── scripts/              # 脚本文件
│   ├── migrate.js
│   ├── seed.js
│   └── sync-meilisearch.js
├── data/                 # 数据文件
│   └── websites.json
└── docker-compose.yaml   # Docker Compose配置
```

## 后台管理

访问 `/admin` 路径进入后台管理界面，可以进行：
- 添加新网站
- 编辑现有网站
- 删除网站
- 数据会自动同步到Meilisearch

## API端点

- `GET /api/websites` - 获取所有网站
- `POST /api/websites` - 创建新网站
- `PUT /api/websites/[id]` - 更新网站
- `DELETE /api/websites/[id]` - 删除网站
- `GET /api/categories` - 获取所有分类
- `GET /api/search?q=查询` - 搜索网站（Meilisearch）
- `POST /api/sync-meilisearch` - 同步数据到Meilisearch

## 开发

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 注意事项

1. **Supabase配置**: 确保在Supabase Dashboard中正确配置了Row Level Security (RLS)策略
2. **Meilisearch**: 首次运行需要同步数据到Meilisearch索引
3. **环境变量**: 生产环境建议使用更强的MEILISEARCH_MASTER_KEY
4. **数据同步**: 当数据库数据发生变化时，需要运行 `npm run sync:meilisearch` 同步到Meilisearch

## 许可证

MIT
