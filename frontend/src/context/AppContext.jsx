import { createContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Verificar si hay un usuario autenticado al cargar
  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login
  const login = async (credentials) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await api.post('/auth/login', credentials)
      const { access_token, user: userData } = response.data
      
      localStorage.setItem('token', access_token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      
      return { success: true }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Logout
  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.error('Error al hacer logout:', err)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
    }
  }

  // Register
  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await api.post('/auth/register', userData)
      const { access_token, user: newUser } = response.data
      
      localStorage.setItem('token', access_token)
      localStorage.setItem('user', JSON.stringify(newUser))
      setUser(newUser)
      
      return { success: true }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al registrar usuario'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
