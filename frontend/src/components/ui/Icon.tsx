import React from "react";

interface IconProps {
  name: 'hamburger' | 'close' | 'user' | 'settings' | 'logout'; // Agrega más nombres de íconos según tu sprite
  className?: string; // Permite pasar clases adicionales para estilos personalizados y el ? significa que es opcional
}

const Icon: React.FC<IconProps> = ({ name, className = "w-6 h-6" }) => {
  // Añadimos una versión o timestamp para saltar la caché
  const spritePath = "/assets/icons/icons.svg?v=1"; 
  
  return (
    <svg className={className}>
      <use href={`${spritePath}#${name}`} />
    </svg>
  );
};

export default Icon;
