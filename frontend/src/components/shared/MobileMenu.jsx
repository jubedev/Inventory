import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";

const MobileMenu = ({ isOpen, onClose, activeSection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAppContext();
  
  // Detectar si estamos en modo admin
  const isAdminMode = ['/dashboard', '/equipos', '/usuarios', '/tipos-equipo', '/movimientos', '/reportes'].some(
    path => location.pathname.startsWith(path)
  );
  
  if (!isOpen) return null;

  const handleScrollToSection = (sectionId) => (e) => {
    e.preventDefault();
    onClose();
    
    // Si no estamos en la página principal, navegar primero
    if (location.pathname !== '/') {
      navigate('/');
      // Esperar a que se cargue la página y hacer scroll
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Si ya estamos en la página principal, hacer scroll directamente
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  const handleNavClick = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden animate-fadeIn z-40"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="lg:hidden bg-gradient-to-br from-red-500/98 to-red-600/98 backdrop-blur-lg absolute top-full left-4 right-4 shadow-2xl mt-4 transition-all rounded-2xl border border-white/20 animate-slideDown z-50">
        <nav className="px-6 py-6">
          {isAdminMode && isAuthenticated ? (
            // Menú de administrador móvil
            <div>
              {/* Info del usuario */}
              <div className="bg-white/20 rounded-xl p-4 mb-4">
                <p className="text-white text-sm">Bienvenido,</p>
                <p className="text-white font-bold text-lg">{user?.nombre || user?.email}</p>
                <p className="text-white/70 text-xs">{user?.rol?.nombre || 'Administrador'}</p>
              </div>

              {/* Navegación */}
              <ul className="flex flex-col space-y-2 mb-4">
                <li>
                  <button
                    onClick={() => handleNavClick('/dashboard')}
                    className={`w-full text-left text-white px-4 py-3 rounded-xl transition-all duration-300 font-inter flex items-center space-x-3 ${
                      location.pathname === '/dashboard'
                        ? 'bg-white/30 font-semibold shadow-lg' 
                        : 'hover:bg-white/20'
                    }`}
                  >
                    <span className="text-xl">📊</span>
                    <span>Dashboard</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('/equipos')}
                    className={`w-full text-left text-white px-4 py-3 rounded-xl transition-all duration-300 font-inter flex items-center space-x-3 ${
                      location.pathname === '/equipos'
                        ? 'bg-white/30 font-semibold shadow-lg' 
                        : 'hover:bg-white/20'
                    }`}
                  >
                    <span className="text-xl">💻</span>
                    <span>Equipos</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('/usuarios')}
                    className={`w-full text-left text-white px-4 py-3 rounded-xl transition-all duration-300 font-inter flex items-center space-x-3 ${
                      location.pathname === '/usuarios'
                        ? 'bg-white/30 font-semibold shadow-lg' 
                        : 'hover:bg-white/20'
                    }`}
                  >
                    <span className="text-xl">👥</span>
                    <span>Usuarios</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('/tipos-equipo')}
                    className={`w-full text-left text-white px-4 py-3 rounded-xl transition-all duration-300 font-inter flex items-center space-x-3 ${
                      location.pathname === '/tipos-equipo'
                        ? 'bg-white/30 font-semibold shadow-lg' 
                        : 'hover:bg-white/20'
                    }`}
                  >
                    <span className="text-xl">🏷️</span>
                    <span>Tipos de Equipo</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('/movimientos')}
                    className={`w-full text-left text-white px-4 py-3 rounded-xl transition-all duration-300 font-inter flex items-center space-x-3 ${
                      location.pathname === '/movimientos'
                        ? 'bg-white/30 font-semibold shadow-lg' 
                        : 'hover:bg-white/20'
                    }`}
                  >
                    <span className="text-xl">📦</span>
                    <span>Movimientos</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('/reportes')}
                    className={`w-full text-left text-white px-4 py-3 rounded-xl transition-all duration-300 font-inter flex items-center space-x-3 ${
                      location.pathname === '/reportes'
                        ? 'bg-white/30 font-semibold shadow-lg' 
                        : 'hover:bg-white/20'
                    }`}
                  >
                    <span className="text-xl">📈</span>
                    <span>Reportes</span>
                  </button>
                </li>
              </ul>

              {/* Divisor */}
              <hr className="border-white/20 my-4" />

              {/* Opciones de cuenta */}
              <ul className="flex flex-col space-y-2">
                <li>
                  <button
                    onClick={() => {
                      alert('Perfil - Próximamente');
                      onClose();
                    }}
                    className="w-full text-left text-white px-4 py-3 rounded-xl transition-all duration-300 font-inter flex items-center space-x-3 hover:bg-white/20"
                  >
                    <span className="text-xl">👤</span>
                    <span>Mi Perfil</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      alert('Configuración - Próximamente');
                      onClose();
                    }}
                    className="w-full text-left text-white px-4 py-3 rounded-xl transition-all duration-300 font-inter flex items-center space-x-3 hover:bg-white/20"
                  >
                    <span className="text-xl">⚙️</span>
                    <span>Configuración</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-white px-4 py-3 rounded-xl transition-all duration-300 font-inter flex items-center space-x-3 bg-red-700 hover:bg-red-800 font-semibold"
                  >
                    <span className="text-xl">🚪</span>
                    <span>Cerrar Sesión</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // Menú público móvil
            <div>
              {isAuthenticated && (
                // Info del usuario en landing (móvil)
                <div className="bg-white/20 rounded-xl p-4 mb-4">
                  <p className="text-white text-sm">Hola,</p>
                  <p className="text-white font-bold text-lg">{user?.nombre || user?.email}</p>
                </div>
              )}
              
              <ul className="flex flex-col space-y-2">
                <li>
                  <a
                    href="#inicio"
                    onClick={handleScrollToSection('inicio')}
                    className={`
                      block text-white px-4 py-3 rounded-xl transition-all duration-300 font-inter
                      ${activeSection === 'inicio'
                        ? 'bg-white/30 font-semibold shadow-lg scale-105' 
                        : 'hover:bg-white/20 hover:scale-105'
                      }
                    `}
                  >
                    🏠 Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="#modulos"
                    onClick={handleScrollToSection('modulos')}
                    className={`
                      block text-white px-4 py-3 rounded-xl transition-all duration-300 font-inter
                      ${activeSection === 'modulos'
                        ? 'bg-white/30 font-semibold shadow-lg scale-105' 
                        : 'hover:bg-white/20 hover:scale-105'
                      }
                    `}
                  >
                    📦 Módulos
                  </a>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    onClick={onClose}
                    className={({ isActive }) => `
                      block text-white px-4 py-3 rounded-xl transition-all duration-300 font-inter
                      ${isActive 
                        ? 'bg-white/30 font-semibold shadow-lg scale-105' 
                        : 'hover:bg-white/20 hover:scale-105'
                      }
                    `}
                  >
                    📧 Contáctanos
                  </NavLink>
                </li>
                
                {isAuthenticated ? (
                  // Usuario autenticado en landing
                  <>
                    <li className="pt-2">
                      <button
                        onClick={() => handleNavClick('/dashboard')}
                        className="w-full text-center px-4 py-3 bg-white text-red-600 font-bold rounded-xl shadow-xl hover:bg-red-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 font-satoshi"
                      >
                        📊 Ir al Dashboard
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-center px-4 py-3 bg-red-700 text-white font-semibold rounded-xl hover:bg-red-800 transition-all duration-300"
                      >
                        🚪 Cerrar Sesión
                      </button>
                    </li>
                  </>
                ) : (
                  // Usuario no autenticado
                  <li className="pt-2">
                    <NavLink
                      to="/login"
                      onClick={onClose}
                      className="block text-center px-4 py-3 bg-white text-red-600 font-bold rounded-xl shadow-xl hover:bg-red-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 font-satoshi"
                    >
                      🔐 Iniciar Sesión
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
