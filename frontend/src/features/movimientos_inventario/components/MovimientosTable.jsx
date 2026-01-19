import { formatDate } from "../../../utils/validators";

const MovimientosTable = ({
  movimientos,
  loading,
  onView,
  onEdit,
  onDelete,
}) => {
  const getTipoBadge = (tipo) => {
    const badges = {
      Ingreso: "bg-green-100 text-green-800",
      Asignación: "bg-blue-100 text-blue-800",
      Devolución: "bg-yellow-100 text-yellow-800",
      Traslado: "bg-purple-100 text-purple-800",
      Mantenimiento: "bg-orange-100 text-orange-800",
      Baja: "bg-red-100 text-red-800",
      Préstamo: "bg-cyan-100 text-cyan-800",
    };
    return badges[tipo] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Fecha
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Equipo
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Tipo
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Ubicación
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Usuario
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Estado
              </th>
              <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {movimientos.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-12 text-gray-500">
                  <div className="flex flex-col items-center">
                    <span className="text-6xl mb-4">📋</span>
                    <p className="text-lg font-medium">
                      No hay movimientos registrados
                    </p>
                    <p className="text-sm">
                      Comienza un nuevo movimiento para verlos aquí.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              movimientos.map((movimiento) => (
                <tr
                  key={movimiento.id}
                  className={
                    movimiento.activo
                      ? "hover:bg-gray-50 transition-colors"
                      : "bg-gray-100 opacity-60"
                  }
                >
                  <td className="py-4 px-6 text-sm text-gray">
                    {formatDate(movimiento.fecha_movimiento)}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray">
                    <div className="font-medium text-gray-900">
                      {movimiento.equipo?.activo || '-'}
                    </div>
                    <p className="text-xs text-gray-500">
                      [{movimiento.equipo?.marca} {movimiento.equipo?.modelo}]
                    </p>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoBadge(
                        movimiento.tipoMovimiento?.nombre
                      )}`}
                    >
                      {movimiento.tipoMovimiento?.nombre || '-'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray">
                    {movimiento.ubicacion_destino || "-"}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray">
                    {movimiento.usuario
                      ? `${movimiento.usuario.nombres} ${movimiento.usuario.apellidos}`
                      : "N/A"}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray">
                    <span
                      className={
                        movimiento.activo
                          ? "bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                          : "bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium"
                      }
                    >
                      {" "}
                      {movimiento.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        onClick={() => onView(movimiento)}
                        title="Ver"
                      >
                        👁️
                      </button>
                      <button
                        className={
                          movimiento.activo
                            ? "p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all"
                            : "p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all opacity-50 cursor-not-allowed"
                        }
                        onClick={() => onEdit(movimiento)}
                        disabled={!movimiento.activo}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        onClick={() => onDelete(movimiento.id)}
                        disabled={!movimiento.activo}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovimientosTable;
