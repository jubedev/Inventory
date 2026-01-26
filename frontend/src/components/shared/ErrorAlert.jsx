import PropTypes from 'prop-types'

/**
 * Componente reutilizable para mostrar mensajes de error
 */
const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center justify-between">
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-red-700 hover:text-red-900 font-bold"
        >
          ✕
        </button>
      )}
    </div>
  )
}

ErrorAlert.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func
}

export default ErrorAlert
