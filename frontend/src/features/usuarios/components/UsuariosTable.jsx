import PropTypes from 'prop-types'

const UsuariosTable = ({ usuarios, loading, onEdit, onDelete }) => {
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

  if (usuarios.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="w-16 h-16 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <p className="text-gray-500 text-lg">No hay usuarios registrados</p>
        </div>
      </div>
    );
  }

  const getEstadoBadge = (estado) => {
    const badges = {
      activo: "bg-green-100 text-green-800",
      inactivo: "bg-red-100 text-red-800",
    };
    return badges[estado?.toLowerCase()] || badges.activo;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                N.Documento
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Nombres
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Apellidos
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Correo
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Telefono
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Telefono C.
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Ciudad
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Area
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Cargo
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Razon Social
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Estado
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 whitespace-nowrap">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {usuarios.map((usuario) => (
              <tr
                key={usuario.id}
                className="hober:bg-gray-50 transition-colors"
              >
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {usuario.numero_documento}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {usuario.nombres}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {usuario.apellidos}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {usuario.email}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {usuario.telefono}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {usuario.telefono_corporativo}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {usuario.ciudad}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {usuario.area ? usuario.area.nombre : "Sin Area"}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {usuario.cargo ? usuario.cargo.nombre : "Sin Cargo"}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {usuario.razon_social
                      ? usuario.razon_social.nombre
                      : "Sin Area"}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoBadge(usuario.estado)}`}
                    >
                      {usuario.estado}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(usuario)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                      onClick={() => onDelete(usuario.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {usuarios.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Mostrando <span className="font-semibold">{usuarios.length}</span> usuario(s)
          </p>
        </div>
      )}
    </div>
  );
};

UsuariosTable.propTypes = {
  usuarios: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UsuariosTable;