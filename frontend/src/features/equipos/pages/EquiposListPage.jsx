import { useEquipos } from '../../../hooks/useEquipos'
import { useTableState } from '../../../hooks/useTableState'
import { useModalActions } from '../../../hooks/useModalActions'
import EquiposTable from '../components/EquiposTable'
import EquipoModal from '../components/EquipoModal'
import EquiposFilters from '../components/EquiposFilters'
import PageHeader from '../../../components/shared/PageHeader'
import SearchBar from '../../../components/shared/SearchBar'
import PaginationControls from '../../../components/shared/PaginationControls'
import ErrorAlert from '../../../components/shared/ErrorAlert'

const EquiposListPage = () => {
  const { equipos, pagination, loading, error, fetchEquipos, createEquipo, updateEquipo, deleteEquipo } = useEquipos()
  
  // Hook para manejar estado de tabla (búsqueda, filtros, paginación)
  const tableState = useTableState(fetchEquipos, pagination)
  
  // Hook para manejar acciones del modal (crear, editar, eliminar)
  const modalActions = useModalActions({
    createFunction: createEquipo,
    updateFunction: updateEquipo,
    deleteFunction: deleteEquipo,
    onSuccess: tableState.reloadCurrentPage,
    messages: {
      createSuccess: 'Equipo creado exitosamente',
      updateSuccess: 'Equipo actualizado exitosamente',
      deleteSuccess: 'Equipo eliminado exitosamente',
      deleteConfirm: '¿Estás seguro de eliminar este equipo?'
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Gestión de Equipos"
          description="Administra el inventario de equipos del sistema"
        />

        <EquiposFilters 
          onFilterChange={tableState.handleFilterChange}
          onClear={tableState.handleClearFilters}
        />

        <SearchBar
          searchTerm={tableState.searchTerm}
          onSearchChange={tableState.setSearchTerm}
          onSearch={tableState.handleSearch}
          onCreateNew={modalActions.handleCreate}
          placeholder="Buscar por activo, serial, marca, modelo o ubicación..."
          buttonText="Nuevo Equipo"
          buttonIcon="➕"
        />

        <ErrorAlert message={error} />

        <EquiposTable
          equipos={equipos}
          loading={loading}
          onEdit={modalActions.handleEdit}
          onDelete={modalActions.handleDelete}
        />

        {!loading && (
          <PaginationControls
            pagination={pagination}
            currentPage={tableState.currentPage}
            onPageChange={tableState.handlePageChange}
            itemsCount={equipos.length}
            itemName="equipos"
          />
        )}

        {modalActions.isModalOpen && (
          <EquipoModal
            equipo={modalActions.selectedItem}
            onClose={modalActions.closeModal}
            onSubmit={modalActions.handleSubmit}
          />
        )}
      </div>
    </div>
  )
}

export default EquiposListPage
