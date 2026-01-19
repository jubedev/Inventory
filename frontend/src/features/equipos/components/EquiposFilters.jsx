import { useState, useEffect } from 'react';
import api from '../../../services/api';

const EquiposFilters = ({ onFilterChange, onClear }) => {
  const [estado, setEstado] = useState('');
  const [tipoEquipoId, setTipoEquipoId] = useState('');
  const [tiposEquipo, setTiposEquipo] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar tipos de equipo al montar el componente
  useEffect(() => {
    const fetchTiposEquipo = async () => {
      try {
        setLoading(true);
        const response = await api.get('/tipo-equipos');
        setTiposEquipo(response.data.data || response.data);
      } catch (err) {
        console.error('Error al cargar tipos de equipo:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTiposEquipo();
  }, []);

  // Aplicar filtros seleccionados
  const handleApplyFilters = () => {
    const filters = {};
    
    if (estado) {
      filters.estado = estado;
    }
    
    if (tipoEquipoId) {
      filters.tipo_equipo_id = tipoEquipoId;
    }
    
    onFilterChange(filters);
  };

  // Limpiar todos los filtros
  const handleClearFilters = () => {
    setEstado('');
    setTipoEquipoId('');
    onClear();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Filtros</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <option value="disponible">Disponible</option>
            <option value="en uso">En uso</option>
            <option value="mantenimiento">Mantenimiento</option>
            <option value="dado de baja">Dado de baja</option>
          </select>
        </div>

        {/* Filtro por Tipo de Equipo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Equipo
          </label>
          <select
            value={tipoEquipoId}
            onChange={(e) => setTipoEquipoId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            {tiposEquipo.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
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

export default EquiposFilters;
