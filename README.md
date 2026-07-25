# Kyrie's Blog

一个现代化的全栈博客系统，支持文章管理、课程展示和后台管理。

## 技术栈

### 前端
- **React 19** — 用户界面构建
- **React Router 7** — 客户端路由
- **Vite 8** — 构建工具
- **animejs** — 动画库

### 后端
- **FastAPI** — Python Web 框架
- **SQLAlchemy** — ORM
- **SQLite** — 数据库
- **JWT** — 身份认证

## 项目结构

```
zero-to-tech/
├── src/
│   ├── api/            # API 请求封装
│   ├── components/     # React 组件
│   ├── context/        # React Context
│   ├── data/           # 静态数据（备用）
│   └── pages/          # 页面组件
├── server/
│   ├── routers/        # API 路由
│   ├── models.py       # 数据库模型
│   ├── schemas.py      # Pydantic 模式
│   ├── auth.py         # 认证逻辑
│   └── main.py         # 应用入口
├── css/                # 全局样式
└── dist/               # 构建产物
```

## 快速开始

### 1. 安装依赖

```bash
# 前端依赖
npm install

# 后端依赖
cd server
pip install -r requirements.txt
```

### 2. 启动服务

```bash
# 启动后端（端口 8000）
cd server
uvicorn main:app --reload

# 启动前端（端口 5173）
npm run dev
```

### 3. 访问应用

- 前端：http://localhost:5173
- 后端 API：http://localhost:8000
- API 文档：http://localhost:8000/docs

## 功能特性

### 前台功能
- 首页展示课程系列和课程理念
- 博客文章列表和详情页
- 课程列表和详情页
- 深色/浅色主题切换
- 响应式设计

### 后台管理
访问 `/admin` 进入管理后台（默认账号：admin / 密码：admin123）

- 文章管理：创建、编辑、删除、发布/取消发布
- 分类管理：添加、删除分类
- 标签管理：添加、删除标签

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/posts` | 获取文章列表 |
| GET | `/api/posts/{id}` | 获取文章详情 |
| POST | `/api/posts` | 创建文章（需认证） |
| PUT | `/api/posts/{id}` | 更新文章（需认证） |
| DELETE | `/api/posts/{id}` | 删除文章（需认证） |
| POST | `/api/auth/login` | 用户登录 |
| GET | `/api/categories` | 获取分类列表 |
| GET | `/api/tags` | 获取标签列表 |
| GET | `/api/courses` | 获取课程列表 |
| GET | `/api/lessons` | 获取课时列表 |

## 环境变量

后端默认配置可在 `server/auth.py` 中修改：

- `SECRET_KEY` — JWT 密钥
- `ACCESS_TOKEN_EXPIRE_MINUTES` — Token 过期时间

## 部署

### 构建前端

```bash
npm run build
```

构建产物会输出到 `dist/` 目录。

### 生产环境

建议使用 Nginx 反向代理，将 `/api` 请求转发到后端服务。

## 许可证

MIT
