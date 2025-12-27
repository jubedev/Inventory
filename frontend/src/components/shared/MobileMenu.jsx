import { NavLink, useNavigate, useLocation } from "react-router-dom";

const MobileMenu = ({ isOpen, onClose, activeSection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
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

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="lg:hidden bg-gradient-to-br from-red-500/98 to-red-600/98 backdrop-blur-lg absolute top-full left-4 right-4 shadow-2xl mt-4 transition-all rounded-2xl border border-white/20 animate-slideDown">
        <nav className="px-6 py-6">
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
            <li className="pt-2">
              <NavLink
                to="/login"
                onClick={onClose}
                className="block text-center px-4 py-3 bg-white text-red-600 font-bold rounded-xl shadow-xl hover:bg-red-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 font-satoshi"
              >
                🔐 Iniciar Sesión
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
