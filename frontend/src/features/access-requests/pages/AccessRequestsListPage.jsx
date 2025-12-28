import { useState } from 'react'
import { useAccessRequests } from '../../../hooks/useAccessRequests'
import AccessRequestsTable from '../components/AccessRequestsTable'
import ApproveModal from '../components/ApproveModal'
import RequestDetailModal from '../components/RequestDetailModal'

const AccessRequestsListPage = () => {
  const { solicitudes, loading, approveSolicitud, rejectSolicitud, deleteSolicitud, fetchSolicitudes } = useAccessRequests()
  const [filter, setFilter] = useState('pendiente')
  const [selectedSolicitud, setSelectedSolicitud] = useState(null)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const filteredSolicitudes = solicitudes.filter(s => 
    filter === 'todas' ? true : s.estado === filter
  )

  const handleApprove = (solicitud) => {
    setSelectedSolicitud(solicitud)
    setShowApproveModal(true)
  }

  const handleApproveConfirm = async (password, rol_id) => {
    const result = await approveSolicitud(selectedSolicitud.id, password, rol_id)
    if (result.success) {
      setShowApproveModal(false)
      setSelectedSolicitud(null)
    }
    return result
  }

  const handleReject = async (id) => {
    if (window.confirm('¿Estás seguro de rechazar esta solicitud?')) {
      await rejectSolicitud(id)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta solicitud?')) {
      await deleteSolicitud(id)
    }
  }

  const handleViewDetail = (solicitud) => {
    setSelectedSolicitud(solicitud)
    setShowDetailModal(true)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Solicitudes de Acceso
          </h1>
          <p className="text-gray-600">
            Gestiona las solicitudes de usuarios que desean acceder al sistema
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('pendiente')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'pendiente'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setFilter('aprobado')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'aprobado'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Aprobadas
            </button>
            <button
              onClick={() => setFilter('rechazado')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'rechazado'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Rechazadas
            </button>
            <button
              onClick={() => setFilter('todas')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'todas'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => fetchSolicitudes()}
              className="ml-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              ↻ Actualizar
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-600 text-sm">Total</p>
            <p className="text-2xl font-bold text-gray-900">{solicitudes.length}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
            <p className="text-yellow-700 text-sm">Pendientes</p>
            <p className="text-2xl font-bold text-yellow-600">
              {solicitudes.filter(s => s.estado === 'pendiente').length}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow-sm">
            <p className="text-green-700 text-sm">Aprobadas</p>
            <p className="text-2xl font-bold text-green-600">
              {solicitudes.filter(s => s.estado === 'aprobado').length}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg shadow-sm">
            <p className="text-red-700 text-sm">Rechazadas</p>
            <p className="text-2xl font-bold text-red-600">
              {solicitudes.filter(s => s.estado === 'rechazado').length}
            </p>
          </div>
        </div>

        {/* Tabla */}
        <AccessRequestsTable
          solicitudes={filteredSolicitudes}
          loading={loading}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
          onViewDetail={handleViewDetail}
        />

        {/* Modal de Aprobación */}
        {showApproveModal && (
          <ApproveModal
            solicitud={selectedSolicitud}
            onConfirm={handleApproveConfirm}
            onCancel={() => {
              setShowApproveModal(false)
              setSelectedSolicitud(null)
            }}
          />
        )}

        {/* Modal de Detalle */}
        {showDetailModal && (
          <RequestDetailModal
            solicitud={selectedSolicitud}
            onClose={() => {
              setShowDetailModal(false)
              setSelectedSolicitud(null)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default AccessRequestsListPage
