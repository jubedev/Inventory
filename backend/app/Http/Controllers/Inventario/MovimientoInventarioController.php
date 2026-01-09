<?php

namespace App\Http\Controllers\Inventario;

use App\Http\Controllers\Controller;
use App\Models\Inventario\MovimientoInventario;
use App\Models\Inventario\Equipo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class MovimientoInventarioController extends Controller
{
    /**
     * Listar todos los movimientos con filtros opcionales
     * GET /api/v1/movimientos
     * 
     * Filtros disponibles:
     * - equipo_id: ID del equipo
     * - tipo_movimiento_id: Tipo de movimiento
     * - fecha_desde: Fecha inicio (Y-m-d)
     * - fecha_hasta: Fecha fin (Y-m-d)
     * - usuario_id: ID del usuario
     */
    public function index(Request $request)
    {
        try {
            // Iniciar query con relaciones
            $query = MovimientoInventario::with([
                'equipo:id,codigo_equipo,nombre,marca,modelo',
                'usuario:id,nombres,apellidos',
                'acta:id,numero_acta',
                'tipoMovimiento:id,nombre'
            ]);

            // FILTRO: Por equipo específico
            if ($request->has('equipo_id')) {
                $query->where('equipo_id', $request->equipo_id);
            }

            // FILTRO: Por tipo de movimiento
            if ($request->has('tipo_movimiento_id')) {
                $query->where('tipo_movimiento_id', $request->tipo_movimiento_id);
            }

            // FILTRO: Por rango de fechas
            if ($request->has('fecha_desde')) {
                $query->whereDate('fecha_movimiento', '>=', $request->fecha_desde);
            }
            if ($request->has('fecha_hasta')) {
                $query->whereDate('fecha_movimiento', '<=', $request->fecha_hasta);
            }

            // FILTRO: Por usuario
            if ($request->has('usuario_id')) {
                $query->where('usuario_id', $request->usuario_id);
            }

            // FILTRO: Búsqueda por código de equipo o observaciones
            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->whereHas('equipo', function ($equipoQuery) use ($search) {
                        $equipoQuery->where('codigo_equipo', 'like', "%{$search}%")
                                   ->orWhere('nombre', 'like', "%{$search}%");
                    })
                    ->orWhere('observaciones', 'like', "%{$search}%");
                });
            }

            // Ordenar por fecha más reciente primero
            $movimientos = $query->orderBy('fecha_movimiento', 'desc')
                                 ->paginate(20); // Paginación de 20 por página

            return response()->json($movimientos, Response::HTTP_OK);

        } catch (\Exception $e) {
            // Log del error para debugging
            Log::error('Error al listar movimientos: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'filters' => $request->all()
            ]);

            return response()->json([
                'error' => 'Error al obtener los movimientos',
                'message' => config('app.debug') ? $e->getMessage() : 'Error interno del servidor'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Registrar un nuevo movimiento de inventario
     * POST /api/v1/movimientos
     * 
     * ⚠️ NOTA: Normalmente no se usa directamente, los movimientos 
     * se crean automáticamente mediante Observers cuando:
     * - Se asigna un equipo (ActivoAsignadoObserver)
     * - Se envía a mantenimiento (ActaController)
     * 
     * Este método es para casos especiales o correcciones manuales
     */
    public function store(Request $request)
    {
        // PASO 1: VALIDACIÓN (No necesita try-catch, Laravel lo maneja)
        $validated = $request->validate([
            'equipo_id' => 'required|exists:equipos,id',
            'tipo_movimiento_id' => 'required|exists:tipo_movimientos,id',
            'ubicacion_destino' => 'required|string|max:255',
            
            // Campos opcionales según el tipo de movimiento
            'usuario_id' => 'nullable|exists:usuarios,id',
            'acta_id' => 'nullable|exists:actas,id',
            'proveedor_cliente_involucrado' => 'nullable|string|max:255',
            'observaciones' => 'nullable|string|max:1000',
            'fecha_movimiento' => 'nullable|date',
        ]);

        // PASO 2: LÓGICA DE NEGOCIO con manejo de errores
        try {
            // Iniciar transacción para garantizar atomicidad
            DB::beginTransaction();

            // Agregar fecha automática si no viene
            $validated['fecha_movimiento'] = $validated['fecha_movimiento'] ?? now();

            // Crear el movimiento
            $movimiento = MovimientoInventario::create($validated);

            // Cargar relaciones para la respuesta
            $movimiento->load([
                'equipo:id,codigo_equipo,nombre,marca,modelo',
                'usuario:id,nombres,apellidos',
                'acta:id,numero_acta',
                'tipoMovimiento:id,nombre'
            ]);

            // Confirmar transacción
            DB::commit();

            // Log de auditoría
            Log::info("Movimiento registrado manualmente", [
                'movimiento_id' => $movimiento->id,
                'equipo_id' => $movimiento->equipo_id,
                'usuario_auth' => auth()->id()
            ]);

            return response()->json([
                'message' => 'Movimiento registrado exitosamente',
                'data' => $movimiento
            ], Response::HTTP_CREATED);

        } catch (\Illuminate\Database\QueryException $e) {
            // Rollback en caso de error de BD
            DB::rollBack();

            // Log específico para errores de BD
            Log::error('Error de BD al crear movimiento: ' . $e->getMessage(), [
                'sql' => $e->getSql(),
                'bindings' => $e->getBindings(),
                'data' => $validated
            ]);

            return response()->json([
                'error' => 'Error al guardar el movimiento en la base de datos',
                'message' => config('app.debug') ? $e->getMessage() : 'Error de base de datos'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);

        } catch (\Exception $e) {
            // Rollback para cualquier otro error
            DB::rollBack();

            Log::error('Error inesperado al crear movimiento: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Error inesperado al registrar el movimiento',
                'message' => config('app.debug') ? $e->getMessage() : 'Error interno del servidor'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Ver detalles de un movimiento específico
     * GET /api/v1/movimientos/{id}
     */
    public function show($id)
    {
        try {
            $movimiento = MovimientoInventario::with([
                'equipo:id,codigo_equipo,nombre,marca,modelo,serie',
                'usuario:id,nombres,apellidos,email',
                'acta:id,numero_acta,fecha_acta',
                'tipoMovimiento:id,nombre,descripcion'
            ])->findOrFail($id);

            return response()->json($movimiento, Response::HTTP_OK);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Error específico: Registro no encontrado
            return response()->json([
                'error' => 'Movimiento no encontrado',
                'message' => "No existe un movimiento con ID: {$id}"
            ], Response::HTTP_NOT_FOUND);

        } catch (\Exception $e) {
            Log::error("Error al obtener movimiento {$id}: " . $e->getMessage());

            return response()->json([
                'error' => 'Error al obtener el movimiento',
                'message' => config('app.debug') ? $e->getMessage() : 'Error interno del servidor'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Obtener historial completo de movimientos de un equipo
     * GET /api/v1/equipos/{equipoId}/movimientos
     */
    public function historialEquipo($equipoId)
    {
        try {
            // Verificar que el equipo existe
            $equipo = Equipo::findOrFail($equipoId);

            $movimientos = MovimientoInventario::with([
                'usuario:id,nombres,apellidos',
                'acta:id,numero_acta,fecha_acta',
                'tipoMovimiento:id,nombre'
            ])
            ->where('equipo_id', $equipoId)
            ->orderBy('fecha_movimiento', 'desc')
            ->get();

            return response()->json([
                'equipo' => [
                    'id' => $equipo->id,
                    'codigo' => $equipo->codigo_equipo,
                    'nombre' => $equipo->nombre,
                    'estado_actual' => $equipo->estado
                ],
                'total_movimientos' => $movimientos->count(),
                'movimientos' => $movimientos
            ], Response::HTTP_OK);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Equipo no encontrado',
                'message' => "No existe un equipo con ID: {$equipoId}"
            ], Response::HTTP_NOT_FOUND);

        } catch (\Exception $e) {
            Log::error("Error al obtener historial del equipo {$equipoId}: " . $e->getMessage());

            return response()->json([
                'error' => 'Error al obtener el historial',
                'message' => config('app.debug') ? $e->getMessage() : 'Error interno del servidor'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Actualizar un movimiento (uso limitado, solo para correcciones)
     * PUT /api/v1/movimientos/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            $movimiento = MovimientoInventario::findOrFail($id);

            // Solo permitir actualizar ciertos campos
            $validated = $request->validate([
                'ubicacion_destino' => 'sometimes|string|max:255',
                'observaciones' => 'sometimes|string|max:1000',
                'proveedor_cliente_involucrado' => 'sometimes|string|max:255',
            ]);

            DB::beginTransaction();

            $movimiento->update($validated);

            DB::commit();

            // Log de auditoría
            Log::info("Movimiento actualizado", [
                'movimiento_id' => $id,
                'cambios' => $validated,
                'usuario_auth' => auth()->id()
            ]);

            return response()->json([
                'message' => 'Movimiento actualizado exitosamente',
                'data' => $movimiento->fresh()->load(['equipo', 'usuario', 'tipoMovimiento'])
            ], Response::HTTP_OK);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Movimiento no encontrado'
            ], Response::HTTP_NOT_FOUND);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error al actualizar movimiento {$id}: " . $e->getMessage());

            return response()->json([
                'error' => 'Error al actualizar el movimiento',
                'message' => config('app.debug') ? $e->getMessage() : 'Error interno'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Eliminar un movimiento (generalmente NO debe usarse)
     * DELETE /api/v1/movimientos/{id}
     * 
     * ⚠️ Solo para casos excepcionales o datos de prueba
     */
    public function destroy($id)
    {
        try {
            $movimiento = MovimientoInventario::findOrFail($id);

            DB::beginTransaction();

            // Log antes de eliminar
            Log::warning("Movimiento eliminado", [
                'movimiento_id' => $id,
                'equipo_id' => $movimiento->equipo_id,
                'usuario_auth' => auth()->id(),
                'data' => $movimiento->toArray()
            ]);

            $movimiento->delete();

            DB::commit();

            return response()->json([
                'message' => 'Movimiento eliminado exitosamente'
            ], Response::HTTP_OK);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Movimiento no encontrado'
            ], Response::HTTP_NOT_FOUND);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error al eliminar movimiento {$id}: " . $e->getMessage());

            return response()->json([
                'error' => 'Error al eliminar el movimiento',
                'message' => config('app.debug') ? $e->getMessage() : 'Error interno'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
