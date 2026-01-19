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
     * Listar todos los movimientos
     * GET /api/v1/movimientos
     * 
     * TODO: Implementar listado con relaciones (equipo, usuario, acta, tipoMovimiento)
     * TODO: Agregar filtro por activo (solo mostrar movimientos activos)
     * TODO: Agregar paginación
     */
    public function index(Request $request)
    {
        $query = MovimientoInventario::with([
            'equipo:id,activo,marca,modelo,serial',
            'usuario:id,nombres,apellidos,email',
            'acta:id,numero_acta',
            'tipoMovimiento:id,nombre'
        ]);

        // Filtro por estado activo/inactivo
        if ($request->filled('activo')) {
            // Solo filtrar si activo tiene un valor (no vacío)
            $query->where('activo', $request->activo);
        }
        // Si no se especifica o está vacío, mostrar todos (activos e inactivos)

        // Filtros opcionales
        if ($request->has('equipo_id')) {
            $query->where('equipo_id', $request->equipo_id);
        }

        if ($request->has('usuario_id')) {
            $query->where('usuario_id', $request->usuario_id);
        }

        if ($request->has('tipo_movimiento_id')) {
            $query->where('tipo_movimiento_id', $request->tipo_movimiento_id);
        }

        if ($request->has('acta_id')) {
            $query->where('acta_id', $request->acta_id);
        }

        $perPage = $request->get('per_page', 15);
        $movimientos = $query->orderBy('activo', 'desc')  // Activos primero (1 > 0)
                             ->orderBy('fecha_movimiento', 'desc')
                             ->paginate($perPage);

        return response()->json($movimientos, Response::HTTP_OK);
    }

    /**
     * Registrar un nuevo movimiento de inventario
     * POST /api/v1/movimientos
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fecha_movimiento' => 'required|date|before_or_equal:today',
            'ubicacion_destino' => 'nullable|string|max:255',
            'proveedor_cliente_involucrado' => 'nullable|string|max:255',
            'observaciones' => 'nullable|string|max:1000',
            'equipo_id' => 'required|exists:equipos,id',
            'usuario_id' => 'nullable|exists:usuarios,id',
            'acta_id' => 'nullable|exists:actas,id',
            'tipo_movimiento_id' => 'required|exists:tipo_movimientos,id',
        ], [
            'fecha_movimiento.date' => 'La fecha no es válida.',
            'equipo_id.exists' => 'El equipo seleccionado no existe.',
            'usuario_id.exists' => 'El usuario seleccionado no existe.',
            'acta_id.exists' => 'El acta seleccionada no existe.',
            'tipo_movimiento_id.exists' => 'El tipo de movimiento seleccionado no existe.',
        ]);

        $validated['activo'] = 1; // Establecer activo en 1 al crear
        $movimiento = MovimientoInventario::create($validated);
        $movimiento->load(['equipo', 'usuario', 'acta', 'tipoMovimiento']);

        return response()->json([
            'message' => 'Movimiento de inventario registrado exitosamente.',
            'data' => $movimiento
        ], Response::HTTP_CREATED);
    }

    /**
     * Ver detalles de un movimiento específico
     * GET /api/v1/movimientos/{id}
     */
    public function show($id)
    {
        $movimiento = MovimientoInventario::with([
            'equipo:id,activo,marca,modelo,serial', 
            'usuario:id,nombres,apellidos,email', 
            'acta:id,numero_acta', 
            'tipoMovimiento:id,nombre'
            ])
                        ->findOrFail($id);
                        
        Log::info("Detalles del movimiento de inventario con ID $id consultados.");
        
        return response()->json($movimiento, Response::HTTP_OK);
    }

    /**
     * Actualizar un movimiento
     * PUT /api/v1/movimientos/{id}
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'fecha_movimiento' => 'sometimes|date|before_or_equal:today',
            'ubicacion_destino' => 'nullable|string|max:255',
            'proveedor_cliente_involucrado' => 'nullable|string|max:255',
            'observaciones' => 'nullable|string|max:1000',
            'equipo_id' => 'sometimes|exists:equipos,id',
            'usuario_id' => 'nullable|exists:usuarios,id',
            'acta_id' => 'nullable|exists:actas,id',
            'tipo_movimiento_id' => 'sometimes|exists:tipo_movimientos,id',
        ], [
            'fecha_movimiento.date' => 'La fecha no es válida.',
            'equipo_id.exists' => 'El equipo seleccionado no existe.',
            'usuario_id.exists' => 'El usuario seleccionado no existe.',
            'acta_id.exists' => 'El acta seleccionada no existe.',
            'tipo_movimiento_id.exists' => 'El tipo de movimiento seleccionado no existe.',
        ]);

        $movimiento = MovimientoInventario::where('activo', 1)->findOrFail($id);

        $movimiento->update($validated);

        $movimiento->load(['equipo', 'usuario', 'acta', 'tipoMovimiento']);

        Log::info("Movimiento de inventario con ID $id actualizado.");

        return response()->json([
            'message' => 'Movimiento de inventario actualizado exitosamente.',
            'data' => $movimiento
        ], Response::HTTP_OK);
    }

    /**
     * Desactivar un movimiento (soft delete)
     * DELETE /api/v1/movimientos/{id}
     * 
     * TODO: Cambiar 'activo' a 0 en vez de eliminar
     */
    public function destroy($id)
    {
       $movimiento = MovimientoInventario::where('activo', 1)->findOrFail($id);

       Log::info("Movimiento de inventario con ID $id eliminado.");

       $movimiento->update(['activo' => 0]);

       return response()->json([
           'message' => 'Movimiento de inventario eliminado exitosamente.'
       ], Response::HTTP_OK);
    }
}
