import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { AppContextType } from '../types'

/**
 * Hook para acceder al contexto de la aplicación
 * @returns {Object} Context value
 */
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider')
  }
  
  return context
}
