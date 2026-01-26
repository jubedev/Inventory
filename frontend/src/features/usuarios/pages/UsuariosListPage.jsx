import { useUsuarios } from '../../../hooks/useUsuarios'
import { useTableState } from '../../../hooks/useTableState'
import { useModalActions } from '../../../hooks/useModalActions'
import UsuariosTable from '../components/UsuariosTable'
import UsuarioModal from '../components/UsuarioModal'
import UsuariosFilter from '../components/UsuariosFilter'
import PageHeader from '../../../components/shared/PageHeader'
import SearchBar from '../../../components/shared/SearchBar'
import PaginationControls from '../../../components/shared/PaginationControls'
import ErrorAlert from '../../../components/shared/ErrorAlert'

const UsuariosListPage = () => {
  const { usuarios, pagination, loading, error, fetchUsuarios, createUsuario, updateUsuario, deleteUsuario } = useUsuarios()
  
  // Hook para manejar estado de tabla (búsqueda, filtros, paginación)
  const tableState = useTableState(fetchUsuarios, pagination)
  
  // Hook para manejar acciones del modal (crear, editar, eliminar)
  const modalActions = useModalActions({
    createFunction: createUsuario,
    updateFunction: updateUsuario,
    deleteFunction: deleteUsuario,
    onSuccess: tableState.reloadCurrentPage,
    messages: {
      createSuccess: 'Usuario creado exitosamente',
      updateSuccess: 'Usuario actualizado exitosamente',
      deleteSuccess: 'Usuario eliminado exitosamente',
      deleteConfirm: '¿Estás seguro de eliminar este usuario?'
    }
  })

  // Calcular estadísticas
  const activos = usuarios.filter((u) => u.estado === 'Activo').length
  const inactivos = usuarios.filter((u) => u.estado === 'Inactivo').length

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-[calc(100vw-20rem)] mx-auto">
        <PageHeader
          title="Usuarios Registrados"
          description="Administra los usuarios de la empresa"
        />

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Usuarios</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {pagination.total || usuarios.length}
                </p>
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
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {activos}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Usuarios Inactivos</p>
                <p className="text-3xl font-bold text-red-600 mt-1">
                  {inactivos}
                </p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚫</span>
              </div>
            </div>
          </div>
        </div>

        <UsuariosFilter 
          onFilterChange={tableState.handleFilterChange}
          onClear={tableState.handleClearFilters}
        />

        <SearchBar
          searchTerm={tableState.searchTerm}
          onSearchChange={tableState.setSearchTerm}
          onSearch={tableState.handleSearch}
          onCreateNew={modalActions.handleCreate}
          placeholder="Buscar por nombre, documento, correo o teléfono..."
          buttonText="Nuevo Usuario"
          buttonIcon="➕"
        />

        <ErrorAlert message={error} />

        <UsuariosTable
          usuarios={usuarios}
          loading={loading}
          onEdit={modalActions.handleEdit}
          onDelete={modalActions.handleDelete}
        />

        {!loading && (
          <PaginationControls
            pagination={pagination}
            currentPage={tableState.currentPage}
            onPageChange={tableState.handlePageChange}
            itemsCount={usuarios.length}
            itemName="usuarios"
          />
        )}

        {modalActions.isModalOpen && (
          <UsuarioModal
            usuario={modalActions.selectedItem}
            onClose={modalActions.closeModal}
            onSubmit={modalActions.handleSubmit}
          />
        )}
      </div>
    </div>
  )
}

export default UsuariosListPage;
