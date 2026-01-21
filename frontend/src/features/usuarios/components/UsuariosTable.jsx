const UsuariosTable = ({ usuarios, loading, onEdit, onDelete, onView }) => {
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
}

export default UsuariosTable