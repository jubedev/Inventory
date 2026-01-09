import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

export const useMovimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovimientos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/movimientos");
      setMovimientos(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error al cargar los movimientos del inventario"
      );
      console.error("Error fetching movimiento", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMovimientos = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/movimientos/${id}`);
      setMovimientos((prev) =>
        prev.filter((movimiento) => movimiento.id !== id)
      );
      return { succes: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error al eliminar el registro";
      setError(errorMessage);
      return { succes: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovimientos();
  }, [fetchMovimientos]);

  return {
    movimientos,
    loading,
    error,
    fetchMovimientos,
    deleteMovimientos
  };
};
