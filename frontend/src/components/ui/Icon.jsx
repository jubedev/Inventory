const Icon = ({ name, className = "w-6 h-6" }) => {
  return (
    <svg className={className}>
      <use href={`/assets/icons/icons.svg#${name}`} />
    </svg>
  );
};

export default Icon;
