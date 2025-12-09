# 快速启动指南

## 前置准备

在开始之前,请确保你有:
- ✅ Node.js 18+ 已安装
- ✅ Supabase 账户 (免费注册: https://supabase.com)

## 步骤 1: 创建 Supabase 项目

1. 访问 https://supabase.com/dashboard
2. 点击 "New Project"
3. 选择你的组织(或创建新组织)
4. 填写项目信息:
   - 项目名称: `auth-app` (或任意名称)
   - 数据库密码: 设置一个强密码
   - 区域: 选择离你最近的区域
5. 点击 "Create new project"
6. 等待项目创建完成(大约 1-2 分钟)

## 步骤 2: 获取 API 密钥

1. 在 Supabase Dashboard 中,点击左侧菜单的 "Settings" (齿轮图标)
2. 点击 "API"
3. 你将看到:
   - **Project URL**: 形如 `https://xxxxx.supabase.co`
   - **anon public key**: 以 `eyJ` 开头的长字符串

⚠️ 保存好这两个值,下一步需要使用!

## 步骤 3: 配置环境变量

在项目根目录的 `.env.local` 文件中,替换占位符:

```env
NEXT_PUBLIC_SUPABASE_URL=你的Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon key
```

示例:
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 步骤 4: 配置 Supabase Auth

在 Supabase Dashboard 中:

### 启用 Email Provider
1. 点击左侧 "Authentication"
2. 点击 "Providers" 标签
3. 找到 "Email" provider
4. 确保它已启用 ✅

### 配置 Site URL 和 Redirect URLs
1. 点击 "Authentication" > "URL Configuration"
2. 设置 **Site URL**: `http://localhost:3000`
3. 在 **Redirect URLs** 部分,添加:
   - `http://localhost:3000`
   - `http://localhost:3000/**`

## 步骤 5: 安装依赖

如果还没安装依赖:

```bash
npm install
```

## 步骤 6: 启动开发服务器

```bash
npm run dev
```

你应该看到:

```
▲ Next.js 14.2.0
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.3s
```

## 步骤 7: 测试应用

1. 打开浏览器访问 http://localhost:3000
2. 你会看到欢迎页面
3. 点击 "Sign Up" 创建新账户
4. 输入邮箱和密码 (密码至少 6 个字符)
5. 注册成功后会自动跳转到 Dashboard

## 常见问题

### 问题 1: "Invalid API key"
**解决方案**: 检查 `.env.local` 文件中的 API 密钥是否正确

### 问题 2: 注册后收不到确认邮件
**解决方案**:
- 开发环境下不需要邮件确认
- 确保在 Supabase Dashboard > Authentication > Providers > Email 中,
  "Confirm email" 设置为关闭(对于开发环境)

### 问题 3: 登录后立即被登出
**解决方案**: 检查 Site URL 和 Redirect URLs 配置是否正确

### 问题 4: npm install 报错
**解决方案**:
```bash
# 清除缓存并重新安装
rm -rf node_modules package-lock.json
npm install
```

## 下一步

现在你已经成功运行了应用!你可以:

- 📝 查看 `README.md` 了解完整文档
- 🎨 自定义 UI 样式
- 🔐 添加更多认证功能(OAuth, Magic Link 等)
- 📊 在 Dashboard 添加更多功能

## 生产环境部署

准备部署到生产环境时:

1. 在 Supabase 中更新 Site URL 和 Redirect URLs 为你的生产域名
2. 在部署平台(Vercel, Netlify 等)设置环境变量
3. 运行 `npm run build` 测试构建
4. 部署!

## 需要帮助?

- 📖 [Supabase 文档](https://supabase.com/docs)
- 📖 [Next.js 文档](https://nextjs.org/docs)
- 🐛 [报告问题](https://github.com/supabase/supabase/issues)
