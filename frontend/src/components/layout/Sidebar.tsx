import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  MessageSquare, 
  Bot, 
  BookOpen, 
  BarChart3, 
  Settings, 
  X 
} from 'lucide-react'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'Models', href: '/models', icon: Bot },
  { name: 'Knowledge', href: '/knowledge', icon: BookOpen },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto glass-dark px-6 py-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-white">
                AI Dashboard
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${
                            isActive
                              ? 'bg-white/10 text-white'
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          }`
                        }
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`relative z-50 lg:hidden ${open ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900/80" />
        <div className="fixed inset-0 flex">
          <div className="relative mr-16 flex w-full max-w-xs flex-1">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                className="-m-2.5 p-2.5"
                onClick={onClose}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto glass-dark px-6 py-4">
              {/* Mobile Logo */}
              <div className="flex h-16 shrink-0 items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="ml-3 text-xl font-bold text-white">
                    AI Dashboard
                  </span>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <NavLink
                            to={item.href}
                            onClick={onClose}
                            className={({ isActive }) =>
                              `group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${
                                isActive
                                  ? 'bg-white/10 text-white'
                                  : 'text-gray-300 hover:text-white hover:bg-white/5'
                              }`
                            }
                          >
                            <item.icon className="h-6 w-6 shrink-0" />
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}