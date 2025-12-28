import { useState, useEffect } from 'react'
import { validateNombre, validateDescripcion } from '../../../utils/validators'

const TipoEquipoModal = ({ tipo, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    if (tipo) {
      setFormData({
        nombre: tipo.nombre || '',
        descripcion: tipo.descripcion || '',
      })
    }
  }, [tipo])

  const validateField = (name, value) => {
    switch (name) {
      case 'nombre':
        return validateNombre(value)
      case 'descripcion':
        return validateDescripcion(value)
      default:
        return null
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Validate if field has been touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
    const error = validateField(name, value)
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const validateAllFields = () => {
    const newErrors = {}
    let isValid = true

    // Validate nombre (required)
    const nombreError = validateField('nombre', formData.nombre)
    if (nombreError) {
      newErrors.nombre = nombreError
      isValid = false
    }

    // Validate descripcion (optional)
    const descripcionError = validateField('descripcion', formData.descripcion)
    if (descripcionError) {
      newErrors.descripcion = descripcionError
      isValid = false
    }

    setErrors(newErrors)
    setTouched({ nombre: true, descripcion: true })
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateAllFields()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {tipo ? 'Editar Tipo de Equipo' : 'Nuevo Tipo de Equipo'}
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
          <div className="space-y-4">
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
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.nombre && touched.nombre ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: Computador, Monitor, Impresora"
              />
              {errors.nombre && touched.nombre && (
                <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.descripcion && touched.descripcion ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Descripción del tipo de equipo (opcional, máximo 500 caracteres)"
              />
              {errors.descripcion && touched.descripcion && (
                <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {tipo ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TipoEquipoModal
