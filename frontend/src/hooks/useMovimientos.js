import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

export const useMovimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovimientos = useCallback( async (page = 1, perPage = 15, filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const params = { page, per_page: perPage, ...filters };
      const response = await api.get('/movimientos', { params });
      setMovimientos(response.data.data || response.data);
      setPagination({
        current_page: response.data.current_page || 1,
        last_page: response.data.last_page || 1,
        per_page: response.data.per_page || perPage,
        total: response.data.total || 0
      });
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al obtener movimientos de inventario';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const createMovimiento = useCallback( async (movimientoData) => {
    try {
      setLoading(true);
      setError(null); 
      const response = await api.post('/movimientos', movimientoData);
      setMovimientos((prev) => [...prev, response.data.data]);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al crear movimiento de inventario';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [])

  const updateMovimiento = useCallback( async (id, movimientoData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put(`/movimientos/${id}`, movimientoData);
      setMovimientos((prev) =>
        prev.map((movimiento) => (movimiento.id === id ? response.data.data : movimiento))
      );
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar movimiento de inventario';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [])

  const deleteMovimiento = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/movimientos/${id}`);
      await fetchMovimientos();
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al eliminar movimiento de inventario';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [fetchMovimientos])

  useEffect(() => {
    fetchMovimientos();
  }, [fetchMovimientos]);

  return {
    movimientos,
    pagination,
    loading,
    error,
    fetchMovimientos,
    createMovimiento,
    updateMovimiento,
    deleteMovimiento
  };
};
