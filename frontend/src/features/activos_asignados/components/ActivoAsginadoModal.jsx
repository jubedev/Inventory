import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../../../services/api'

const ActivoAsignadoModal = ({ activoAsignado, onClose, onSubmit }) => {
  const [usuarios, setUsuarios] = useState([])
  const [equipos, setEquipos] = useState([])
  const [actas, setActas] = useState([])
  const [loading, setLoading] = useState(false)
  
  // Obtener fecha actual en formato YYYY-MM-DD
  const getFechaActual = () => {
    const hoy = new Date()
    const year = hoy.getFullYear()
    const month = String(hoy.getMonth() + 1).padStart(2, '0')
    const day = String(hoy.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  
  const [formData, setFormData] = useState({
    usuario_id: '',
    equipo_id: '',
    acta_id: '',
    fecha_asignacion: getFechaActual(),
    fecha_devolucion: '',
    ubicacion_destino: '',
    estado: 'asignado',
    observaciones: '',
  })
  
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Cargar datos para los select
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [usuariosRes, equiposRes, actasRes] = await Promise.all([
          api.get('/usuarios'),
          api.get('/equipos'),
          api.get('/actas')
        ])
        const usuariosData = usuariosRes.data.data || usuariosRes.data
        const equiposData = equiposRes.data.data || equiposRes.data
        const actasData = actasRes.data.data || actasRes.data
        setUsuarios(Array.isArray(usuariosData) ? usuariosData : [])
        setEquipos(Array.isArray(equiposData) ? equiposData : [])
        setActas(Array.isArray(actasData) ? actasData : [])
      } catch (err) {
        console.error('Error al cargar datos:', err)
        setUsuarios([])
        setEquipos([])
        setActas([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Cargar datos del activo asignado si estamos editando
  useEffect(() => {
    if (activoAsignado) {
      setFormData({
        usuario_id: activoAsignado.usuario_id || '',
        equipo_id: activoAsignado.equipo_id || '',
        acta_id: activoAsignado.acta_id || '',
        fecha_asignacion: activoAsignado.fecha_asignacion?.split('T')[0] || '',
        fecha_devolucion: activoAsignado.fecha_devolucion?.split('T')[0] || '',
        ubicacion_destino: activoAsignado.ubicacion_destino || '',
        estado: activoAsignado.estado || 'asignado',
        observaciones: activoAsignado.observaciones || '',
      })
    }
  }, [activoAsignado])

  const handleChange = async (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    
    // Si se selecciona un usuario, cargar su acta automáticamente
    if (name === 'usuario_id' && value) {
      try {
        const response = await api.get(`/actas?usuario_id=${value}`)
        const actasUsuario = response.data.data || response.data
        if (Array.isArray(actasUsuario) && actasUsuario.length > 0) {
          // Tomar la primera acta del usuario (o la más reciente si hay varias)
          setFormData((prev) => ({
            ...prev,
            usuario_id: value,
            acta_id: actasUsuario[0].id
          }))
        } else {
          alert('Este usuario no tiene un acta asignada. Por favor, crea un acta primero.')
          setFormData((prev) => ({
            ...prev,
            usuario_id: '',
            acta_id: ''
          }))
        }
      } catch (err) {
        console.error('Error al cargar acta del usuario:', err)
        alert('Error al cargar el acta del usuario')
      }
    }
    
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
      case 'usuario_id':
        if (!value) error = 'El usuario es obligatorio'
        break
      case 'equipo_id':
        if (!value) error = 'El equipo es obligatorio'
        break
      case 'acta_id':
        if (!value) error = 'El acta es obligatoria'
        break
      case 'fecha_asignacion':
        if (!value) error = 'La fecha de asignación es obligatoria'
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
    const fieldsToValidate = ['usuario_id', 'equipo_id', 'acta_id', 'fecha_asignacion']
    
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
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {activoAsignado ? 'Editar Asignación' : 'Nueva Asignación'}
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
            {/* Usuario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario *
              </label>
              <select
                name="usuario_id"
                value={formData.usuario_id}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={loading}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.usuario_id && touched.usuario_id ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccione un usuario</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombres} {usuario.apellidos} - {usuario.numero_documento}
                  </option>
                ))}
              </select>
              {errors.usuario_id && touched.usuario_id && (
                <p className="text-red-500 text-xs mt-1">{errors.usuario_id}</p>
              )}
            </div>

            {/* Equipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipo *
              </label>
              <select
                name="equipo_id"
                value={formData.equipo_id}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={loading}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.equipo_id && touched.equipo_id ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccione un equipo</option>
                {equipos.map((equipo) => (
                  <option key={equipo.id} value={equipo.id}>
                    {equipo.activo} - {equipo.marca} {equipo.modelo}
                  </option>
                ))}
              </select>
              {errors.equipo_id && touched.equipo_id && (
                <p className="text-red-500 text-xs mt-1">{errors.equipo_id}</p>
              )}
            </div>

            {/* Acta (automático, solo lectura) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Acta *
              </label>
              <div className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg text-gray-700">
                {formData.acta_id ? (
                  actas.find(a => a.id === parseInt(formData.acta_id))?.numero_acta || 'Acta asignada'
                ) : (
                  <span className="text-gray-400">Selecciona un usuario primero</span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Se asigna automáticamente al seleccionar el usuario</p>
            </div>

            {/* Fecha de Asignación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Asignación *
              </label>
              <input
                type="date"
                name="fecha_asignacion"
                value={formData.fecha_asignacion}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.fecha_asignacion && touched.fecha_asignacion ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fecha_asignacion && touched.fecha_asignacion && (
                <p className="text-red-500 text-xs mt-1">{errors.fecha_asignacion}</p>
              )}
            </div>

            {/* Ubicación Destino */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación Destino
              </label>
              <input
                type="text"
                name="ubicacion_destino"
                value={formData.ubicacion_destino}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ej: Oficina 201, Bodega A, etc."
                maxLength={255}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Lugar donde se encuentra el equipo asignado</p>
            </div>

            {/* Fecha de Devolución (solo mostrar en edición si existe) */}
            {activoAsignado && formData.fecha_devolucion && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Devolución
                </label>
                <input
                  type="date"
                  name="fecha_devolucion"
                  value={formData.fecha_devolucion}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg text-gray-700"
                />
                <p className="text-xs text-gray-500 mt-1">Se registra automáticamente cuando se devuelve</p>
              </div>
            )}

            {/* Estado - Solo lectura en creación, siempre asignado */}
            {!activoAsignado && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <div className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg text-gray-700">
                  Asignado
                </div>
                <p className="text-xs text-gray-500 mt-1">Los equipos se crean siempre como asignados</p>
              </div>
            )}

            {/* Estado en edición - solo mostrar si está devuelto */}
            {activoAsignado && formData.estado === 'devuelto' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <div className="w-full px-4 py-2 border border-gray-300 bg-blue-50 rounded-lg text-blue-700 font-medium">
                  ✓ Devuelto
                </div>
              </div>
            )}

            {/* Observaciones */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observaciones
              </label>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Notas adicionales sobre la asignación..."
              />
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
              {loading ? 'Guardando...' : activoAsignado ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

ActivoAsignadoModal.propTypes = {
  activoAsignado: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ActivoAsignadoModal
