import { useState } from "react";
import Icon from "../../../components/ui/Icon";

const MovimientosListPage = () => {
  return (
    <div className="p-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Movimientos de Inventario
        </h1>
        <p className="text-gray-600">Gestiona los movimientos de inventario</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex-1 w-full md:w-auto">
            <input
              type="text"
              placeholder="Buscar por activo, serial, marca, modelo o ubicación..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center justify-center gap-2"
          >
            <span className="text-xl"><Icon name="filter" className="w-6 h-6" /></span>
            Buscar Por
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center"></div>
    </div>
  );
};

export default MovimientosListPage;
