import React, { useState } from 'react'
import { Menu, Search, User, LogOut, Settings } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'

interface HeaderProps {
  onMenuClick: () => void
  currentPath: string
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, currentPath }) => {
  const { user, logout } = useAuthStore()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard':
        return 'Dashboard'
      case '/chat':
        return 'Chat'
      case '/models':
        return 'AI Models'
      case '/knowledge':
        return 'Knowledge Base'
      case '/analytics':
        return 'Analytics'
      case '/settings':
        return 'Settings'
      default:
        return 'AI Dashboard'
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={onMenuClick}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>

          {/* Page title */}
          <div className="ml-4 lg:ml-0">
            <h1 className="text-2xl font-semibold text-gray-900">
              {getPageTitle(currentPath)}
            </h1>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Search (hidden on mobile) */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-2 rounded-full p-1.5 text-sm leading-6 text-gray-900 hover:bg-gray-50"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-2 text-sm font-semibold leading-6 text-gray-900">
                  {user?.firstName} {user?.lastName}
                </span>
              </span>
            </button>

            {/* User dropdown menu */}
            {userMenuOpen && (
              <div className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5">
                <a
                  href="/settings"
                  className="flex items-center gap-x-2 px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </a>
                <button
                  onClick={() => {
                    logout()
                    setUserMenuOpen(false)
                  }}
                  className="flex w-full items-center gap-x-2 px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}