import { NavLink } from 'react-router-dom'
import { useAppContext } from '../../hooks/useAppContext'
import { asideLinks } from '../../utils/validators'

const Aside = () => {
  const { user } = useAppContext()

  return (
    <aside 
      className="w-64 bg-linear-to-br from-gray-800 to-gray-900 text-white flex flex-col fixed left-0 top-16 z-40 overflow-y-auto custom-scrollbar"
      style={{ 
        height: 'calc(100vh - 4rem)',
        scrollbarWidth: 'thin',
        scrollbarColor: '#4B5563 #1F2937'
      }}
    >
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1F2937;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 4px;
          transition: background 0.2s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>
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
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2 pb-4">
          {asideLinks.map((item) => (
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