import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

/**
 * Hook personalizado para gestionar equipos
 * @returns {Object} { equipos, loading, error, fetchEquipos, createEquipo, updateEquipo, deleteEquipo, getStats }
 */
export const useEquipos = () => {
  const [equipos, setEquipos] = useState([])
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Obtener todos los equipos
  const fetchEquipos = useCallback(async (page = 1, perPage = 15, filters = {}) => {
    try {
      setLoading(true)
      setError(null)
      const params = { page, per_page: perPage, ...filters }
      const response = await api.get('/equipos', { params })
      setEquipos(response.data.data || response.data)
      setPagination({
        current_page: response.data.current_page || 1,
        last_page: response.data.last_page || 1,
        per_page: response.data.per_page || perPage,
        total: response.data.total || 0
      })
      return { success: true, data: response.data }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al obtener equipos'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Crear un equipo
  const createEquipo = useCallback(async (equipoData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.post('/equipos', equipoData)
      setEquipos((prev) => [...prev, response.data.data])
      return { success: true, data: response.data }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al crear equipo'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Actualizar un equipo
  const updateEquipo = useCallback(async (id, equipoData) => {
    try {
      console.log('useEquipos: Actualizando equipo', id, equipoData)
      setLoading(true)
      setError(null)
      const response = await api.put(`/equipos/${id}`, equipoData)
      console.log('useEquipos: Respuesta del servidor', response.data)
      setEquipos((prev) =>
        prev.map((equipo) => (equipo.id === id ? response.data.data : equipo))
      )
      return { success: true, data: response.data }
    } catch (err) {
      console.error('useEquipos: Error al actualizar', err)
      const errorMessage = err.response?.data?.message || 'Error al actualizar equipo'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Eliminar un equipo
  const deleteEquipo = useCallback(async (id) => {
    try {
      setLoading(true)
      setError(null)
      await api.delete(`/equipos/${id}`)
      setEquipos((prev) => prev.filter((equipo) => equipo.id !== id))
      return { success: true }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al eliminar equipo'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Obtener estadísticas
  const getStats = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/equipos/stats')
      return { success: true, data: response.data }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al obtener estadísticas'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Cargar equipos al montar el componente
  useEffect(() => {
    fetchEquipos()
  }, [fetchEquipos])

  return {
    equipos,    pagination,    loading,
    error,
    fetchEquipos,
    createEquipo,
    updateEquipo,
    deleteEquipo,
    getStats,
  }
}
