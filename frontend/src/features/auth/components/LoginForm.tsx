import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../hooks/useAppContext";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAppContext();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setLoginError(""); // Limpiar error al escribir
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError("");

    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      // Redirigir al dashboard después del login exitoso
      navigate("/dashboard");
    } else {
      setLoginError(result.error || "Error al iniciar sesión");
    }
  };

  return (
    <section
      className="flex justify-center items-start sm:items-center min-h-screen bg-cover bg-center bg-no-repeat relative overflow-y-auto py-8"
      style={{
        backgroundImage:
          "url('https://d1ih8jugeo2m5m.cloudfront.net/2023/12/plantillas-de-paginas-web-gratis-1200x685.jpg')",
      }}
    >
      {/* Overlay oscuro para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenedor Principal del Formulario */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl border border-gray-100 z-10 mx-4 animate-fade-in-up"
      >
        {/* 1. Encabezado (Logo y Título) */}
        <div className="flex items-center space-x-4">
          {/* Contenedor del Logo */}
          <div className="hidden sm:flex bg-white rounded-xl p-3 shadow-lg border border-gray-100 items-center justify-center">
            <span className="text-red-600 font-bold text-2xl">INV</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-gray-900 font-extrabold text-2xl md:text-3xl tracking-tight">
            Iniciar Sesión
          </h1>
        </div>

        {/* Línea divisoria sutil */}
        <hr className="border-gray-200" />

        {/* Mensaje de error */}
        {(loginError || error) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
            {loginError || error}
          </div>
        )}

        {/* 2. Campo de Email */}
        <Input
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu.correo@ejemplo.com"
          required
          className="w-full"
        />

        {/* 3. Campo de Contraseña */}
        <Input
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          className="w-full"
        />

        {/* 4. Botón de Enviar */}
        <Button
          children={loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          type="submit"
          variant="primary"
          className="w-full py-2 px-4 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        ></Button>

        {/* 5. Enlace Adicional */}
        <p className="text-center text-sm text-gray-500">
          ¿Olvidaste tu contraseña?
          <a
            href="#"
            className="font-medium text-blue-600 hover:text-blue-500 ml-1"
          >
            Recuperar
          </a>
        </p>
        <div className="relative flex items-center py-5">
          {/* La línea a la izquierda y derecha */}
          <div className="grow border-t border-gray-300"></div>

          {/* El texto "O" en el centro */}
          <span className="shrink mx-4 text-gray-500 text-sm">O</span>

          {/* La línea a la derecha */}
          <div className="grow border-t border-gray-300"></div>
        </div>
        <Link to="/signup">
          <Button
            type="button"
            variant="outline"
            className="w-full py-2 px-4 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Solicitar Acceso
          </Button>
        </Link>
      </form>
    </section>
  );
};

export default LoginForm;
