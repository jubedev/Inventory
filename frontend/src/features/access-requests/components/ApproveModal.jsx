import { useState } from 'react'
import { validatePassword, validatePasswordConfirm } from '../../../utils/validators'

const ApproveModal = ({ solicitud, onConfirm, onCancel }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rolId, setRolId] = useState('2') // Usuario por defecto
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validateField = (name, value) => {
    switch (name) {
      case 'password':
        return validatePassword(value)
      case 'confirmPassword':
        return validatePasswordConfirm(value, password)
      default:
        return null
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    
    if (touched.password) {
      const passwordError = validateField('password', value)
      setErrors(prev => ({ ...prev, password: passwordError }))
    }
    
    // Re-validate confirm password if it has been touched
    if (touched.confirmPassword) {
      const confirmError = validatePasswordConfirm(confirmPassword, value)
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }))
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value
    setConfirmPassword(value)
    
    if (touched.confirmPassword) {
      const error = validateField('confirmPassword', value)
      setErrors(prev => ({ ...prev, confirmPassword: error }))
    }
  }

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const value = name === 'password' ? password : confirmPassword
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate all fields
    const passwordError = validateField('password', password)
    const confirmError = validateField('confirmPassword', confirmPassword)

    if (passwordError || confirmError) {
      setErrors({ password: passwordError, confirmPassword: confirmError })
      setTouched({ password: true, confirmPassword: true })
      setError('Por favor corrija los errores en el formulario')
      return
    }

    setLoading(true)
    const result = await onConfirm(password, parseInt(rolId))
    setLoading(false)

    if (!result.success) {
      setError(result.error || 'Error al aprobar solicitud')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 animate-fade-in-up">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Aprobar Solicitud
          </h3>
          <p className="text-gray-600">
            Crear cuenta para <span className="font-semibold">{solicitud?.nombre_completo}</span>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email (readonly) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={solicitud?.email}
              readOnly
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600"
            />
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol <span className="text-red-500">*</span>
            </label>
            <select
              value={rolId}
              onChange={(e) => setRolId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="2">Usuario</option>
              <option value="1">Administrador</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => handleBlur('password')}
              placeholder="Mínimo 8 caracteres, incluir mayúsculas, minúsculas y números"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.password && touched.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Contraseña <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={() => handleBlur('confirmPassword')}
              placeholder="Repetir contraseña"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Detalle de solicitud */}
          {solicitud?.motivo_solicitud && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-1">Detalle de la solicitud:</p>
              <p className="text-sm text-gray-600">{solicitud.motivo_solicitud}</p>
            </div>
          )}

          {/* Botones */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Aprobando...' : 'Aprobar y Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApproveModal
