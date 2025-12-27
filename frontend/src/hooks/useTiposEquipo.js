import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

/**
 * Hook personalizado para gestionar tipos de equipo
 */
export const useTiposEquipo = () => {
  const [tiposEquipo, setTiposEquipo] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Obtener todos los tipos de equipo
  const fetchTiposEquipo = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/tipos-equipo')
      setTiposEquipo(response.data.data || response.data)
      return { success: true, data: response.data }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al obtener tipos de equipo'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Cargar tipos de equipo al montar el componente
  useEffect(() => {
    fetchTiposEquipo()
  }, [fetchTiposEquipo])

  return {
    tiposEquipo,
    loading,
    error,
    fetchTiposEquipo,
  }
}
