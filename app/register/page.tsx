'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signup } from './actions'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    // 客户端验证
    if (!email || !password || !confirmPassword) {
      setError('请填写所有字段')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('密码长度至少为 6 个字符')
      setLoading(false)
      return
    }

    try {
      const result = await signup(formData)

      // 如果返回了错误信息
      if (result && result.error) {
        setError(result.error)
        setLoading(false)
      }
      // 如果成功，会自动跳转，不需要处理
    } catch (err) {
      setError('注册过程中发生错误，请稍后重试')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        {/* 绿植装饰 */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full shadow-lg">
            <span className="text-4xl">🌿</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-green-100 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            加入绿植家族
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            开始您的绿色生活之旅
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form action={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="••••••••"
                minLength={6}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Must be at least 6 characters
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
