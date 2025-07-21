import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '../services/api'
import toast from 'react-hot-toast'

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Actions
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => void
  initializeAuth: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true })
          
          const response = await api.post('/auth/login', {
            email,
            password
          })

          const { user, token } = response.data
          
          // Set auth header for future requests
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false
          })

          toast.success(`Welcome back, ${user.firstName}!`)
        } catch (error: any) {
          set({ isLoading: false })
          const message = error.response?.data?.error || 'Login failed'
          toast.error(message)
          throw error
        }
      },

      register: async (email: string, password: string, firstName: string, lastName: string) => {
        try {
          set({ isLoading: true })
          
          await api.post('/auth/register', {
            email,
            password,
            firstName,
            lastName
          })

          set({ isLoading: false })
          toast.success('Account created successfully! Please log in.')
        } catch (error: any) {
          set({ isLoading: false })
          const message = error.response?.data?.error || 'Registration failed'
          toast.error(message)
          throw error
        }
      },

      logout: () => {
        // Call logout endpoint (optional, mainly for logging)
        api.post('/auth/logout').catch(() => {})
        
        // Clear auth header
        delete api.defaults.headers.common['Authorization']
        
        set({
          user: null,
          token: null,
          isAuthenticated: false
        })

        toast.success('Logged out successfully')
      },

      initializeAuth: () => {
        const { token } = get()
        
        if (token) {
          // Set auth header for API calls
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          // Verify token is still valid by fetching user profile
          api.get('/auth/profile')
            .then((response) => {
              set({
                user: response.data.user,
                isAuthenticated: true
              })
            })
            .catch(() => {
              // Token is invalid, clear auth state
              get().logout()
            })
        }
      },

      setUser: (user: User) => {
        set({ user })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
)