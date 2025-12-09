import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col p-6 sm:p-24 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <form action={signOut}>
            <button
              type="submit"
              className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              Sign Out
            </button>
          </form>
        </div>

        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
          <p className="text-blue-100">
            You're successfully logged in and ready to start building amazing things.
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            User Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex-shrink-0 w-32 font-semibold text-gray-600 dark:text-gray-400">
                Email
              </div>
              <div className="flex-1 text-gray-900 dark:text-white break-all">
                {user.email}
              </div>
            </div>
            <div className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex-shrink-0 w-32 font-semibold text-gray-600 dark:text-gray-400">
                User ID
              </div>
              <div className="flex-1 text-gray-900 dark:text-white font-mono text-sm break-all">
                {user.id}
              </div>
            </div>
            <div className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex-shrink-0 w-32 font-semibold text-gray-600 dark:text-gray-400">
                Created
              </div>
              <div className="flex-1 text-gray-900 dark:text-white">
                {new Date(user.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-32 font-semibold text-gray-600 dark:text-gray-400">
                Last Sign In
              </div>
              <div className="flex-1 text-gray-900 dark:text-white">
                {user.last_sign_in_at
                  ? new Date(user.last_sign_in_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Analytics</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View your usage statistics and insights
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-4xl mb-3">⚙️</div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Settings</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your account preferences
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-4xl mb-3">👥</div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Team</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Collaborate with your team members
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
