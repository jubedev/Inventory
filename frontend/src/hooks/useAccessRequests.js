import { useState, useEffect } from 'react'
import api from '../services/api'

export const useAccessRequests = () => {
  const [solicitudes, setSolicitudes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchSolicitudes = async (estado = null) => {
    try {
      setLoading(true)
      setError(null)
      const params = estado ? { estado } : {}
      const response = await api.get('/access-requests', { params })
      setSolicitudes(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar solicitudes')
      console.error('Error fetching solicitudes:', err)
    } finally {
      setLoading(false)
    }
  }

  const approveSolicitud = async (id, password, rol_id = 2) => {
    try {
      setLoading(true)
      const response = await api.post(`/access-requests/${id}/approve`, {
        password,
        rol_id,
      })
      await fetchSolicitudes()
      return { success: true, data: response.data }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al aprobar solicitud'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const rejectSolicitud = async (id) => {
    try {
      setLoading(true)
      const response = await api.post(`/access-requests/${id}/reject`)
      await fetchSolicitudes()
      return { success: true, data: response.data }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al rechazar solicitud'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const deleteSolicitud = async (id) => {
    try {
      setLoading(true)
      await api.delete(`/access-requests/${id}`)
      await fetchSolicitudes()
      return { success: true }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al eliminar solicitud'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSolicitudes()
  }, [])

  return {
    solicitudes,
    loading,
    error,
    fetchSolicitudes,
    approveSolicitud,
    rejectSolicitud,
    deleteSolicitud,
  }
}
