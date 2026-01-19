import { useState } from 'react'
import { useEquipos } from '../../../hooks/useEquipos'
import EquiposTable from '../components/EquiposTable'
import EquipoModal from '../components/EquipoModal'
import EquiposFilters from '../components/EquiposFilters'

const EquiposListPage = () => {
  const { equipos, pagination, loading, error, fetchEquipos, createEquipo, updateEquipo, deleteEquipo } = useEquipos()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEquipo, setSelectedEquipo] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})

  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    fetchEquipos(newPage, pagination.per_page, { ...filters, search: searchTerm })
  }

  // Manejar búsqueda
  const handleSearch = () => {
    setCurrentPage(1)
    fetchEquipos(1, pagination.per_page, { ...filters, search: searchTerm })
  }

  // Manejar cambio de filtros
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    fetchEquipos(1, pagination.per_page, { ...newFilters, search: searchTerm })
  }

  // Limpiar filtros
  const handleClearFilters = () => {
    setFilters({})
    setCurrentPage(1)
    fetchEquipos(1, pagination.per_page, { search: searchTerm })
  }

  const handleCreate = () => {
    setSelectedEquipo(null)
    setIsModalOpen(true)
  }

  const handleEdit = (equipo) => {
    setSelectedEquipo(equipo)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este equipo?')) {
      const result = await deleteEquipo(id)
      if (result.success) {
        alert('Equipo eliminado exitosamente')
        fetchEquipos(currentPage, pagination.per_page, { ...filters, search: searchTerm })
      } else {
        alert(`Error: ${result.error}`)
      }
    }
  }

  const handleSubmit = async (equipoData) => {
    console.log('EquiposListPage: handleSubmit llamado con', equipoData)
    console.log('EquiposListPage: selectedEquipo', selectedEquipo)
    
    let result
    if (selectedEquipo) {
      console.log('EquiposListPage: Actualizando equipo', selectedEquipo.id)
      result = await updateEquipo(selectedEquipo.id, equipoData)
    } else {
      console.log('EquiposListPage: Creando nuevo equipo')
      result = await createEquipo(equipoData)
    }

    console.log('EquiposListPage: Resultado', result)

    if (result.success) {
      setIsModalOpen(false)
      alert(selectedEquipo ? 'Equipo actualizado' : 'Equipo creado')
      fetchEquipos(currentPage, pagination.per_page, { ...filters, search: searchTerm })
    } else {
      alert(`Error: ${result.error}`)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Gestión de Equipos
          </h1>
          <p className="text-gray-600">
            Administra el inventario de equipos del sistema
          </p>
        </div>

        {/* Filtros */}
        <EquiposFilters 
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
        />

        {/* Barra de búsqueda y acciones */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex-1 w-full md:w-auto flex gap-2">
            <input
              type="text"
              placeholder="Buscar por activo, serial, marca, modelo o ubicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
            >
              Buscar
            </button>
          </div>
          <button
            onClick={handleCreate}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center justify-center gap-2"
          >
            <span className="text-xl">➕</span>
            Nuevo Equipo
          </button>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Tabla de equipos */}
        <EquiposTable
          equipos={equipos}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Controles de paginación */}
        {!loading && pagination.total > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4 mt-6 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="text-sm text-gray-600">
              Mostrando {equipos.length} de {pagination.total} equipos
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                ← Anterior
              </button>
              
              <div className="flex gap-1">
                {[...Array(pagination.last_page)].map((_, i) => {
                  const page = i + 1
                  // Mostrar solo páginas cercanas a la actual
                  if (
                    page === 1 ||
                    page === pagination.last_page ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 border rounded-lg transition-all ${
                          currentPage === page
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  } else if (
                    page === currentPage - 3 ||
                    page === currentPage + 3
                  ) {
                    return <span key={page} className="px-2 py-2">...</span>
                  }
                  return null
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.last_page}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <EquipoModal
            equipo={selectedEquipo}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  )
}

export default EquiposListPage
