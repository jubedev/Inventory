import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../../../services/api'

const UsuarioModal = ({ usuario, onClose, onSubmit }) => {
  const [areas, setAreas] = useState([])
  const [cargos, setCargos] = useState([])
  const [razonesSociales, setRazonesSociales] = useState([])
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    numero_documento: '',
    email: '',
    telefono: '',
    telefono_corporativo: '',
    ciudad: '',
    area_id: '',
    cargo_id: '',
    razon_social_id: '',
    estado: 'Activo',
  })
  
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Cargar datos para los select
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        console.log('Cargando datos desde API...')
        
        const [areasRes, cargosRes, razonesRes] = await Promise.all([
          api.get('/areas'),
          api.get('/cargos'),
          api.get('/razones-sociales')
        ])
        
        console.log('Respuesta áreas:', areasRes.data)
        console.log('Respuesta cargos:', cargosRes.data)
        console.log('Respuesta razones sociales:', razonesRes.data)
        
        const areasData = areasRes.data.data || areasRes.data
        const cargosData = cargosRes.data.data || cargosRes.data
        const razonesData = razonesRes.data.data || razonesRes.data
        
        console.log('Áreas procesadas:', areasData)
        console.log('Cargos procesados:', cargosData)
        console.log('Razones sociales procesadas:', razonesData)
        
        setAreas(Array.isArray(areasData) ? areasData : [])
        setCargos(Array.isArray(cargosData) ? cargosData : [])
        setRazonesSociales(Array.isArray(razonesData) ? razonesData : [])
        
        console.log('Estados actualizados')
      } catch (err) {
        console.error('Error al cargar datos:', err)
        console.error('Error details:', err.response)
        setAreas([])
        setCargos([])
        setRazonesSociales([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Log para depuración de estados
  useEffect(() => {
    console.log('Estado actual - Áreas:', areas.length, areas)
    console.log('Estado actual - Cargos:', cargos.length, cargos)
    console.log('Estado actual - Razones Sociales:', razonesSociales.length, razonesSociales)
  }, [areas, cargos, razonesSociales])

  // Cargar datos del usuario si estamos editando
  useEffect(() => {
    if (usuario) {
      setFormData({
        nombres: usuario.nombres || '',
        apellidos: usuario.apellidos || '',
        numero_documento: usuario.numero_documento || '',
        email: usuario.email || '',
        telefono: usuario.telefono || '',
        telefono_corporativo: usuario.telefono_corporativo || '',
        ciudad: usuario.ciudad || '',
        area_id: usuario.area_id || '',
        cargo_id: usuario.cargo_id || '',
        razon_social_id: usuario.razon_social_id || '',
        estado: usuario.estado || 'Activo',
      })
    }
  }, [usuario])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    
    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      validateField(name, value)
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    validateField(name, value)
  }

  const validateField = (name, value) => {
    let error = null
    
    switch (name) {
      case 'nombres':
        if (!value) error = 'El nombre es obligatorio'
        else if (value.length < 2) error = 'El nombre debe tener al menos 2 caracteres'
        else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) 
          error = 'El nombre solo puede contener letras'
        break
      case 'apellidos':
        if (!value) error = 'Los apellidos son obligatorios'
        else if (value.length < 2) error = 'Los apellidos deben tener al menos 2 caracteres'
        else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) 
          error = 'Los apellidos solo pueden contener letras'
        break
      case 'numero_documento':
        if (!value) error = 'El número de documento es obligatorio'
        else if (!/^\d{7,15}$/.test(value)) 
          error = 'Debe ser un número entre 7 y 15 dígitos'
        break
      case 'email':
        if (!value) error = 'El correo es obligatorio'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) 
          error = 'Debe ser un correo válido'
        break
      case 'telefono':
        if (value && !/^\d{7,15}$/.test(value)) 
          error = 'Debe ser un número entre 7 y 15 dígitos'
        break
      case 'telefono_corporativo':
        if (value && !/^\d{7,15}$/.test(value)) 
          error = 'Debe ser un número entre 7 y 15 dígitos'
        break
      case 'area_id':
        if (!value) error = 'El área es obligatoria'
        break
      case 'cargo_id':
        if (!value) error = 'El cargo es obligatorio'
        break
      case 'razon_social_id':
        if (!value) error = 'La razón social es obligatoria'
        break
      default:
        break
    }
    
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
    
    return error
  }

  const validateAllFields = () => {
    const fieldsToValidate = [
      'nombres', 'apellidos', 'numero_documento', 'email',
      'telefono', 'telefono_corporativo', 'area_id', 'cargo_id', 'razon_social_id'
    ]
    
    const newErrors = {}
    const newTouched = {}
    
    fieldsToValidate.forEach(field => {
      newTouched[field] = true
      const error = validateField(field, formData[field])
      if (error) newErrors[field] = error
    })
    
    setErrors(newErrors)
    setTouched(newTouched)
    
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateAllFields()) {
      onSubmit(formData)
    } else {
      const erroresTexto = Object.entries(errors)
        .filter(([, error]) => error)
        .map(([campo, error]) => `${campo}: ${error}`)
        .join('\n')
      
      alert(`Por favor corrige los siguientes errores:\n\n${erroresTexto}`)
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {usuario ? 'Editar Usuario' : 'Nuevo Usuario'}
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
            {/* Nombres */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombres *
              </label>
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.nombres && touched.nombres ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Juan Carlos"
              />
              {errors.nombres && touched.nombres && (
                <p className="text-red-500 text-xs mt-1">{errors.nombres}</p>
              )}
            </div>

            {/* Apellidos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apellidos *
              </label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.apellidos && touched.apellidos ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Pérez García"
              />
              {errors.apellidos && touched.apellidos && (
                <p className="text-red-500 text-xs mt-1">{errors.apellidos}</p>
              )}
            </div>

            {/* Número de Documento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Documento *
              </label>
              <input
                type="text"
                name="numero_documento"
                value={formData.numero_documento}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.numero_documento && touched.numero_documento ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="1234567890"
              />
              {errors.numero_documento && touched.numero_documento && (
                <p className="text-red-500 text-xs mt-1">{errors.numero_documento}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="usuario@empresa.com"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.telefono && touched.telefono ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="3001234567"
              />
              {errors.telefono && touched.telefono && (
                <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
              )}
            </div>

            {/* Teléfono Corporativo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono Corporativo
              </label>
              <input
                type="text"
                name="telefono_corporativo"
                value={formData.telefono_corporativo}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.telefono_corporativo && touched.telefono_corporativo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="6011234567"
              />
              {errors.telefono_corporativo && touched.telefono_corporativo && (
                <p className="text-red-500 text-xs mt-1">{errors.telefono_corporativo}</p>
              )}
            </div>

            {/* Ciudad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad
              </label>
              <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Bogotá"
              />
            </div>

            {/* Área */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Área *
              </label>
              <select
                name="area_id"
                value={formData.area_id}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={loading}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.area_id && touched.area_id ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccione un área</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.nombre}
                  </option>
                ))}
              </select>
              {errors.area_id && touched.area_id && (
                <p className="text-red-500 text-xs mt-1">{errors.area_id}</p>
              )}
            </div>

            {/* Cargo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cargo *
              </label>
              <select
                name="cargo_id"
                value={formData.cargo_id}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={loading}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.cargo_id && touched.cargo_id ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccione un cargo</option>
                {cargos.map((cargo) => (
                  <option key={cargo.id} value={cargo.id}>
                    {cargo.nombre}
                  </option>
                ))}
              </select>
              {errors.cargo_id && touched.cargo_id && (
                <p className="text-red-500 text-xs mt-1">{errors.cargo_id}</p>
              )}
            </div>

            {/* Razón Social */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Razón Social *
              </label>
              <select
                name="razon_social_id"
                value={formData.razon_social_id}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={loading}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.razon_social_id && touched.razon_social_id ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccione una razón social</option>
                {razonesSociales.map((razon) => (
                  <option key={razon.id} value={razon.id}>
                    {razon.nombre}
                  </option>
                ))}
              </select>
              {errors.razon_social_id && touched.razon_social_id && (
                <p className="text-red-500 text-xs mt-1">{errors.razon_social_id}</p>
              )}
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
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
                <option value="Suspendido">Suspendido</option>
              </select>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Guardando...' : usuario ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

UsuarioModal.propTypes = {
  usuario: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default UsuarioModal
