import { useState, useEffect } from 'react'
import api from '../services/api'

export const useUsuariosSistema = () => {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUsuarios = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/usuarios-sistema')
      setUsuarios(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar usuarios')
      console.error('Error fetching usuarios:', err)
    } finally {
      setLoading(false)
    }
  }

  const revokeAccess = async (id) => {
    try {
      setLoading(true)
      const response = await api.post(`/usuarios-sistema/${id}/revoke`)
      await fetchUsuarios()
      return { success: true, data: response.data }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al revocar acceso'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const restoreAccess = async (id) => {
    try {
      setLoading(true)
      const response = await api.post(`/usuarios-sistema/${id}/restore`)
      await fetchUsuarios()
      return { success: true, data: response.data }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al restaurar acceso'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  return {
    usuarios,
    loading,
    error,
    fetchUsuarios,
    revokeAccess,
    restoreAccess,
  }
}
