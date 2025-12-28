const AccessRequestsTable = ({ solicitudes, loading, onApprove, onReject, onDelete, onViewDetail }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (solicitudes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 text-lg">No hay solicitudes con este filtro</p>
        </div>
      </div>
    )
  }

  const getEstadoBadge = (estado) => {
    const styles = {
      pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      aprobado: 'bg-green-100 text-green-800 border-green-300',
      rechazado: 'bg-red-100 text-red-800 border-red-300',
    }
    return styles[estado] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Solicitante
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Solicitud
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {solicitud.nombre_completo.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {solicitud.nombre_completo}
                      </div>
                      {solicitud.motivo_solicitud && (
                        <div className="text-xs text-gray-500 truncate max-w-xs">
                          {solicitud.motivo_solicitud.substring(0, 50)}...
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {solicitud.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(solicitud.fecha_solicitud)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getEstadoBadge(solicitud.estado)}`}>
                    {solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => onViewDetail(solicitud)}
                    className="text-blue-600 hover:text-blue-900 transition"
                    title="Ver Detalle"
                  >
                    👁️ Ver
                  </button>
                  {solicitud.estado === 'pendiente' && (
                    <>
                      <button
                        onClick={() => onApprove(solicitud)}
                        className="text-green-600 hover:text-green-900 transition"
                        title="Aprobar"
                      >
                        ✓ Aprobar
                      </button>
                      <button
                        onClick={() => onReject(solicitud.id)}
                        className="text-red-600 hover:text-red-900 transition"
                        title="Rechazar"
                      >
                        ✗ Rechazar
                      </button>
                    </>
                  )}
                  {solicitud.estado !== 'pendiente' && (
                    <button
                      onClick={() => onDelete(solicitud.id)}
                      className="text-gray-600 hover:text-gray-900 transition"
                      title="Eliminar"
                    >
                      🗑 Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AccessRequestsTable
