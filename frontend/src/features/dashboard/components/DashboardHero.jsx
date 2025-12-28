import { useState, useEffect } from 'react'
import { useEquipos } from '../../../hooks/useEquipos'
import StatsCard from '../../../components/ui/StatsCard'

const DashboardHero = () => {
  const { getStats } = useEquipos()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const result = await getStats()
      if (result.success) {
        setStats(result.data)
      }
      setLoading(false)
    }
    fetchStats()
  }, [getStats])

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Dashboard de Inventario
        </h1>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Equipos"
            value={stats?.total || 0}
            icon="💻"
            color="blue"
          />
          <StatsCard
            title="Disponibles"
            value={stats?.disponibles || 0}
            icon="✅"
            color="green"
          />
          <StatsCard
            title="En Uso"
            value={stats?.asignados || 0}
            icon="🔧"
            color="yellow"
          />
          <StatsCard
            title="En Mantenimiento"
            value={stats?.en_mantenimiento || 0}
            icon="⚠️"
            color="red"
          />
        </div>

        {/* Segunda fila de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Equipos por Tipo
            </h2>
            {stats?.por_tipo && stats.por_tipo.length > 0 ? (
              <div className="space-y-3">
                {stats.por_tipo.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📦</span>
                      </div>
                      <span className="font-medium text-gray-700">{item.tipo}</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{item.total}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No hay equipos registrados</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Estado General
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Dados de Baja</span>
                <span className="text-2xl font-bold text-gray-600">{stats?.dados_de_baja || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-gray-600">Operativos</span>
                <span className="text-2xl font-bold text-green-600">
                  {(stats?.disponibles || 0) + (stats?.asignados || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfica de equipos por estado */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Distribución por Estado
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Disponibles</p>
              <p className="text-2xl font-bold text-green-600">
                {stats?.disponibles || 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {stats?.total > 0
                  ? Math.round((stats.disponibles / stats.total) * 100)
                  : 0}%
              </p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600">En Uso</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats?.asignados || 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {stats?.total > 0
                  ? Math.round((stats.asignados / stats.total) * 100)
                  : 0}%
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-gray-600">Mantenimiento</p>
              <p className="text-2xl font-bold text-red-600">
                {stats?.en_mantenimiento || 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {stats?.total > 0
                  ? Math.round((stats.en_mantenimiento / stats.total) * 100)
                  : 0}%
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Dados de Baja</p>
              <p className="text-2xl font-bold text-gray-600">
                {stats?.dados_de_baja || 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {stats?.total > 0
                  ? Math.round((stats.dados_de_baja / stats.total) * 100)
                  : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardHero