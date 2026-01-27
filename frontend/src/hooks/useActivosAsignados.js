import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

export const useActivosAsignados = () => {
  const [activosAsignados, setActivosAsignados] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActivosAsignados = useCallback(
    async (page = 1, perPage = 15, filters = {}) => {
      try {
        setLoading(true);
        setError(null);
        const params = { page, per_page: perPage, ...filters };
        const response = await api.get("/activos-asignados", { params });
        setActivosAsignados(response.data.data || response.data);
        setPagination({
          current_page: response.data.current_page || 1,
          last_page: response.data.last_page || 1,
          per_page: response.data.per_page || perPage,
          total: response.data.total || 0,
        });
        return { success: true, data: response.data };
      } catch (err) {
        setError(
          err.response?.data?.message || "Error al obtener activos asignados",
        );
        console.error(
          "useActivosAsignados: Error al obtener activos asignados",
          err,
        );
        return {
          success: false,
          error:
            err.response?.data?.message || "Error al obtener activos asignados",
        };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const createActivoAsignado = useCallback(async (activoData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/activos-asignados", activoData);
      setActivosAsignados((prev) => [...prev, response.data.data]);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear activo asignado");
      console.error("useActivosAsignados: Error al crear activo asignado", err);
      return {
        success: false,
        error: err.response?.data?.message || "Error al crear activo asignado",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateActivoAsignado = useCallback(async (id, activoData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put(`/activos-asignados/${id}`, activoData);
      setActivosAsignados((prev) =>
        prev.map((activo) => (activo.id === id ? response.data.data : activo))
      );
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error al actualizar activo asignado";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteActivoAsignado = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/activos-asignados/${id}`);
      setActivosAsignados((prev) => prev.filter((activo) => activo.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error al eliminar activo asignado";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const marcarDevolucion = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post(`/activos-asignados/${id}/marcar-devolucion`);
      setActivosAsignados((prev) =>
        prev.map((activo) => (activo.id === id ? response.data.data : activo))
      );
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error al marcar como devuelto";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivosAsignados();
  }, [fetchActivosAsignados]);

  return {
    activosAsignados,
    pagination,
    loading,
    error,
    fetchActivosAsignados,
    createActivoAsignado,
    updateActivoAsignado,
    deleteActivoAsignado,
    marcarDevolucion,
  };
};
