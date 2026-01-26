import PropTypes from 'prop-types'

/**
 * Componente reutilizable para controles de paginación
 */
const PaginationControls = ({
  pagination,
  currentPage,
  onPageChange,
  itemsCount,
  itemName = 'registros'
}) => {
  if (!pagination || pagination.total === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-6 flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="text-sm text-gray-600">
        Mostrando {itemsCount} de {pagination.total} {itemName}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          ← Anterior
        </button>
        
        <div className="flex gap-1">
          {[...Array(pagination.last_page)].map((_, i) => {
            const page = i + 1
            // Mostrar solo páginas cercanas a la actual
            if (
              page === 1 ||
              page === pagination.last_page ||
              (page >= currentPage - 2 && page <= currentPage + 2)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-4 py-2 border rounded-lg transition-all ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              )
            } else if (
              page === currentPage - 3 ||
              page === currentPage + 3
            ) {
              return <span key={page} className="px-2 py-2">...</span>
            }
            return null
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pagination.last_page}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Siguiente →
        </button>
      </div>
    </div>
  )
}

PaginationControls.propTypes = {
  pagination: PropTypes.shape({
    current_page: PropTypes.number,
    last_page: PropTypes.number,
    per_page: PropTypes.number,
    total: PropTypes.number
  }).isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemsCount: PropTypes.number.isRequired,
  itemName: PropTypes.string
}

export default PaginationControls
