import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import Icon from "../ui/Icon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const navigate = useNavigate();
  const location = useLocation();

  // Resetear scroll al cambiar de página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Solo detectar sección activa si estamos en la página principal
      if (location.pathname === '/') {
        const sections = ['inicio', 'modulos'];
        const scrollPosition = window.scrollY + 100;
        
        for (const sectionId of sections) {
          const section = document.getElementById(sectionId);
          if (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      } else {
        // Si no estamos en la página principal, no hay sección activa
        setActiveSection(null);
      }
    };
    
    // Ejecutar al cambiar de ruta
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleScrollToSection = (sectionId) => (e) => {
    e.preventDefault();
    
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
    <header className={`shadow-2xl backdrop-blur-md fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-red-600/95 py-3' : 'bg-red-500/90 py-4'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-5 lg:px-8">
        <Link
          to="/"
          className="flex items-center space-x-3 hover:opacity-90 transition-all duration-300 group"
        >
          <div className="bg-white rounded-lg p-2 shadow-md">
            <img
              src="/assets/image/spira.png"
              alt="Logo"
              className="h-auto w-20 object-contain"
            />
          </div>
          <span className="text-white font-bold text-lg sm:text-xl hidden sm:block whitespace-nowrap font-satoshi tracking-tight">
            GSA Inventory
          </span>
        </Link>
        <button
          className="lg:hidden text-white focus:outline-none hover:scale-110 transition-transform duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menú"
        >
          <Icon name={isMenuOpen ? "close" : "hamburger"} className="w-6 h-6" />
        </button>
        <div className="hidden lg:block">
          <nav>
            <ul className="flex items-center space-x-2 text-white">
              <li>
                <a
                  href="#inicio"
                  onClick={handleScrollToSection('inicio')}
                  className={`
                    font-inter text-sm px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
                    ${activeSection === 'inicio'
                      ? 'bg-white/30 text-white font-semibold shadow-lg' 
                      : 'hover:bg-white/20 hover:text-white hover:scale-105'
                    }
                  `}
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#modulos"
                  onClick={handleScrollToSection('modulos')}
                  className={`
                    font-inter text-sm px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
                    ${activeSection === 'modulos'
                      ? 'bg-white/30 text-white font-semibold shadow-lg' 
                      : 'hover:bg-white/20 hover:text-white hover:scale-105'
                    }
                  `}
                >
                  Modulos
                </a>
              </li>
              <li className="ml-2">
                <NavLink
                  to="/login"
                  className="px-5 py-2.5 bg-white text-red-600 font-bold rounded-xl shadow-lg hover:bg-red-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out border-2 border-white hover:border-red-100 font-satoshi text-sm"
                >
                  Iniciar Sesión
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} activeSection={activeSection} />
    </header>
  );
};

export default Header;
