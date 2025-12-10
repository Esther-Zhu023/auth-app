# Cloudflare Pages 部署指南

## 📦 部署到 Cloudflare Pages

由于我们的应用使用了 Next.js Server Actions 和服务端渲染,建议使用 Cloudflare Dashboard 通过 Git 集成自动部署。

## 🚀 部署步骤

### 方法 1: 通过 Cloudflare Dashboard (推荐)

#### 第 1 步: 访问 Cloudflare Pages

1. 访问: https://dash.cloudflare.com/
2. 登录你的账户 (Esther@feedmob.com's Account)
3. 点击左侧菜单 **Workers & Pages**
4. 或直接访问: https://dash.cloudflare.com/27d2e68408461f30727ec073cade7543/workers-and-pages

#### 第 2 步: 创建新项目

1. 点击 **Create application** 按钮
2. 选择 **Pages** 标签
3. 点击 **Connect to Git**

#### 第 3 步: 连接 GitHub 仓库

1. 选择 **GitHub** 作为 Git 提供商
2. 如果是首次使用,需要授权 Cloudflare 访问你的 GitHub
3. 在仓库列表中找到 **Esther-Zhu023/auth-app**
4. 点击 **Begin setup**

#### 第 4 步: 配置构建设置

在 "Build settings" 页面,配置如下:

**Project name:** `auth-app` (或自定义名称)

**Production branch:** `main`

**Framework preset:** Next.js

**Build command:**
```bash
npx @cloudflare/next-on-pages@1
```

**Build output directory:**
```
.vercel/output/static
```

**Root directory:** `/` (保持默认)

#### 第 5 步: 设置环境变量

点击 **Environment variables** 部分,添加以下变量:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: 你的 Supabase Project URL
   - 示例: `https://xxxxx.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: 你的 Supabase anon key
   - 示例: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

3. **NODE_VERSION** (可选,但推荐)
   - Value: `18` 或 `20`

#### 第 6 步: 部署

1. 点击 **Save and Deploy**
2. Cloudflare Pages 会开始构建你的应用
3. 构建过程大约需要 2-5 分钟
4. 构建完成后,你会看到部署 URL

## 📝 构建完成后

### 你的网站 URL

部署成功后,你会获得:
- **Pages 域名**: `https://auth-app-xxx.pages.dev`
- **自定义域名**: 可以在项目设置中添加

### 自动部署

每次你推送代码到 GitHub 的 `main` 分支时,Cloudflare Pages 会自动:
1. 检测到新的 commit
2. 触发构建
3. 部署新版本

### Preview 部署

当你创建 Pull Request 时,Cloudflare Pages 会自动创建预览部署,URL 格式:
- `https://<branch-name>.auth-app-xxx.pages.dev`

## ⚙️ 更新 Supabase 设置

部署成功后,记得在 Supabase Dashboard 更新以下设置:

### 1. 更新 Site URL

1. 访问 Supabase Dashboard: https://supabase.com/dashboard
2. 进入你的项目
3. 点击 **Authentication** > **URL Configuration**
4. 在 **Site URL** 中添加你的 Cloudflare Pages URL
   - 示例: `https://auth-app-xxx.pages.dev`

### 2. 更新 Redirect URLs

在 **Redirect URLs** 部分添加:
- `https://auth-app-xxx.pages.dev/**`
- `https://auth-app-xxx.pages.dev/auth/callback`

## 🔍 故障排除

### 构建失败

如果构建失败,检查:
1. 构建日志中的错误信息
2. 确保环境变量正确设置
3. 检查 `package.json` 中的依赖版本

### 认证不工作

如果登录/注册不工作:
1. 确认环境变量已设置
2. 检查 Supabase 的 Site URL 和 Redirect URLs
3. 查看浏览器控制台的错误信息

### 部署很慢

首次部署通常需要更长时间,后续部署会利用缓存,速度会快很多。

## 🎯 后续优化

### 1. 添加自定义域名

1. 在 Cloudflare Pages 项目设置中
2. 点击 **Custom domains**
3. 添加你的域名并按照指引配置 DNS

### 2. 设置 Preview 分支

1. 在项目设置中
2. 配置哪些分支应该触发预览部署

### 3. 监控和分析

Cloudflare Pages 提供:
- 访问统计
- 性能指标
- 构建历史
- 部署日志

## 📚 相关链接

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [环境变量配置](https://developers.cloudflare.com/pages/configuration/build-configuration/)

---

## 🚨 重要提示

由于我们的应用使用了:
- Server Actions (Server-side form handling)
- Server Components
- Dynamic routing
- Middleware

不能使用 Next.js 静态导出。必须使用 Cloudflare Pages + Next.js 完整支持,或考虑部署到 Vercel。

如果遇到问题,可以考虑部署到 Vercel (Next.js 官方推荐平台):
```bash
npm i -g vercel
vercel
```

## ✅ 检查清单

部署前确认:
- [ ] GitHub 仓库已创建并推送
- [ ] Supabase 项目已创建
- [ ] 获取了 Supabase URL 和 anon key
- [ ] 准备好在 Cloudflare Dashboard 设置环境变量
- [ ] 了解需要更新 Supabase 的 URL 配置

部署后确认:
- [ ] 应用可以访问
- [ ] 注册功能正常
- [ ] 登录功能正常
- [ ] 登出功能正常
- [ ] Dashboard 显示正常
