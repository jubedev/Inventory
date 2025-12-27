import { useState, useEffect } from 'react'
import api from '../../../services/api'

const RecentMovementsTable = () => {
  const [movements, setMovements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        // Cuando tengas el endpoint de movimientos, úsalo así:
        // const response = await api.get('/movimientos?limit=5')
        // setMovements(response.data.data)
        
        // Por ahora datos simulados
        const mockMovements = [
          {
            id: 1,
            equipo: 'Laptop Dell Latitude 5420',
            tipo: 'Asignación',
            usuario: 'Juan Pérez',
            fecha: new Date().toISOString(),
          },
          {
            id: 2,
            equipo: 'Monitor LG 27"',
            tipo: 'Devolución',
            usuario: 'María García',
            fecha: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: 3,
            equipo: 'Mouse Logitech MX Master',
            tipo: 'Mantenimiento',
            usuario: 'Carlos López',
            fecha: new Date(Date.now() - 172800000).toISOString(),
          },
        ]
        setMovements(mockMovements)
      } catch (error) {
        console.error('Error al cargar movimientos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovements()
  }, [])

  const getTipoColor = (tipo) => {
    switch (tipo.toLowerCase()) {
      case 'asignación':
        return 'bg-green-100 text-green-800'
      case 'devolución':
        return 'bg-blue-100 text-blue-800'
      case 'mantenimiento':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Últimos Movimientos
        </h2>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Últimos Movimientos
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Equipo
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Tipo
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Usuario
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {movements.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">
                  No hay movimientos recientes
                </td>
              </tr>
            ) : (
              movements.map((movement) => (
                <tr key={movement.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{movement.equipo}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(movement.tipo)}`}>
                      {movement.tipo}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">{movement.usuario}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(movement.fecha).toLocaleDateString('es-ES')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentMovementsTable
