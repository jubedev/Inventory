import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../hooks/useAppContext'

const HeroSection = () => {
  return (
    <section id="inicio" className="relative h-screen box-border shadow-2xl bg-linear-to-br from-red-500/90 via-red-600/90 to-red-700/90 rounded-b-2xl p-8 mb-4 flex items-center backdrop-blur-sm overflow-hidden">
      {/* Partículas flotantes de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center px-6 relative z-10">
        {/* Contenido de texto */}
        <div className="text-white space-y-6 animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-medium mb-4 border border-white/30 hover:bg-white/30 transition-all duration-300 font-geist">
            <span className="text-lg animate-bounce">✨</span>
            <span>Sistema de Gestión Inteligente</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-satoshi font-extrabold leading-tight tracking-tight animate-slideInLeft">
            Inventory App IT
          </h1>
          
          <p className="text-xl lg:text-2xl font-inter font-light text-white/95 leading-relaxed max-w-xl animate-slideInLeft delay-100">
            Plataforma de Gestión de Recursos - Tu centro para reportes y solicitudes.
          </p>
          
          <ul className="space-y-4 text-lg font-inter animate-slideInLeft delay-200">
            <li className="flex items-center gap-3 group">
              <span className="shrink-0 w-8 h-8 bg-white/30 rounded-full flex items-center justify-center font-bold group-hover:bg-white/50 transition-all duration-300 group-hover:rotate-12">✓</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">Control total de tu inventario tecnológico</span>
            </li>
            <li className="flex items-center gap-3 group">
              <span className="shrink-0 w-8 h-8 bg-white/30 rounded-full flex items-center justify-center font-bold group-hover:bg-white/50 transition-all duration-300 group-hover:rotate-12">✓</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">Reportes en tiempo real</span>
            </li>
            <li className="flex items-center gap-3 group">
              <span className="shrink-0 w-8 h-8 bg-white/30 rounded-full flex items-center justify-center font-bold group-hover:bg-white/50 transition-all duration-300 group-hover:rotate-12">✓</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">Gestión simplificada de solicitudes</span>
            </li>
          </ul>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-slideInLeft delay-300">
            <Link 
              to="/login"
              className="group px-8 py-4 bg-white text-red-600 font-bold rounded-xl shadow-2xl hover:bg-red-50 hover:shadow-xl hover:scale-105 transition-all duration-300 text-center font-satoshi relative overflow-hidden"
            >
              <span className="relative z-10">Comenzar Ahora</span>
              <span className="absolute inset-0 bg-linear-to-r from-red-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <a 
              href="#modulos"
              className="group px-8 py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-red-600 hover:scale-105 transition-all duration-300 text-center font-satoshi"
            >
              Conocer Más
            </a>
          </div>
        </div>

        {/* Panel de estadísticas mejorado */}
        <div className="hidden lg:flex items-center justify-center animate-slideInRight">
          <div className="relative w-full max-w-lg">
            {/* Efecto de resplandor giratorio */}
            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent backdrop-blur-3xl rounded-3xl transform rotate-6 animate-pulse"></div>
            
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
              <div className="space-y-4">
                {/* Card 1 - Equipos */}
                <div className="bg-linear-to-br from-white/95 to-white/90 rounded-2xl p-6 shadow-xl transform hover:scale-105 hover:-rotate-1 transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-linear-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      💻
                    </div>
                    <div className="flex-1">
                      <p className="font-inter font-semibold text-gray-600 text-sm mb-1">Equipos Registrados</p>
                      <p className="text-3xl font-extrabold text-red-600 font-geist tracking-tight">1,247</p>
                    </div>
                    <div className="text-green-500 font-geist text-xs font-bold bg-green-50 px-2 py-1 rounded-lg">+12%</div>
                  </div>
                </div>
                
                {/* Card 2 - Solicitudes */}
                <div className="bg-linear-to-br from-white/95 to-white/90 rounded-2xl p-6 shadow-xl transform hover:scale-105 hover:rotate-1 transition-all duration-300 cursor-pointer group delay-75">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-linear-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      📊
                    </div>
                    <div className="flex-1">
                      <p className="font-inter font-semibold text-gray-600 text-sm mb-1">Solicitudes Activas</p>
                      <p className="text-3xl font-extrabold text-green-600 font-geist tracking-tight">32</p>
                    </div>
                    <div className="text-blue-500 font-geist text-xs font-bold bg-blue-50 px-2 py-1 rounded-lg">En tiempo</div>
                  </div>
                </div>
                
                {/* Card 3 - Eficiencia */}
                <div className="bg-linear-to-br from-white/95 to-white/90 rounded-2xl p-6 shadow-xl transform hover:scale-105 hover:-rotate-1 transition-all duration-300 cursor-pointer group delay-150">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-linear-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      ⚡
                    </div>
                    <div className="flex-1">
                      <p className="font-inter font-semibold text-gray-600 text-sm mb-1">Eficiencia Operativa</p>
                      <p className="text-3xl font-extrabold text-blue-600 font-geist tracking-tight">98.5%</p>
                    </div>
                    <div className="text-purple-500 font-geist text-xs font-bold bg-purple-50 px-2 py-1 rounded-lg">Óptimo</div>
                  </div>
                </div>
              </div>
              
              {/* Indicador de tiempo real */}
              <div className="mt-6 flex items-center justify-center gap-2 text-white/80 text-sm font-geist">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Datos actualizados en tiempo real</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection