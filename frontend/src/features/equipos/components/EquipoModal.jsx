import { useState, useEffect } from 'react'
import { useTiposEquipo } from '../../../hooks/useTiposEquipo'
import {
  validateActivo,
  validateSerial,
  validateMarca,
  validateModelo,
  validateEstado,
  validateIP,
  validateMAC,
  validateCosto,
  validateFechaCompra,
  validateTipoEquipo,
} from '../../../utils/validators'

const EquipoModal = ({ equipo, onClose, onSubmit }) => {
  const { tiposEquipo, loading: loadingTipos } = useTiposEquipo()
  const [formData, setFormData] = useState({
    activo: '',
    marca: '',
    modelo: '',
    serial: '',
    estado: 'disponible',
    ubicacion: '',
    fecha_compra: '',
    costo: '',
    direccion_ip: '',
    mac_address: '',
    observaciones: '',
    tipo_equipo_id: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    if (equipo) {
      setFormData({
        activo: equipo.activo || '',
        marca: equipo.marca || '',
        modelo: equipo.modelo || '',
        serial: equipo.serial || '',
        estado: equipo.estado?.toLowerCase() || 'disponible',
        ubicacion: equipo.ubicacion || '',
        fecha_compra: equipo.fecha_compra ? equipo.fecha_compra.split('T')[0] : '',
        costo: equipo.costo || '',
        direccion_ip: equipo.direccion_ip || '',
        mac_address: equipo.mac_address || '',
        observaciones: equipo.observaciones || '',
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
    
    // Validar en tiempo real
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
      case 'activo':
        error = validateActivo(value)
        break
      case 'serial':
        error = validateSerial(value)
        break
      case 'marca':
        error = validateMarca(value)
        break
      case 'modelo':
        error = validateModelo(value)
        break
      case 'estado':
        error = validateEstado(value)
        break
      case 'direccion_ip':
        error = validateIP(value)
        break
      case 'mac_address':
        error = validateMAC(value)
        break
      case 'costo':
        error = validateCosto(value)
        break
      case 'fecha_compra':
        error = validateFechaCompra(value)
        break
      case 'tipo_equipo_id':
        error = validateTipoEquipo(value)
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
    const newErrors = {}
    
    newErrors.activo = validateActivo(formData.activo)
    newErrors.serial = validateSerial(formData.serial)
    newErrors.marca = validateMarca(formData.marca)
    newErrors.modelo = validateModelo(formData.modelo)
    newErrors.estado = validateEstado(formData.estado)
    newErrors.direccion_ip = validateIP(formData.direccion_ip)
    newErrors.mac_address = validateMAC(formData.mac_address)
    newErrors.costo = validateCosto(formData.costo)
    newErrors.fecha_compra = validateFechaCompra(formData.fecha_compra)
    newErrors.tipo_equipo_id = validateTipoEquipo(formData.tipo_equipo_id)
    
    setErrors(newErrors)
    setTouched({
      activo: true,
      serial: true,
      marca: true,
      modelo: true,
      estado: true,
      tipo_equipo_id: true,
      direccion_ip: true,
      mac_address: true,
      costo: true,
      fecha_compra: true,
    })
    
    return Object.values(newErrors).every((error) => !error)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    console.log('Validando formulario...', formData)
    
    if (validateAllFields()) {
      console.log('Formulario válido, enviando datos...', formData)
      onSubmit(formData)
    } else {
      console.log('Errores de validación:', errors)
      // Mostrar un mensaje al usuario
      const erroresTexto = Object.entries(errors)
        .filter(([_, error]) => error)
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
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
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
            {/* Activo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código Activo *
              </label>
              <input
                type="text"
                name="activo"
                value={formData.activo}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.activo && touched.activo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="ACT-001"
              />
              {errors.activo && touched.activo && (
                <p className="text-red-500 text-xs mt-1">{errors.activo}</p>
              )}
            </div>

            {/* Serial */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Serie *
              </label>
              <input
                type="text"
                name="serial"
                value={formData.serial}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.serial && touched.serial ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="SN123456789"
              />
              {errors.serial && touched.serial && (
                <p className="text-red-500 text-xs mt-1">{errors.serial}</p>
              )}
            </div>

            {/* Marca */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marca *
              </label>
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.marca && touched.marca ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Dell"
              />
              {errors.marca && touched.marca && (
                <p className="text-red-500 text-xs mt-1">{errors.marca}</p>
              )}
            </div>

            {/* Modelo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modelo *
              </label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.modelo && touched.modelo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Latitude 5420"
              />
              {errors.modelo && touched.modelo && (
                <p className="text-red-500 text-xs mt-1">{errors.modelo}</p>
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
                <option value="disponible">Disponible</option>
                <option value="en uso">En Uso</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="dado de baja">Dado de Baja</option>
              </select>
              {errors.estado && touched.estado && (
                <p className="text-red-500 text-xs mt-1">{errors.estado}</p>
              )}
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación *
              </label>
              <input
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Oficina Principal - Piso 2"
              />
            </div>

            {/* Fecha de Compra */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Compra
              </label>
              <input
                type="date"
                name="fecha_compra"
                value={formData.fecha_compra}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.fecha_compra && touched.fecha_compra ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fecha_compra && touched.fecha_compra && (
                <p className="text-red-500 text-xs mt-1">{errors.fecha_compra}</p>
              )}
            </div>

            {/* Costo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Costo
              </label>
              <input
                type="number"
                step="0.01"
                name="costo"
                value={formData.costo}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.costo && touched.costo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="1500.00"
              />
              {errors.costo && touched.costo && (
                <p className="text-red-500 text-xs mt-1">{errors.costo}</p>
              )}
            </div>

            {/* Dirección IP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección IP
              </label>
              <input
                type="text"
                name="direccion_ip"
                value={formData.direccion_ip}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.direccion_ip && touched.direccion_ip ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="192.168.1.100"
              />
              {errors.direccion_ip && touched.direccion_ip && (
                <p className="text-red-500 text-xs mt-1">{errors.direccion_ip}</p>
              )}
            </div>

            {/* MAC Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MAC Address
              </label>
              <input
                type="text"
                name="mac_address"
                value={formData.mac_address}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.mac_address && touched.mac_address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="00:1B:44:11:3A:B7"
              />
              {errors.mac_address && touched.mac_address && (
                <p className="text-red-500 text-xs mt-1">{errors.mac_address}</p>
              )}
            </div>

            {/* Tipo de Equipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Equipo *
              </label>
              <select
                name="tipo_equipo_id"
                value={formData.tipo_equipo_id}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={loadingTipos}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 ${
                  errors.tipo_equipo_id && touched.tipo_equipo_id ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">
                  {loadingTipos ? 'Cargando...' : 'Seleccione un tipo'}
                </option>
                {tiposEquipo.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
              {errors.tipo_equipo_id && touched.tipo_equipo_id && (
                <p className="text-red-500 text-xs mt-1">{errors.tipo_equipo_id}</p>
              )}
            </div>

            {/* Observaciones - Full width */}
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
                placeholder="Notas adicionales sobre el equipo..."
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
