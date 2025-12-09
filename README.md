# Auth App - Next.js + Supabase Authentication

这是一个使用 Next.js 14 和 Supabase 实现用户注册和登录功能的应用程序。该项目基于 Figma 设计系统组件库的样式构建。

## 功能特性

- ✅ 用户注册 (Sign Up)
- ✅ 用户登录 (Log In)
- ✅ 用户仪表板 (Dashboard)
- ✅ 用户登出 (Sign Out)
- ✅ 受保护的路由
- ✅ Server-Side Authentication
- ✅ TypeScript 类型支持
- ✅ Tailwind CSS 样式

## 技术栈

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Authentication Flow**: Server-Side with @supabase/ssr

## 项目结构

```
auth-app/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # 仪表板页面 (受保护)
│   ├── error/
│   │   └── page.tsx          # 错误页面
│   ├── login/
│   │   ├── actions.ts        # 登录 Server Action
│   │   └── page.tsx          # 登录页面
│   ├── register/
│   │   ├── actions.ts        # 注册 Server Action
│   │   └── page.tsx          # 注册页面
│   ├── globals.css           # 全局样式
│   ├── layout.tsx            # 根布局
│   └── page.tsx              # 首页
├── utils/
│   └── supabase/
│       ├── client.ts         # 客户端 Supabase 配置
│       ├── server.ts         # 服务端 Supabase 配置
│       └── middleware.ts     # 中间件 Supabase 配置
├── middleware.ts             # Next.js 中间件
├── .env.local                # 环境变量 (需要配置)
└── package.json
```

## 开始使用

### 1. 安装依赖

```bash
cd auth-app
npm install
```

### 2. 配置 Supabase

1. 在 [Supabase](https://supabase.com) 创建一个新项目
2. 获取你的项目 URL 和 anon key
   - 进入项目 Dashboard
   - 点击 Settings > API
   - 复制 "Project URL" 和 "anon public" key

3. 在 `.env.local` 文件中配置环境变量:

```env
NEXT_PUBLIC_SUPABASE_URL=你的项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon-key
```

### 3. 配置 Supabase Auth

在 Supabase Dashboard 中:

1. 进入 Authentication > Providers
2. 确保 Email provider 已启用
3. 在 Authentication > URL Configuration 中:
   - 添加 `http://localhost:3000` 到 Site URL
   - 添加 `http://localhost:3000/**` 到 Redirect URLs

### 4. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 使用说明

### 用户注册

1. 访问首页,点击 "Sign Up" 按钮
2. 输入邮箱和密码
3. 点击 "Sign Up" 完成注册
4. 注册成功后会自动跳转到仪表板

### 用户登录

1. 访问首页,点击 "Log In" 按钮
2. 输入已注册的邮箱和密码
3. 点击 "Log In" 完成登录
4. 登录成功后会自动跳转到仪表板

### 用户登出

在仪表板页面点击 "Sign Out" 按钮即可退出登录。

## 关键实现

### Server Actions

本项目使用 Next.js Server Actions 处理表单提交:

- `app/register/actions.ts` - 处理用户注册
- `app/login/actions.ts` - 处理用户登录

### Middleware

`middleware.ts` 负责在每次请求前刷新用户 session,确保身份验证状态始终是最新的。

### Protected Routes

仪表板页面 (`app/dashboard/page.tsx`) 是受保护的路由,未登录用户会被重定向到登录页面。

## Supabase 集成说明

### 客户端配置

使用 `@supabase/ssr` 包的 `createBrowserClient` 创建客户端:

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### 服务端配置

使用 `createServerClient` 并配置 cookie 处理:

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          // ... cookie 设置逻辑
        },
      },
    }
  )
}
```

## 构建生产版本

```bash
npm run build
npm start
```

## 部署

本应用可以部署到支持 Next.js 的任何平台:

- Vercel (推荐)
- Netlify
- Railway
- 其他支持 Node.js 的平台

部署前确保在平台上设置正确的环境变量。

## 故障排除

### 认证错误

如果遇到认证错误:
1. 检查 `.env.local` 中的环境变量是否正确
2. 确保 Supabase 项目的 Email Provider 已启用
3. 检查 Redirect URLs 配置是否正确

### Cookie 问题

如果 session 无法保持:
1. 确保 middleware.ts 正确配置
2. 检查浏览器是否允许 cookies

## 参考资料

- [Next.js 文档](https://nextjs.org/docs)
- [Supabase 文档](https://supabase.com/docs)
- [Supabase Auth 指南](https://supabase.com/docs/guides/auth)
- [Next.js Server-Side Auth with Supabase](https://supabase.com/docs/guides/auth/server-side/nextjs)

## License

MIT
