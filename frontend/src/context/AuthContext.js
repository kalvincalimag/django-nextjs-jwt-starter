'use client'
import { createContext, useState, useContext, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {jwtDecode} from 'jwt-decode'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authTokens, setAuthTokens] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const updateToken = useCallback(async () => {
    if (!authTokens?.refresh) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: authTokens.refresh })
      })

      const data = await response.json()
      if (response.ok) {
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
        document.cookie = `auth_token=${data.access}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict; Secure`
      } else {
        logoutUser()
      }
    } catch (error) {
      console.error('Token refresh error:', error)
      logoutUser()
    } finally {
      setLoading(false)
    }
  }, [authTokens])

  const registerUser = async (userData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        return { success: true }
      } else {
        const data = await response.json()
        return { success: false, errors: data }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, errors: { non_field_errors: ['An unexpected error occurred'] } }
    }
  }

  const loginUser = async (credentials) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()

      if (response.ok) {
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
        document.cookie = `auth_token=${data.access}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict; Secure`
        router.push('/')
      } else {
        throw new Error(data.detail || 'Login failed')
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const logoutUser = useCallback(() => {
    localStorage.removeItem('authTokens')
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    setAuthTokens(null)
    setUser(null)
    router.push('/login')
  }, [router])

  useEffect(() => {
    const storedTokens = localStorage.getItem('authTokens')
    if (storedTokens) {
      const tokens = JSON.parse(storedTokens)
      setAuthTokens(tokens)
      setUser(jwtDecode(tokens.access))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
    let interval

    if (authTokens) {
      interval = setInterval(() => {
        updateToken()
      }, REFRESH_INTERVAL)
    }

    return () => clearInterval(interval)
  }, [authTokens, updateToken])

  const contextData = {
    user,
    authTokens,
    registerUser,
    loginUser,
    logoutUser,
    loading
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)