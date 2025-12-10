import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const runtime = 'edge';

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full shadow-xl mb-6">
            <span className="text-5xl">🌿</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
            绿植销售平台
          </h1>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            打造您的绿色家园
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            发现最优质的绿植，为您的空间带来生机与活力。
            专业的植物护理建议，让每一株绿植都茁壮成长。
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
            立即开始您的绿植之旅
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="rounded-lg bg-green-600 px-8 py-4 text-white hover:bg-green-700 transition-colors font-medium text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              登录
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-emerald-600 px-8 py-4 text-white hover:bg-emerald-700 transition-colors font-medium text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              注册
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-green-100 dark:border-gray-700">
            <div className="text-3xl mb-3">🪴</div>
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">优质绿植</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              精选健康茁壮的绿植，每一株都经过专业养护和检验
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-green-100 dark:border-gray-700">
            <div className="text-3xl mb-3">🌱</div>
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">养护指导</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              提供专业的植物养护建议，让您的绿植健康成长
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-green-100 dark:border-gray-700">
            <div className="text-3xl mb-3">🚚</div>
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">快速配送</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              专业包装，快速配送，确保绿植安全送达您的手中
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
