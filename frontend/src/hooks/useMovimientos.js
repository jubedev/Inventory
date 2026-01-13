import { useState, useEffect } from "react";

export const useMovimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovimientos = useCallback( async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/movimientos_inventario');
      setMovimientos(response.data.data || response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al obtener movimientos de inventario';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMovimientos = (id) => {
    // Tu implementación aquí
  };

  useEffect(() => {
    fetchMovimientos();
  }, [fetchMovimientos]);

  return [
    movimientos,
    loading,
    error,
    fetchMovimientos,
    deleteMovimientos
  ];
};
