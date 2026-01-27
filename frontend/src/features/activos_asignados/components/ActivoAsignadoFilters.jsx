import { useState } from 'react'
import PropTypes from 'prop-types'

const ActivoAsignadoFilters = ({ onFilterChange, onClear }) => {
  const [estado, setEstado] = useState('')

  // Aplicar filtros seleccionados
  const handleApplyFilters = () => {
    const filters = {}
    
    if (estado) {
      filters.estado = estado
    }
    
    onFilterChange(filters)
  }

  // Limpiar todos los filtros
  const handleClearFilters = () => {
    setEstado('')
    onClear()
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Filtros</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Filtro por Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado
          </label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="asignado">Asignado</option>
            <option value="devuelto">Devuelto</option>
          </select>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-end lg:justify-end gap-2">
          <button
            onClick={handleApplyFilters}
            className="flex-1 sm:flex-initial px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Aplicar
          </button>
          <button
            onClick={handleClearFilters}
            className="flex-1 sm:flex-initial px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  )
}

ActivoAsignadoFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
}

export default ActivoAsignadoFilters
