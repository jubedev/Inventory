import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

/**
 * Hook para acceder al contexto de la aplicación
 * @returns {Object} Context value
 */
export const useAppContext = () => {
  const context = useContext(AppContext)
  
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider')
  }
  
  return context
}
