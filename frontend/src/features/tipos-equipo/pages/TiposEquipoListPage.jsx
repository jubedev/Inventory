import { useState } from 'react'
import { useTiposEquipo } from '../../../hooks/useTiposEquipo'
import TiposEquipoTable from '../components/TiposEquipoTable'
import TipoEquipoModal from '../components/TipoEquipoModal'

const TiposEquipoListPage = () => {
  const { tiposEquipo, loading, error, createTipo, updateTipo, deleteTipo } = useTiposEquipo()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTipo, setSelectedTipo] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar tipos por búsqueda
  const filteredTipos = tiposEquipo.filter((tipo) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      tipo.nombre?.toLowerCase().includes(searchLower) ||
      tipo.descripcion?.toLowerCase().includes(searchLower)
    )
  })

  const handleCreate = () => {
    setSelectedTipo(null)
    setIsModalOpen(true)
  }

  const handleEdit = (tipo) => {
    setSelectedTipo(tipo)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este tipo de equipo?')) {
      const result = await deleteTipo(id)
      if (result.success) {
        alert('Tipo eliminado exitosamente')
      } else {
        alert(`Error: ${result.error}`)
      }
    }
  }

  const handleSubmit = async (tipoData) => {
    let result
    if (selectedTipo) {
      result = await updateTipo(selectedTipo.id, tipoData)
    } else {
      result = await createTipo(tipoData)
    }

    if (result.success) {
      setIsModalOpen(false)
      alert(selectedTipo ? 'Tipo actualizado' : 'Tipo creado')
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
            Tipos de Equipo
          </h1>
          <p className="text-gray-600">
            Gestiona las categorías de equipos del inventario
          </p>
        </div>

        {/* Barra de acciones */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex-1 w-full md:w-auto">
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleCreate}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center justify-center gap-2"
          >
            <span className="text-xl">➕</span>
            Nuevo Tipo
          </button>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Tabla de tipos */}
        <TiposEquipoTable
          tipos={filteredTipos}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Modal */}
        {isModalOpen && (
          <TipoEquipoModal
            tipo={selectedTipo}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  )
}

export default TiposEquipoListPage
