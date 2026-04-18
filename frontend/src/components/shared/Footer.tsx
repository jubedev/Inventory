import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-linear-to-br from-gray-900 to-gray-800 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Columna 1 - Marca */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-lg p-2 shadow-md">
                <span className="text-gray-800 font-bold text-xl">INV</span>
              </div>
              <h3 className="text-xl font-bold font-satoshi">Inventory App</h3>
            </div>
            <p className="text-gray-400 text-sm font-inter leading-relaxed">
              Plataforma de gestión de recursos tecnológicos. Control total de tu inventario con reportes en tiempo real.
            </p>
            {/* Redes sociales */}
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-red-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <span className="text-lg">📱</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-red-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <span className="text-lg">💼</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-red-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <span className="text-lg">📧</span>
              </a>
            </div>
          </div>

          {/* Columna 2 - Navegación */}
          <div>
            <h4 className="text-lg font-bold font-satoshi mb-4">Navegación</h4>
            <ul className="space-y-2 font-inter">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                  → Inicio
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                  → Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                  → Contáctanos
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                  → Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Recursos */}
          <div>
            <h4 className="text-lg font-bold font-satoshi mb-4">Recursos</h4>
            <ul className="space-y-2 font-inter">
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                  → Documentación
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                  → Guía de Usuario
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                  → API
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                  → Soporte Técnico
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4 - Contacto */}
          <div>
            <h4 className="text-lg font-bold font-satoshi mb-4">Contacto</h4>
            <ul className="space-y-3 font-inter text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <span className="text-red-400">📍</span>
                <span>Calle Principal #123<br />Ciudad, País</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span className="text-red-400">📞</span>
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span className="text-red-400">✉️</span>
                <a href="mailto:info@inventoryapp.com" className="hover:text-white transition-colors">
                  info@inventoryapp.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm font-geist">
            © {currentYear} Inventory App IT. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-sm font-inter">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Términos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>

        {/* Badge de versión */}
        <div className="mt-6 text-center">
          <span className="inline-block bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-geist text-gray-400">
            v1.0.0 | Sistema Estable
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer