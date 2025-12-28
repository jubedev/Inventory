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

  // Crear un tipo
  const createTipo = useCallback(async (tipoData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.post('/tipos-equipo', tipoData)
      setTiposEquipo((prev) => [...prev, response.data.data])
      return { success: true, data: response.data }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al crear tipo'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Actualizar un tipo
  const updateTipo = useCallback(async (id, tipoData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.put(`/tipos-equipo/${id}`, tipoData)
      setTiposEquipo((prev) =>
        prev.map((tipo) => (tipo.id === id ? response.data.data : tipo))
      )
      return { success: true, data: response.data }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar tipo'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Eliminar un tipo
  const deleteTipo = useCallback(async (id) => {
    try {
      setLoading(true)
      setError(null)
      await api.delete(`/tipos-equipo/${id}`)
      setTiposEquipo((prev) => prev.filter((tipo) => tipo.id !== id))
      return { success: true }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al eliminar tipo'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    tiposEquipo,
    loading,
    error,
    fetchTiposEquipo,
    createTipo,
    updateTipo,
    deleteTipo,
  }
}
