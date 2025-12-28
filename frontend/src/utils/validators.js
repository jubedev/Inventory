export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return 'El correo electrónico es obligatorio'
  if (!emailRegex.test(email)) return 'Debes proporcionar un correo válido'
  return null
}

export const validateNombreCompleto = (nombre) => {
  if (!nombre) return 'El nombre completo es obligatorio'
  if (nombre.length < 5) return 'El nombre debe tener al menos 5 caracteres'
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) return 'El nombre solo puede contener letras y espacios'
  return null
}

export const validateActivo = (activo) => {
  if (!activo) return 'El código de activo es obligatorio'
  if (activo.length < 3) return 'El código debe tener al menos 3 caracteres'
  if (activo.length > 100) return 'El código no puede exceder 100 caracteres'
  return null
}

export const validateSerial = (serial) => {
  if (!serial) return 'El serial es obligatorio'
  if (serial.length < 3) return 'El serial debe tener al menos 3 caracteres'
  if (serial.length > 100) return 'El serial no puede exceder 100 caracteres'
  return null
}

export const validateMarca = (marca) => {
  if (!marca) return 'La marca es obligatoria'
  if (marca.length < 2) return 'La marca debe tener al menos 2 caracteres'
  if (marca.length > 100) return 'La marca no puede exceder 100 caracteres'
  return null
}

export const validateModelo = (modelo) => {
  if (!modelo) return 'El modelo es obligatorio'
  if (modelo.length < 2) return 'El modelo debe tener al menos 2 caracteres'
  if (modelo.length > 100) return 'El modelo no puede exceder 100 caracteres'
  return null
}

export const validateEstado = (estado) => {
  const estadosValidos = ['disponible', 'en uso', 'mantenimiento', 'dado de baja']
  if (!estado) return 'El estado es obligatorio'
  if (!estadosValidos.includes(estado)) return 'Debes seleccionar un estado válido'
  return null
}

export const validateIP = (ip) => {
  if (!ip) return null // Campo opcional
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/
  if (!ipRegex.test(ip)) return 'La dirección IP no es válida'
  const parts = ip.split('.')
  if (parts.some(part => parseInt(part) > 255)) return 'La dirección IP no es válida'
  return null
}

export const validateMAC = (mac) => {
  if (!mac) return null // Campo opcional
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
  if (!macRegex.test(mac)) return 'La dirección MAC debe tener el formato XX:XX:XX:XX:XX:XX'
  return null
}

export const validateCosto = (costo) => {
  if (!costo) return null // Campo opcional
  const costoNum = parseFloat(costo)
  if (isNaN(costoNum)) return 'El costo debe ser un número válido'
  if (costoNum < 0) return 'El costo no puede ser negativo'
  if (costoNum > 999999999.99) return 'El costo es demasiado alto'
  return null
}

export const validateFechaCompra = (fecha) => {
  if (!fecha) return null // Campo opcional
  const fechaDate = new Date(fecha)
  const hoy = new Date()
  if (fechaDate > hoy) return 'La fecha de compra no puede ser futura'
  return null
}

export const validateTipoEquipo = (tipoId) => {
  if (!tipoId) return 'El tipo de equipo es obligatorio'
  return null
}

export const validatePassword = (password) => {
  if (!password) return 'La contraseña es obligatoria'
  if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres'
  return null
}

export const validatePasswordConfirm = (password, confirm) => {
  if (!confirm) return 'Debes confirmar la contraseña'
  if (password !== confirm) return 'Las contraseñas no coinciden'
  return null
}

export const validateNombre = (nombre) => {
  if (!nombre) return 'El nombre es obligatorio'
  if (nombre.length < 3) return 'El nombre debe tener al menos 3 caracteres'
  if (nombre.length > 100) return 'El nombre no puede exceder 100 caracteres'
  return null
}

export const validateDescripcion = (descripcion) => {
  if (descripcion && descripcion.length > 500) {
    return 'La descripción no puede exceder 500 caracteres'
  }
  return null
}
