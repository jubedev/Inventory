/**
 * Tipos globales para el sistema de Inventario
 */

// --- AUTENTICACIÓN Y USUARIOS ---

export interface Rol {
  id: number;
  nombre: string;
}

export interface User {
  id: number;
  nombre?: string;
  email: string;
  rol?: Rol;
  // Agrega más campos según tu API (ej: created_at, avatar)
}

export interface AppContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<{ success: boolean; message?: string; error?: string }>;
  isAuthenticated: boolean;
}

// --- HARDWARE / EQUIPOS ---

export interface HardwareType {
  id: number;
  nombre: string;
}

export interface HardwareEquipo {
  id: number;
  activo_fijo: string;
  serial: string;
  marca: string;
  modelo: string;
  tipo_id: number;
  tipo?: HardwareType;
  ubicacion?: string;
  estado?: string;
  // Agrega otros campos comunes de tu base de datos
}

// --- PAGINACIÓN ---

export interface PaginationInfo {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T[];
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
  message?: string;
}
