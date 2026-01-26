import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../../../services/api'

const UsuariosFilter = ({ onFilterChange, onClear }) => {
  const [estado, setEstado] = useState('')
  const [areaId, setAreaId] = useState('')
  const [cargoId, setCargoId] = useState('')
  const [areas, setAreas] = useState([])
  const [cargos, setCargos] = useState([])
  const [loading, setLoading] = useState(false)

  // Cargar áreas y cargos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [areasRes, cargosRes] = await Promise.all([
          api.get('/areas'),
          api.get('/cargos')
        ])
        const areasData = areasRes.data.data || areasRes.data
        const cargosData = cargosRes.data.data || cargosRes.data
        setAreas(Array.isArray(areasData) ? areasData : [])
        setCargos(Array.isArray(cargosData) ? cargosData : [])
      } catch (err) {
        console.error('Error al cargar datos para filtros:', err)
        setAreas([])
        setCargos([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Aplicar filtros seleccionados
  const handleApplyFilters = () => {
    const filters = {}
    
    if (estado) {
      filters.estado = estado
    }
    
    if (areaId) {
      filters.area_id = areaId
    }
    
    if (cargoId) {
      filters.cargo_id = cargoId
    }
    
    onFilterChange(filters)
  }

  // Limpiar todos los filtros
  const handleClearFilters = () => {
    setEstado('')
    setAreaId('')
    setCargoId('')
    onClear()
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Filtros</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
            <option value="Suspendido">Suspendido</option>
          </select>
        </div>

        {/* Filtro por Área */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Área
          </label>
          <select
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="">Todas</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Cargo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cargo
          </label>
          <select
            value={cargoId}
            onChange={(e) => setCargoId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="">Todos</option>
            {cargos.map((cargo) => (
              <option key={cargo.id} value={cargo.id}>
                {cargo.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-end lg:justify-end gap-2">
          <button
            onClick={handleApplyFilters}
            disabled={loading}
            className="flex-1 sm:flex-initial lg:flex-initial px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            Aplicar
          </button>
          <button
            onClick={handleClearFilters}
            className="flex-1 sm:flex-initial lg:flex-initial px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  )
}

UsuariosFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
}

export default UsuariosFilter
