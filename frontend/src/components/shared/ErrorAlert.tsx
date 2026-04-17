import React from "react";

interface ErrorAlertProps {
  message: string | null;
  onClose?: () => void; // Función opcional para cerrar el mensaje de tipo void (no devuelve nada)
}

/**
 * Componente reutilizable para mostrar mensajes de error
 */
const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
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

export default ErrorAlert
