import { useActivosAsignados } from '../../../hooks/useActivosAsignados'
import { useTableState } from '../../../hooks/useTableState'
import { useModalActions } from '../../../hooks/useModalActions'
import ActivosAsignadosTable from '../components/ActivosAsignadosTable'
import ActivoAsignadoModal from '../components/ActivoAsginadoModal'
import ActivoAsignadoFilters from '../components/ActivoAsignadoFilters'
import PageHeader from '../../../components/shared/PageHeader'
import SearchBar from '../../../components/shared/SearchBar'
import PaginationControls from '../../../components/shared/PaginationControls'
import ErrorAlert from '../../../components/shared/ErrorAlert'

const ActivosAsignadosListPage = () => {
  const { activosAsignados, pagination, loading, error, fetchActivosAsignados, createActivoAsignado, updateActivoAsignado, deleteActivoAsignado, marcarDevolucion } = useActivosAsignados()
  
  // Hook para manejar estado de tabla (búsqueda, filtros, paginación)
  const tableState = useTableState(fetchActivosAsignados, pagination)
  
  // Hook para manejar acciones del modal (crear, editar, eliminar)
  const modalActions = useModalActions({
    createFunction: createActivoAsignado,
    updateFunction: updateActivoAsignado,
    deleteFunction: deleteActivoAsignado,
    onSuccess: tableState.reloadCurrentPage,
    messages: {
      createSuccess: 'Activo asignado exitosamente',
      updateSuccess: 'Asignación actualizada exitosamente',
      deleteSuccess: 'Asignación eliminada exitosamente',
      deleteConfirm: '¿Estás seguro de eliminar esta asignación?'
    }
  })

  // Manejar devolución de equipo
  const handleMarcarDevolucion = async (id) => {
    if (window.confirm('¿Estás seguro de marcar este equipo como devuelto?')) {
      const result = await marcarDevolucion(id)
      if (result.success) {
        alert('Equipo marcado como devuelto exitosamente')
        tableState.reloadCurrentPage()
      } else {
        alert(result.error || 'Error al marcar como devuelto')
      }
    }
  }

  // Calcular estadísticas
  const asignados = activosAsignados.filter((a) => a.estado === 'asignado').length
  const devueltos = activosAsignados.filter((a) => a.estado === 'devuelto').length

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-[calc(100vw-20rem)] mx-auto">
        <PageHeader
          title="Gestión de Activos Asignados"
          description="Administra las asignaciones de equipos a usuarios"
        />

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Asignaciones</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {pagination.total || activosAsignados.length}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Asignados</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {asignados}
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
                <p className="text-gray-500 text-sm">Devueltos</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {devueltos}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>
        </div>

        <ActivoAsignadoFilters 
          onFilterChange={tableState.handleFilterChange}
          onClear={tableState.handleClearFilters}
        />

        <SearchBar
          searchTerm={tableState.searchTerm}
          onSearchChange={tableState.setSearchTerm}
          onSearch={tableState.handleSearch}
          onCreateNew={modalActions.handleCreate}
          placeholder="Buscar por equipo, usuario, correo o número de documento..."
          buttonText="Nueva Asignación"
          buttonIcon="➕"
        />

        <ErrorAlert message={error} />

        <ActivosAsignadosTable
          activos={activosAsignados}
          loading={loading}
          onEdit={modalActions.handleEdit}
          onDelete={modalActions.handleDelete}
          onMarcarDevolucion={handleMarcarDevolucion}
        />

        {!loading && (
          <PaginationControls
            pagination={pagination}
            currentPage={tableState.currentPage}
            onPageChange={tableState.handlePageChange}
            itemsCount={activosAsignados.length}
            itemName="asignaciones"
          />
        )}

        {modalActions.isModalOpen && (
          <ActivoAsignadoModal
            activoAsignado={modalActions.selectedItem}
            onClose={modalActions.closeModal}
            onSubmit={modalActions.handleSubmit}
          />
        )}
      </div>
    </div>
  )
}

export default ActivosAsignadosListPage;
