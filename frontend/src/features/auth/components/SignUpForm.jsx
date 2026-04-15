import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../hooks/useAppContext";
import { validateEmail, validateNombreCompleto } from "../../../utils/validators";
import AccessReqModal from "./AccessReqModal";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    position: '',
    area: '',
    phone: '',
    reason: ''
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return validateEmail(value)
      case 'fullName':
        return validateNombreCompleto(value)
      case 'position':
        return !value?.trim() ? 'El cargo es obligatorio' : 
               value.trim().length < 3 ? 'El cargo debe tener al menos 3 caracteres' : null
      case 'area':
        return !value ? 'El área es obligatoria' : null
      case 'reason':
        return !value?.trim() ? 'El motivo es obligatorio' : 
               value.trim().length < 10 ? 'El motivo debe ser más descriptivo (mínimo 10 caracteres)' :
               value.length > 1000 ? 'El motivo no puede exceder 1000 caracteres' : null
      default:
        return null
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Validate if field has been touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
    const error = validateField(name, value)
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const validateAllFields = () => {
    const newErrors = {}
    let isValid = true

    const requiredFields = ['email', 'fullName', 'position', 'area', 'reason']
    
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field])
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    const touchedFields = {}
    requiredFields.forEach(field => touchedFields[field] = true)
    setTouched(touchedFields)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");
    
    if (!validateAllFields()) {
      setRegisterError("Por favor corrija los errores en el formulario");
      return;
    }
    
    const requestData = {
      email: formData.email,
      nombre_completo: formData.fullName,
      motivo_solicitud: `Cargo: ${formData.position}, Área: ${formData.area}, Teléfono: ${formData.phone || 'No especificado'}, Motivo: ${formData.reason}`,
    };

    const result = await register(requestData);
    
    if (result.success) {
      setSubmittedEmail(formData.email);
      setIsModalOpen(true);
      // Después de cerrar el modal, redirigir al login
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setRegisterError(result.error || "Error al enviar solicitud");
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
              <span className="text-red-600 font-bold text-2xl">INV</span>
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
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Juan Pérez"
              required
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
                errors.fullName && touched.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.fullName && touched.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="juan.perez@empresa.com"
              required
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
                errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
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
              name="position"
              value={formData.position}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ej: Analista de TI"
              required
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
                errors.position && touched.position ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.position && touched.position && (
              <p className="text-red-500 text-xs mt-1">{errors.position}</p>
            )}
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
              name="area"
              value={formData.area}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
                errors.area && touched.area ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Seleccione un área</option>
              <option value="sistemas">Sistemas/TI</option>
              <option value="administracion">Administración</option>
              <option value="operaciones">Operaciones</option>
              <option value="logistica">Logística</option>
              <option value="rrhh">Recursos Humanos</option>
              <option value="otro">Otro</option>
            </select>
            {errors.area && touched.area && (
              <p className="text-red-500 text-xs mt-1">{errors.area}</p>
            )}
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
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="3"
              placeholder="Describa brevemente por qué necesita acceso a la plataforma..."
              required
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out resize-none ${
                errors.reason && touched.reason ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.reason && touched.reason && (
              <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
            )}
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
