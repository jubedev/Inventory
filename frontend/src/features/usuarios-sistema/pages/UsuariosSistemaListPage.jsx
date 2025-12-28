import { useState } from 'react'
import { useUsuariosSistema } from '../../../hooks/useUsuariosSistema'
import { useAppContext } from '../../../hooks/useAppContext'
import UsuariosSistemaTable from '../components/UsuariosSistemaTable'

const UsuariosSistemaListPage = () => {
  const { usuarios, loading, revokeAccess, restoreAccess } = useUsuariosSistema()
  const { user } = useAppContext()
  const [selectedUser, setSelectedUser] = useState(null)
  const [showRevokeModal, setShowRevokeModal] = useState(false)
  const [showRestoreModal, setShowRestoreModal] = useState(false)

  const handleRevoke = (usuario) => {
    setSelectedUser(usuario)
    setShowRevokeModal(true)
  }

  const confirmRevoke = async () => {
    const result = await revokeAccess(selectedUser.id)
    if (result.success) {
      setShowRevokeModal(false)
      setSelectedUser(null)
    }
  }

  const handleRestore = (usuario) => {
    setSelectedUser(usuario)
    setShowRestoreModal(true)
  }

  const confirmRestore = async () => {
    const result = await restoreAccess(selectedUser.id)
    if (result.success) {
      setShowRestoreModal(false)
      setSelectedUser(null)
    }
  }

  const activos = usuarios.filter(u => u.estado === 'activo').length
  const revocados = usuarios.filter(u => u.estado === 'revocado').length

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usuarios del Sistema</h1>
          <p className="text-gray-600 mt-2">
            Gestiona los usuarios con acceso al sistema de inventario
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Usuarios</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{usuarios.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Usuarios Activos</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{activos}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Accesos Revocados</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{revocados}</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚫</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <UsuariosSistemaTable
          usuarios={usuarios}
          loading={loading}
          currentUser={user}
          onRevoke={handleRevoke}
          onRestore={handleRestore}
        />
      </div>

      {/* Revoke Modal */}
      {showRevokeModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Revocar Acceso
              </h3>
              <p className="text-gray-600 mb-4">
                ¿Estás seguro de revocar el acceso a:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="font-semibold text-gray-900">{selectedUser.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  El usuario no podrá iniciar sesión hasta que se restaure el acceso
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowRevokeModal(false)}
                className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmRevoke}
                className="flex-1 py-2.5 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
              >
                Revocar Acceso
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restore Modal */}
      {showRestoreModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Restaurar Acceso
              </h3>
              <p className="text-gray-600 mb-4">
                ¿Deseas restaurar el acceso a:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="font-semibold text-gray-900">{selectedUser.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  El usuario podrá iniciar sesión nuevamente
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowRestoreModal(false)}
                className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmRestore}
                className="flex-1 py-2.5 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              >
                Restaurar Acceso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsuariosSistemaListPage
