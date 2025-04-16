# 小鼠兴趣圈 - 兴趣社交平台

基于React+Koa+MySQL的全栈Web应用，支持用户社交、兴趣圈管理及帖子互动功能。

## 功能特性
- **用户系统**：注册/登录、用户名修改
- **兴趣圈管理**：创建/搜索/加入圈子、查看成员活跃度
- **帖子互动**：发帖（支持5张图片）、点赞/评论、全局搜索
- **基础测试**：Jest单元测试覆盖核心功能

## 技术栈
- **前端**：React + Tailwind CSS + Slick Carousel
- **后端**：Koa + Midway + TypeORM
- **数据库**：MySQL 8.0
- **构建工具**：Webpack + Vite

## 快速开始

### 环境要求
- Node.js 16+
- MySQL 8.0

### 后端启动
```bash
cd WebDevelopBackend
npm install
cp .env.example .env  # 配置数据库信息
npm run start
```

### 前端启动
```bash
cd WebDevelopFrontend
npm install
npm run dev  # 开发模式
```

## 项目结构
```
WebDevelopBackend/
├── src/               # 后端源码
│   ├── controller    # API接口
│   └── entity        # 数据库模型

WebDevelopFrontend/
├── src/
│   ├── components    # 公共组件
│   └── pages         # 页面组件
```

## 注意事项
1. 首次使用需配置数据库连接（修改WebDevelopBackend/.env文件）
2. 发帖前必须加入对应兴趣圈
3. 图片上传限制为5张（PNG/JPG格式）
4. 测试数据可通过后端test目录初始化

## 文档说明
详细使用指南见：[小鼠兴趣圈使用说明.md](./小鼠兴趣圈使用说明.md)
```
