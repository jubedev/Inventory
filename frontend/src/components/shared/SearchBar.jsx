import PropTypes from 'prop-types'

/**
 * Componente reutilizable para barra de búsqueda con botón de acción
 */
const SearchBar = ({
  searchTerm,
  onSearchChange,
  onSearch,
  onCreateNew,
  placeholder = 'Buscar...',
  buttonText = 'Nuevo',
  buttonIcon = '➕',
  showCreateButton = true
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="flex-1 w-full md:w-auto flex gap-2">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={onSearch}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
        >
          Buscar
        </button>
      </div>
      {showCreateButton && (
        <button
          onClick={onCreateNew}
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center justify-center gap-2"
        >
          <span className="text-xl">{buttonIcon}</span>
          {buttonText}
        </button>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onCreateNew: PropTypes.func,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  buttonIcon: PropTypes.string,
  showCreateButton: PropTypes.bool
}

export default SearchBar
