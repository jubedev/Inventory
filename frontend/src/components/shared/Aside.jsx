import { NavLink } from 'react-router-dom'
import { useAppContext } from '../../hooks/useAppContext'

const Aside = () => {
  const { user } = useAppContext()

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: '📊',
    },
    {
      name: 'Equipos',
      path: '/equipos',
      icon: '💻',
    },
    {
      name: 'Usuarios',
      path: '/usuarios',
      icon: '👥',
    },
    {
      name: 'Tipos de Equipo',
      path: '/tipos-equipo',
      icon: '🏷️',
    },
    {
      name: 'Movimientos',
      path: '/movimientos',
      icon: '📦',
    },
    {
      name: 'Reportes',
      path: '/reportes',
      icon: '📈',
    },
  ]

  return (
    <aside className="min-h-screen w-64 bg-gradient-to-br from-gray-800 to-gray-900 text-white flex flex-col">
      {/* Logo y usuario */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold mb-2">Inventario</h1>
        {user && (
          <div className="text-sm">
            <p className="text-gray-300">Bienvenido,</p>
            <p className="font-semibold">{user.nombre || user.email}</p>
          </div>
        )}
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Aside