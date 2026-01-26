 import { useState } from 'react'

/**
 * Hook reutilizable para manejar el estado de tablas con paginación, búsqueda y filtros
 * @param {Function} fetchFunction - Función para obtener datos (ej: fetchEquipos)
 * @param {Object} pagination - Objeto de paginación con per_page
 * @returns {Object} Estado y funciones para manejar la tabla
 */
export const useTableState = (fetchFunction, pagination = { per_page: 15 }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})

  /**
   * Maneja el cambio de página
   */
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    fetchFunction(newPage, pagination.per_page, { ...filters, search: searchTerm })
  }

  /**
   * Maneja la búsqueda
   */
  const handleSearch = () => {
    setCurrentPage(1)
    fetchFunction(1, pagination.per_page, { ...filters, search: searchTerm })
  }

  /**
   * Maneja el cambio de filtros
   */
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    fetchFunction(1, pagination.per_page, { ...newFilters, search: searchTerm })
  }

  /**
   * Limpia todos los filtros
   */
  const handleClearFilters = () => {
    setFilters({})
    setCurrentPage(1)
    fetchFunction(1, pagination.per_page, { search: searchTerm })
  }

  /**
   * Recarga la página actual con los filtros actuales
   */
  const reloadCurrentPage = () => {
    fetchFunction(currentPage, pagination.per_page, { ...filters, search: searchTerm })
  }

  return {
    // Estado
    searchTerm,
    currentPage,
    filters,
    
    // Setters
    setSearchTerm,
    setCurrentPage,
    setFilters,
    
    // Handlers
    handlePageChange,
    handleSearch,
    handleFilterChange,
    handleClearFilters,
    reloadCurrentPage
  }
}
