import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../hooks/useAppContext";
import AccessReqModal from "./AccessReqModal";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [registerError, setRegisterError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");
    
    const formData = {
      email: e.target.email.value,
      password: e.target.password?.value || 'temporal123',
      password_confirmation: e.target.passwordConfirm?.value || 'temporal123',
    };

    const result = await register(formData);
    
    if (result.success) {
      setSubmittedEmail(formData.email);
      setIsModalOpen(true);
      // Después de cerrar el modal, redirigir al dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      setRegisterError(result.error || "Error al registrar usuario");
    }
  };

  return (
    <>
      <section
        className="flex justify-center items-start sm:items-center min-h-screen bg-cover bg-center bg-no-repeat relative overflow-y-auto py-8"
        style={{
          backgroundImage:
            "url('https://corposuite.com/wp-content/uploads/2024/01/TIPS-PARA-LOGRAR-UNA-MEJOR-GESTION-DE-INVENTARIOS-scaled-1.jpg')",
        }}
      >
        {/* Overlay oscuro para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Contenedor Principal del Formulario */}
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl border border-gray-100 z-10 mx-4 animate-fade-in-up"
        >
          {/* 1. Encabezado (Logo y Título) - Implementación de las Mejoras */}
          <div className="flex items-center space-x-4">
            {/* Contenedor del Logo */}
            <div className="hidden sm:flex bg-white rounded-xl p-3 shadow-lg border border-gray-100 items-center justify-center">
              <img
                src="/assets/image/spira.png"
                alt="Logo de GSA Inventory"
                className="h-auto w-10 object-contain sm:w-12"
              />
            </div>

            {/* Título Principal */}
            <h1 className="text-gray-900 font-extrabold text-2xl md:text-3xl tracking-tight">
              Solicitar Acceso
            </h1>
          </div>

          {/* Línea divisoria sutil */}
          <hr className="border-gray-200" />

          {/* Mensaje de error */}
          {(registerError || error) && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {registerError || error}
            </div>
          )}

          {/* Descripción */}
          <p className="text-sm text-gray-600 text-center">
            Complete el formulario para solicitar acceso a la plataforma. Un
            administrador revisará su solicitud.
          </p>

          {/* Campo de Nombre Completo */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre Completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Juan Pérez"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            />
          </div>

          {/* Campo de Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo Electrónico Corporativo{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="juan.perez@empresa.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            />
          </div>

          {/* Campo de Cargo */}
          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cargo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="position"
              placeholder="Ej: Analista de TI"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            />
          </div>

          {/* Campo de Área */}
          <div>
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Área/Departamento <span className="text-red-500">*</span>
            </label>
            <select
              id="area"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            >
              <option value="">Seleccione un área</option>
              <option value="sistemas">Sistemas/TI</option>
              <option value="administracion">Administración</option>
              <option value="operaciones">Operaciones</option>
              <option value="logistica">Logística</option>
              <option value="rrhh">Recursos Humanos</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Campo de Teléfono */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Teléfono/Extensión
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Ej: 3001234567 o Ext. 123"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            />
          </div>

          {/* Campo de Motivo */}
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Motivo de la solicitud <span className="text-red-500">*</span>
            </label>
            <textarea
              id="reason"
              rows="3"
              placeholder="Describa brevemente por qué necesita acceso a la plataforma..."
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out resize-none"
            />
          </div>

          {/* Botón de Enviar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando solicitud...' : 'Enviar Solicitud'}
          </button>

          {/* Enlace para volver */}
          <p className="text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 ml-1"
            >
              Iniciar Sesión
            </Link>
          </p>
        </form>

        {/* Modal de confirmación */}
        <AccessReqModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          email={submittedEmail}
        />
      </section>
    </>
  );
};

export default SignUpForm;
