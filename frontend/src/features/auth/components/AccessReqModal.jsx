import { Link } from 'react-router-dom'

const AccessReqModal = ({ isOpen, onClose, email }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Overlay con backdrop blur */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 animate-fade-in-up z-10">
        {/* Icono de éxito */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600">
              <use href="/assets/icons/icons.svg#check" />
            </svg>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          ¡Solicitud Enviada!
        </h2>

        {/* Mensaje */}
        <div className="space-y-3">
          <p className="text-gray-600 text-center">
            Te enviaremos la respuesta a tu solicitud por medio del correo electrónico:
          </p>
          <p className="text-blue-600 font-semibold text-center bg-blue-50 py-2 px-4 rounded-lg">
            {email}
          </p>
          <p className="text-sm text-gray-500 text-center">
            Por favor, revisa tu bandeja de entrada y la carpeta de spam. 
            El tiempo de respuesta puede tardar hasta 48 horas.
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-col space-y-3">
          <Link to="/login">
            <button
              className="w-full py-2.5 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Ir a Iniciar Sesión
            </button>
          </Link>
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccessReqModal