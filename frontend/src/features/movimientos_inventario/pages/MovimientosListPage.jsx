import { useState } from "react";
import { useMovimientos } from "../../../hooks/useMovimientos";
import MovimientosTable from "../components/MovimientosTable";
import MovimientosFilters from "../components/MovimientosFilters";
import PaginationControls from "../../../components/shared/PaginationControls";

const MovimientosListPage = () => {
  const {
    movimientos,
    pagination,
    loading,
    error,
    fetchMovimientos,
    createMovimiento,
    updateMovimiento,
    deleteMovimiento,
  } = useMovimientos();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});

  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchMovimientos(newPage, pagination.per_page, { ...filters, search: searchTerm });
  };

  // Manejar búsqueda
  const handleSearch = () => {
    setCurrentPage(1);
    fetchMovimientos(1, pagination.per_page, { ...filters, search: searchTerm });
  };

  // Manejar cambio de filtros
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    fetchMovimientos(1, pagination.per_page, { ...newFilters, search: searchTerm });
  };

  // Limpiar filtros
  const handleClearFilters = () => {
    setFilters({});
    setCurrentPage(1);
    fetchMovimientos(1, pagination.per_page, { search: searchTerm });
  };

  const handleView = (movimiento) => {
    console.log("Ver movimiento:", movimiento);
  };

  const handleEdit = (movimiento) => {
    console.log("Editar movimiento:", movimiento);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este movimiento?"
    );
    if (confirmed) {
      const result = await deleteMovimiento(id);
      if (result.success) {
        alert("Movimiento eliminado exitosamente");
      } else {
        alert(`Error al eliminar movimiento: ${result.error}`);
      }
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Movimientos de Inventario
        </h1>
        <p className="text-gray-600">Gestiona los movimientos de inventario</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Filtros */}
      <MovimientosFilters 
        onFilterChange={handleFilterChange}
        onClear={handleClearFilters}
      />

      {/* Barra de búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Buscar por activo, serial, marca, modelo o ubicación..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          Buscar
        </button>
      </div>

      <MovimientosTable
        movimientos={movimientos}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Controles de paginación */}
      {!loading && (
        <PaginationControls
          pagination={pagination}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsCount={movimientos.length}
          itemName="movimientos"
        />
      )}
    </div>
  );
};

export default MovimientosListPage;
