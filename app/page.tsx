import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Build Your Own
          </h1>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Team Library
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't reinvent the wheel with every design. Team libraries let you share styles
            and components across files, with everyone on your team.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
            Get Started Today
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="rounded-lg bg-blue-600 px-8 py-4 text-white hover:bg-blue-700 transition-colors font-medium text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-green-600 px-8 py-4 text-white hover:bg-green-700 transition-colors font-medium text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">🎨</div>
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Design System</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create and maintain consistent design systems across your organization
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">🤝</div>
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Collaboration</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Work together seamlessly with your team members in real-time
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Fast & Secure</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built with Next.js and Supabase for optimal performance and security
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
