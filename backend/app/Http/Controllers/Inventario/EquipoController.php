<?php

namespace App\Http\Controllers\Inventario;

use App\Http\Controllers\Controller;
use App\Models\Inventario\Equipo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EquipoController extends Controller
{
    /**
     * Display a listing of the resource.
     * GET /api/equipos
     */
    public function index(Request $request)
    {
        $query = Equipo::with(['tipoEquipo', 'activoAsignado.usuario']);

        // Filtros opcionales
        if ($request->has('estado')) {
            $query->where('estado', $request->estado);
        }

        if ($request->has('tipo_equipo_id')) {
            $query->where('tipo_equipo_id', $request->tipo_equipo_id);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('activo', 'like', "%{$search}%")
                  ->orWhere('marca', 'like', "%{$search}%")
                  ->orWhere('modelo', 'like', "%{$search}%")
                  ->orWhere('serial', 'like', "%{$search}%");
            });
        }

        // Paginación
        $perPage = $request->get('per_page', 15);
        $equipos = $query->paginate($perPage);

        return response()->json($equipos);
    }

    /**
     * Store a newly created resource in storage.
     * POST /api/equipos
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'activo' => 'required|string|max:100|unique:equipos,activo',
            'marca' => 'required|string|max:100',
            'modelo' => 'required|string|max:100',
            'serial' => 'required|string|max:100|unique:equipos,serial',
            'estado' => 'required|string|max:100',
            'ubicacion' => 'nullable|string|max:255',
            'fecha_compra' => 'nullable|date',
            'costo' => 'nullable|numeric|min:0',
            'direccion_ip' => 'nullable|string|max:50',
            'mac_address' => 'nullable|string|max:50',
            'observaciones' => 'nullable|string',
            'tipo_equipo_id' => 'required|exists:tipo_equipos,id',
        ]);

        $equipo = Equipo::create($validated);
        $equipo->load('tipoEquipo');

        return response()->json([
            'message' => 'Equipo creado exitosamente',
            'data' => $equipo
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     * GET /api/equipos/{id}
     */
    public function show(string $id)
    {
        $equipo = Equipo::with([
            'tipoEquipo',
            'activoAsignado.usuario',
            'activoAsignado.acta',
            'movimientos.usuario',
            'movimientos.tipoMovimiento'
        ])->findOrFail($id);

        // Cargar detalle específico según tipo
        $detalle = $equipo->getDetalleEspecifico();
        $equipo->detalle_especifico = $detalle;

        return response()->json($equipo);
    }

    /**
     * Update the specified resource in storage.
     * PUT/PATCH /api/equipos/{id}
     */
    public function update(Request $request, string $id)
    {
        $equipo = Equipo::findOrFail($id);

        $validated = $request->validate([
            'activo' => 'sometimes|string|max:100|unique:equipos,activo,' . $id,
            'marca' => 'sometimes|string|max:100',
            'modelo' => 'sometimes|string|max:100',
            'serial' => 'sometimes|string|max:100|unique:equipos,serial,' . $id,
            'estado' => 'sometimes|string|max:100',
            'ubicacion' => 'nullable|string|max:255',
            'fecha_compra' => 'nullable|date',
            'costo' => 'nullable|numeric|min:0',
            'direccion_ip' => 'nullable|string|max:50',
            'mac_address' => 'nullable|string|max:50',
            'observaciones' => 'nullable|string',
            'tipo_equipo_id' => 'sometimes|exists:tipo_equipos,id',
        ]);

        $equipo->update($validated);
        $equipo->load('tipoEquipo');

        return response()->json([
            'message' => 'Equipo actualizado exitosamente',
            'data' => $equipo
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * DELETE /api/equipos/{id}
     */
    public function destroy(string $id)
    {
        $equipo = Equipo::findOrFail($id);
        $equipo->delete();

        return response()->json([
            'message' => 'Equipo eliminado exitosamente'
        ]);
    }

    /**
     * Get equipment statistics
     * GET /api/equipos/stats
     */
    public function stats()
    {
        $stats = [
            'total' => Equipo::count(),
            'disponibles' => Equipo::where('estado', 'Disponible')->count(),
            'asignados' => Equipo::where('estado', 'Asignado')->count(),
            'en_mantenimiento' => Equipo::where('estado', 'Mantenimiento')->count(),
            'por_tipo' => Equipo::selectRaw('tipo_equipo_id, COUNT(*) as total')
                ->groupBy('tipo_equipo_id')
                ->with('tipoEquipo:id,nombre')
                ->get()
        ];

        return response()->json($stats);
    }
}
