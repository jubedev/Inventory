import PropTypes from "prop-types";

const ActivosAsignadosTable = ({ activos, loading, onEdit, onDelete, onMarcarDevolucion }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (activos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="w-16 h-16 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-500 text-lg">No hay activos asignados</p>
        </div>
      </div>
    );
  }

  const getEstadoBadge = (estado) => {
    const badges = {
        asignado: "bg-green-100 text-green-800",
        devuelto: "bg-blue-100 text-blue-800",
        mantenimiento: "bg-yellow-100 text-yellow-800",
        dado_de_baja: "bg-red-100 text-red-800",
    };
    return badges[estado?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Equipo
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Serial
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Usuario
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Correo
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Fecha Asignación
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Fecha Devolución
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Estado
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Acta
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {activos.map((activo) => (
              <tr
                key={activo.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {activo.equipo?.marca} {activo.equipo?.modelo}
                  <div className="text-xs text-gray-500">
                    {activo.equipo?.activo}
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {activo.equipo?.serial || 'N/A'}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {activo.usuario?.nombres} {activo.usuario?.apellidos}
                  <div className="text-xs text-gray-500">
                    {activo.usuario?.numero_documento}
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {activo.usuario?.email || 'N/A'}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {activo.fecha_asignacion 
                    ? activo.fecha_asignacion.split('T')[0].split('-').reverse().join('/')
                    : 'N/A'
                  }
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {activo.fecha_devolucion 
                    ? activo.fecha_devolucion.split('T')[0].split('-').reverse().join('/')
                    : '-'
                  }
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoBadge(activo.estado)}`}
                  >
                    {activo.estado || 'N/A'}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {activo.acta?.numero_acta || 'Sin acta'}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    {activo.estado === 'asignado' && (
                      <button
                        onClick={() => onMarcarDevolucion(activo.id)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all"
                        title="Marcar como devuelto"
                      >
                        📦 Devolver
                      </button>
                    )}
                    <button
                      onClick={() => onEdit(activo)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(activo.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {activos.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Mostrando <span className="font-semibold">{activos.length}</span> activo(s) asignado(s)
          </p>
        </div>
      )}
    </div>
  );
};

ActivosAsignadosTable.propTypes = {
  activos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMarcarDevolucion: PropTypes.func.isRequired,
};

export default ActivosAsignadosTable;
