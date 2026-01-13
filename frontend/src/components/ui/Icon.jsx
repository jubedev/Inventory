const Icon = ({ name, className = "w-6 h-6" }) => {
  // Añadimos una versión o timestamp para saltar la caché
  const spritePath = "/assets/icons/icons.svg?v=1"; 
  
  return (
    <svg className={className}>
      <use href={`${spritePath}#${name}`} />
    </svg>
  );
};

export default Icon;
