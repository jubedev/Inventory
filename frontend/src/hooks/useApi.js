import { useState, useCallback } from 'react'
import api from '../services/api'

/**
 * Hook genérico para hacer peticiones a la API
 * @returns {Object} { data, loading, error, request }
 */
export const useApi = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (method, url, payload = null) => {
    try {
      setLoading(true)
      setError(null)
      
      let response
      switch (method.toLowerCase()) {
        case 'get':
          response = await api.get(url)
          break
        case 'post':
          response = await api.post(url, payload)
          break
        case 'put':
          response = await api.put(url, payload)
          break
        case 'delete':
          response = await api.delete(url)
          break
        default:
          throw new Error(`Método HTTP no soportado: ${method}`)
      }
      
      setData(response.data)
      return { success: true, data: response.data }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error en la petición'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  return { data, loading, error, request, resetError }
}
