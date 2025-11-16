'use client'

import AdminTabs from '@/components/AdminTabs'
import AchievementIconManager from '@/components/AchievementIconManager'

export default function AdminPage() {
  const tabs = [
    {
      id: 'achievements',
      label: 'Achievement Icons',
      component: <AchievementIconManager />,
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      component: (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Dashboard</h3>
          <p className="text-gray-600">
            Welcome to the LearnWhatAI Admin Panel. Use the tabs above to manage different
            aspects of your application.
          </p>
        </div>
      ),
    },
    {
      id: 'users',
      label: 'Users',
      component: (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">User Management</h3>
          <p className="text-gray-600">User management features coming soon.</p>
        </div>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      component: (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Settings</h3>
          <p className="text-gray-600">Application settings coming soon.</p>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/appicon_512.png" alt="LearnWhatAI" className="h-10 w-10" />
              <h1 className="text-2xl font-bold text-gray-900">LearnWhatAI Admin</h1>
            </div>
            <div className="text-sm text-gray-500">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Connected
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminTabs tabs={tabs} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            LearnWhatAI Admin Panel &copy; 2025
          </p>
        </div>
      </footer>
    </div>
  )
}
