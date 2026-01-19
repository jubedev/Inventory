import { useState, useEffect } from 'react';
import api from '../../../services/api';

/**
 * Componente de filtros para movimientos de inventario
 * 
 * EJERCICIO: Implementa este componente siguiendo estos pasos:
 * 
 * 1. Crea estados para cada filtro (tipoMovimientoId, activo)
 * 2. Crea un estado para almacenar los tipos de movimiento (fetch desde API)
 * 3. Implementa useEffect para cargar los tipos de movimiento al montar
 * 4. Crea funciones handleApplyFilters() y handleClearFilters()
 * 5. Renderiza los selectores y botones
 * 
 * Props:
 * - onFilterChange: función que recibe un objeto con los filtros
 * - onClear: función que se llama al limpiar filtros
 */
const MovimientosFilters = ({ onFilterChange, onClear }) => {
  // TODO: Agrega los estados necesarios aquí
  const [tipoMovimientoId, setTipoMovimientoId] = useState('');
  const [activo, setActivo] = useState('1'); // Por defecto solo activos
  const [tiposMovimiento, setTiposMovimiento] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar tipos de movimiento al montar el componente
  useEffect(() => {
    const fetchTiposMovimiento = async () => {
      try {
        setLoading(true);
        const response = await api.get('/tipo-movimientos');
        setTiposMovimiento(response.data.data || response.data);
      } catch (err) {
        console.error('Error al cargar tipos de movimiento:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTiposMovimiento();
  }, []);

  // Aplicar filtros seleccionados
  const handleApplyFilters = () => {
    const filters = {};
    
    if (tipoMovimientoId) {
      filters.tipo_movimiento_id = tipoMovimientoId;
    }
    
    if (activo !== '') {
      filters.activo = activo;
    }
    
    onFilterChange(filters);
  };

  // Limpiar todos los filtros
  const handleClearFilters = () => {
    setTipoMovimientoId('');
    setActivo('1');
    onClear();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Filtros</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filtro por Tipo de Movimiento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Movimiento
          </label>
          <select
            value={tipoMovimientoId}
            onChange={(e) => setTipoMovimientoId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            {tiposMovimiento.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado
          </label>
          <select
            value={activo}
            onChange={(e) => setActivo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="1">Activos</option>
            <option value="0">Inactivos</option>
          </select>
        </div>

        {/* Botones */}
        <div className="flex items-end gap-2">
          <button
            onClick={handleApplyFilters}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            Aplicar
          </button>
          <button
            onClick={handleClearFilters}
            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovimientosFilters;
