const EquiposTable = ({ equipos, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  const getEstadoBadge = (estado) => {
    const badges = {
      disponible: 'bg-green-100 text-green-800',
      'en uso': 'bg-yellow-100 text-yellow-800',
      mantenimiento: 'bg-red-100 text-red-800',
      'fuera de servicio': 'bg-gray-100 text-gray-800',
    }
    return badges[estado?.toLowerCase()] || badges.disponible
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Activo
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Serial
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Marca
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Modelo
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Ubicación
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Estado
              </th>
              <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {equipos.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-gray-500">
                  <div className="flex flex-col items-center">
                    <span className="text-6xl mb-4">📦</span>
                    <p className="text-lg font-medium">No hay equipos registrados</p>
                    <p className="text-sm">Comienza agregando un nuevo equipo</p>
                  </div>
                </td>
              </tr>
            ) : (
              equipos.map((equipo) => (
                <tr key={equipo.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {equipo.activo}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {equipo.serial}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {equipo.marca}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {equipo.modelo}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {equipo.ubicacion || '-'}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoBadge(equipo.estado)}`}>
                      {equipo.estado}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(equipo)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => onDelete(equipo.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer con total */}
      {equipos.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Total de equipos: <span className="font-semibold">{equipos.length}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default EquiposTable
