import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/shared/PageHeader'

const Notfound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Página no encontrada"
          description="Error 404 - La página que buscas no existe"
        />

        {/* Contenido principal */}
        <div className="bg-white rounded-lg shadow-md p-12 mb-6">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            {/* Número 404 */}
            <div className="text-9xl font-bold text-gray-200">
              404
            </div>

            {/* Emoji y mensaje */}
            <div className="space-y-4">
              <div className="text-6xl">🔍</div>
              <h2 className="text-2xl font-bold text-gray-800">
                No pudimos encontrar esta página
              </h2>
              <p className="text-gray-600 max-w-md">
                Es posible que la URL sea incorrecta o que la página haya sido movida o eliminada.
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                ← Volver
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                🏠 Ir al Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Enlaces rápidos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/equipos')}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="text-2xl mb-2">💻</div>
              <div className="font-medium text-gray-800">Equipos</div>
              <div className="text-sm text-gray-500">Gestión de equipos</div>
            </button>

            <button
              onClick={() => navigate('/usuarios')}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="text-2xl mb-2">👥</div>
              <div className="font-medium text-gray-800">Usuarios</div>
              <div className="text-sm text-gray-500">Usuarios registrados</div>
            </button>

            <button
              onClick={() => navigate('/movimientos')}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="text-2xl mb-2">📦</div>
              <div className="font-medium text-gray-800">Movimientos</div>
              <div className="text-sm text-gray-500">Historial de movimientos</div>
            </button>

            <button
              onClick={() => navigate('/tipos-equipo')}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="text-2xl mb-2">🏷️</div>
              <div className="font-medium text-gray-800">Tipos de Equipo</div>
              <div className="text-sm text-gray-500">Categorías de equipos</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notfound