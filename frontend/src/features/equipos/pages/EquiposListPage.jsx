import { useState } from 'react'
import { useEquipos } from '../../../hooks/useEquipos'
import EquiposTable from '../components/EquiposTable'
import EquipoModal from '../components/EquipoModal'

const EquiposListPage = () => {
  const { equipos, loading, error, createEquipo, updateEquipo, deleteEquipo } = useEquipos()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEquipo, setSelectedEquipo] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar equipos por búsqueda
  const filteredEquipos = equipos.filter((equipo) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      equipo.activo?.toLowerCase().includes(searchLower) ||
      equipo.serial?.toLowerCase().includes(searchLower) ||
      equipo.marca?.toLowerCase().includes(searchLower) ||
      equipo.modelo?.toLowerCase().includes(searchLower) ||
      equipo.ubicacion?.toLowerCase().includes(searchLower)
    )
  })

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

        {/* Barra de acciones */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex-1 w-full md:w-auto">
            <input
              type="text"
              placeholder="Buscar por activo, serial, marca, modelo o ubicación..."
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
            Nuevo Equipo
          </button>
        </div>

        {/* Tabla de equipos */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <EquiposTable
          equipos={filteredEquipos}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

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
