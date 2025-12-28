import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../hooks/useAppContext'

const KeyFeatureSection = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAppContext()

  const handleModuleClick = (link) => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      navigate(link)
    }
  }

  const features = [
    {
      icon: '📊',
      title: 'Gestión de Equipos',
      description: 'Control completo de todos los equipos y recursos tecnológicos de tu organización.',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      link: '/equipos',
      action: 'Ver Equipos'
    },
    {
      icon: '📝',
      title: 'Reportes y Análisis',
      description: 'Genera reportes detallados en tiempo real sobre el estado de tus activos.',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      link: '/reportes',
      action: 'Ir a Reportes'
    },
    {
      icon: '🔧',
      title: 'Movimientos',
      description: 'Crea y gestiona movimientos de equipos, asignaciones y transferencias.',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      link: '/movimientos',
      action: 'Ver Movimientos'
    },
    {
      icon: '👥',
      title: 'Gestión de Usuarios',
      description: 'Administra usuarios, roles y permisos de acceso al sistema de forma centralizada.',
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700',
      link: '/usuarios',
      action: 'Administrar Usuarios'
    },
    {
      icon: '📈',
      title: 'Dashboard Analytics',
      description: 'Visualiza métricas clave y KPIs de tu inventario en un panel intuitivo.',
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      link: '/dashboard',
      action: 'Ver Dashboard'
    },
    {
      icon: '💼',
      title: 'Tipos de Equipo',
      description: 'Administra y categoriza los diferentes tipos de equipos de tu inventario.',
      color: 'from-teal-500 to-teal-600',
      hoverColor: 'hover:from-teal-600 hover:to-teal-700',
      link: '/tipos-equipo',
      action: 'Gestionar Tipos'
    }
  ]

  return (
    <section id="modulos" className="py-20 px-6 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header de la sección */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 font-geist">
            ⚡ ACCESO RÁPIDO
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 font-satoshi">
            Módulos Principales
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            Explora las funcionalidades clave de GSA Inventory y descubre cómo podemos optimizar la gestión de tus recursos.
          </p>
        </div>

        {/* Grid de características */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105 animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header con gradiente */}
              <div className={`bg-linear-to-br ${feature.color} p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative">
                  <div className="text-5xl mb-3 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white font-satoshi">
                    {feature.title}
                  </h3>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 font-inter leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Botón de acción */}
                <button
                  onClick={() => handleModuleClick(feature.link)}
                  className={`inline-flex items-center gap-2 px-5 py-3 bg-linear-to-r ${feature.color} ${feature.hoverColor} text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group-hover:translate-x-1 font-satoshi`}
                >
                  <span>{feature.action}</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Indicador de estado */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-2 text-sm font-geist">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-gray-500">Disponible 24/7</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action adicional */}
        <div className="mt-16 text-center animate-fadeIn">
          <p className="text-gray-600 mb-6 font-inter text-lg">
            ¿Necesitas ayuda para comenzar?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-linear-to-r from-red-500 to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 font-satoshi"
            >
              Iniciar Sesión
            </button>
            <a
              href="#inicio"
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-red-500 hover:text-red-600 hover:scale-105 transition-all duration-300 font-satoshi"
            >
              Volver al Inicio
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default KeyFeatureSection
