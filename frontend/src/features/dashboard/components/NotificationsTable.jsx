import { useState, useEffect } from 'react'
import api from '../../../services/api'

const NotificationsTable = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Simulando notificaciones - puedes conectarlo a tu API más adelante
        const mockNotifications = [
          {
            id: 1,
            type: 'warning',
            message: 'Equipo próximo a vencer garantía',
            date: new Date().toISOString(),
          },
          {
            id: 2,
            type: 'info',
            message: 'Nueva solicitud de equipo pendiente',
            date: new Date().toISOString(),
          },
          {
            id: 3,
            type: 'success',
            message: 'Mantenimiento completado exitosamente',
            date: new Date().toISOString(),
          },
        ]
        setNotifications(mockNotifications)
      } catch (error) {
        console.error('Error al cargar notificaciones:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const getTypeColor = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'success':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Notificaciones</h2>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Notificaciones</h2>
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No hay notificaciones nuevas
          </p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border-2 ${getTypeColor(notification.type)}`}
            >
              <p className="font-medium">{notification.message}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(notification.date).toLocaleString('es-ES')}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NotificationsTable