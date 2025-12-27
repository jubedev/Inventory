import { useState, useEffect } from 'react'

const EquipoModal = ({ equipo, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    marca: '',
    modelo: '',
    numero_serie: '',
    estado: 'disponible',
    tipo_equipo_id: '',
  })

  useEffect(() => {
    if (equipo) {
      setFormData({
        codigo: equipo.codigo || '',
        nombre: equipo.nombre || '',
        descripcion: equipo.descripcion || '',
        marca: equipo.marca || '',
        modelo: equipo.modelo || '',
        numero_serie: equipo.numero_serie || '',
        estado: equipo.estado || 'disponible',
        tipo_equipo_id: equipo.tipo_equipo_id || '',
      })
    }
  }, [equipo])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {equipo ? 'Editar Equipo' : 'Nuevo Equipo'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Código */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código *
              </label>
              <input
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="EQ-001"
              />
            </div>

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Laptop Dell Latitude"
              />
            </div>

            {/* Marca */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marca
              </label>
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Dell"
              />
            </div>

            {/* Modelo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modelo
              </label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Latitude 5420"
              />
            </div>

            {/* Número de Serie */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Serie
              </label>
              <input
                type="text"
                name="numero_serie"
                value={formData.numero_serie}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="SN123456789"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado *
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="disponible">Disponible</option>
                <option value="en uso">En Uso</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="fuera de servicio">Fuera de Servicio</option>
              </select>
            </div>

            {/* Descripción - Full width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detalles adicionales del equipo..."
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
            >
              {equipo ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EquipoModal
