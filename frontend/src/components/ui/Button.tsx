interface ButtonProps {
  children: React.ReactNode; // Permite cualquier contenido dentro del botón
  onClick?: () => void; // Función opcional para manejar el clic
  type?: "button" | "submit" | "reset"; // Tipo de botón, por defecto es 'button'
  variant?: "primary" | "secondary" | "danger" | "outline"; // Variantes de estilo para el botón
  className?: string;
  disabled?: boolean; // Propiedad para deshabilitar el botón
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  isLoading = false,
}) => {
  // Definimos estilos base para el botón
  const baseStyles =
    "px-6 py-2.5 rounded-lg font-bold transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

  // Diccionario de variantes de estilo
  const variants = {
    primary:
      "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-gray-800 text-white hover:bg-gray-900",
    danger: "bg-orange-500 text-white hover:bg-orange-600",
    outline: "border-2 border-red-600 text-red-600 hover:bg-red-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading} // Deshabilita el botón si está en estado de carga o si se ha pasado la prop disabled
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <>
            <span className="animate-spin mr-2">↻</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;