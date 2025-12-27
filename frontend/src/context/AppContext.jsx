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
      
      // TEMPORAL: Si el backend no tiene auth, usar login simulado
      // Descomentar cuando tengas el endpoint real
      /*
      const response = await api.post('/auth/login', credentials)
      const { token, user: userData } = response.data
      */
      
      // Login simulado para desarrollo
      if (credentials.email && credentials.password) {
        const token = 'fake-token-' + Date.now()
        const userData = {
          id: 1,
          nombre: 'Usuario Demo',
          email: credentials.email,
          rol: 'admin'
        }
        
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        
        return { success: true }
      }
      
      return { success: false, error: 'Credenciales inválidas' }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  // Register
  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      
      // TEMPORAL: Si el backend no tiene auth, usar registro simulado
      // Descomentar cuando tengas el endpoint real
      /*
      const response = await api.post('/auth/register', userData)
      const { token, user: newUser } = response.data
      */
      
      // Registro simulado para desarrollo
      const token = 'fake-token-' + Date.now()
      const newUser = {
        id: Date.now(),
        nombre: userData.nombre,
        email: userData.email,
        rol: 'usuario'
      }
      
      localStorage.setItem('token', token)
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
