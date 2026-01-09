import { useState } from "react";
import { useMovimientos } from '../../../hooks/useMovimientos';

const MovimientosListPage = () => {

    const [ movimientos, loading, error, fetchMovimientos, deleteMovimientos ] = useMovimientos()

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Movimientos de Inventario
        </h1>
        <p className="text-gray-600">Gestiona los movimientos de inventario</p>
      </div>

      {/* Barra de acciones */}
      <div className="bg-white rounded-2xl p-4 mb-6 justify-between flex flex-col md:flex-row items-center shadow-md gap-4">
        <input type="search" name="" id="" />
      </div>
    </div>
  );
};

export default MovimientosListPage;
