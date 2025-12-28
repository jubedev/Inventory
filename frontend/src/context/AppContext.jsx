import { createContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Verificar si hay un usuario autenticado al cargar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      
      if (token) {
        try {
          // Verificar que el token sea válido
          const response = await api.get('/auth/me')
          const userData = response.data.user // El backend devuelve { user: {...} }
          setUser(userData)
          localStorage.setItem('user', JSON.stringify(userData))
        } catch (err) {
          // Token inválido o expirado
          console.log('Token inválido, limpiando sesión')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setUser(null)
        }
      }
      
      setLoading(false)
    }

    checkAuth()
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

  // Register - Ahora crea solicitud de acceso
  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await api.post('/auth/register', userData)
      
      return { 
        success: true, 
        message: response.data.message 
      }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al enviar solicitud'
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
