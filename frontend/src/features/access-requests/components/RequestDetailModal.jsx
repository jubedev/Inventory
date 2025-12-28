const RequestDetailModal = ({ solicitud, onClose }) => {
  if (!solicitud) return null

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getEstadoColor = (estado) => {
    const colors = {
      pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      aprobado: 'bg-green-100 text-green-800 border-green-300',
      rechazado: 'bg-red-100 text-red-800 border-red-300',
    }
    return colors[estado] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Detalle de Solicitud</h2>
              <p className="text-blue-100 text-sm mt-1">ID: #{solicitud.id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition p-2 hover:bg-white/10 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Estado */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">Estado de la Solicitud</span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getEstadoColor(solicitud.estado)}`}>
              {solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)}
            </span>
          </div>

          {/* Información del Solicitante */}
          <div className="border border-gray-200 rounded-lg p-5 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              📋 Información del Solicitante
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 block mb-1">Nombre Completo</label>
                <p className="text-gray-900 font-medium">{solicitud.nombre_completo}</p>
              </div>
              
              <div>
                <label className="text-sm text-gray-500 block mb-1">Correo Electrónico</label>
                <p className="text-gray-900 font-medium">{solicitud.email}</p>
              </div>
            </div>

            {solicitud.motivo_solicitud && (
              <div>
                <label className="text-sm text-gray-500 block mb-1">Detalles de la Solicitud</label>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{solicitud.motivo_solicitud}</p>
                </div>
              </div>
            )}
          </div>

          {/* Fechas */}
          <div className="border border-gray-200 rounded-lg p-5 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              📅 Registro de Fechas
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fecha de Solicitud:</span>
                <span className="text-gray-900 font-medium">{formatDate(solicitud.fecha_solicitud)}</span>
              </div>
              
              {solicitud.fecha_revision && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fecha de Revisión:</span>
                  <span className="text-gray-900 font-medium">{formatDate(solicitud.fecha_revision)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Revisor */}
          {solicitud.revisor && (
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">
                👤 Revisado Por
              </h3>
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">
                    {solicitud.revisor.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">{solicitud.revisor.email}</p>
                  <p className="text-sm text-gray-500">Administrador</p>
                </div>
              </div>
            </div>
          )}

          {/* Botón Cerrar */}
          <div className="pt-4">
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestDetailModal
