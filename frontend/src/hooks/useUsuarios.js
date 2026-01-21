import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/usuarios");
      setUsuarios(response.data.data || response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener usuarios");
      console.error("useUsuarios: Error al obtener usuarios", err);
      return {
        success: false,
        error: err.response?.data?.message || "Error al obtener usuarios",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const createUsuario = useCallback(async (usuarioData) => {
    try { 
        setLoading(true);
        setError(null);
        const response = await api.post('/usuarios', usuarioData);
        setUsuarios((prev) => [...prev, response.data.data]);
        return { success: true, data: response.data };
    } catch (err) {
        const errorMessage = err.response?.data?.message || 'Error al crear usuario';
        setError(errorMessage);
        return { success: false, error: errorMessage };
    } finally {
        setLoading(false);
    }
  }, []);

  const updateUsuario = useCallback(async (id, usuarioData) => {
    try {
        setLoading(true);
        setError(null);
        const response = await api.put(`/usuarios/${id}`, usuarioData);
        setUsuarios((prev) =>
            prev.map((usuario) => (usuario.id === id ? response.data.data : usuario))
        );
        return { success: true, data: response.data };
    } catch (err) {
        const errorMessage = err.response?.data?.message || 'Error al actualizar usuario';
        setError(errorMessage);
        return { success: false, error: errorMessage };
    } finally {
        setLoading(false);
    }
  }, []);

  const deleteUsuario = useCallback(async (id) => {
    try {
        setLoading(true);
        setError(null);
        await api.delete(`/usuarios/${id}`);
        setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
        return { success: true };
    } catch (err) {
        const errorMessage = err.response?.data?.message || 'Error al eliminar usuario';
        setError(errorMessage);
        return { success: false, error: errorMessage };
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  return {
    usuarios,
    loading,
    error,
    fetchUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
  }
};
