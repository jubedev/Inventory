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
            'activo' => 'required|string|min:3|max:100|unique:equipos,activo',
            'marca' => 'required|string|min:2|max:100',
            'modelo' => 'required|string|min:2|max:100',
            'serial' => 'required|string|min:3|max:100|unique:equipos,serial',
            'estado' => 'required|string|in:disponible,en uso,mantenimiento,dado de baja',
            'ubicacion' => 'nullable|string|max:255',
            'fecha_compra' => 'nullable|date|before_or_equal:today',
            'costo' => 'nullable|numeric|min:0|max:999999999.99',
            'direccion_ip' => 'nullable|ip',
            'mac_address' => 'nullable|regex:/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/',
            'observaciones' => 'nullable|string|max:1000',
            'tipo_equipo_id' => 'required|exists:tipo_equipos,id',
        ], [
            'activo.required' => 'El código de activo es obligatorio',
            'activo.min' => 'El código de activo debe tener al menos 3 caracteres',
            'activo.unique' => 'Este código de activo ya está registrado',
            'marca.required' => 'La marca es obligatoria',
            'marca.min' => 'La marca debe tener al menos 2 caracteres',
            'modelo.required' => 'El modelo es obligatorio',
            'modelo.min' => 'El modelo debe tener al menos 2 caracteres',
            'serial.required' => 'El serial es obligatorio',
            'serial.min' => 'El serial debe tener al menos 3 caracteres',
            'serial.unique' => 'Este serial ya está registrado',
            'estado.required' => 'El estado es obligatorio',
            'estado.in' => 'El estado debe ser: disponible, en uso, mantenimiento o dado de baja',
            'fecha_compra.before_or_equal' => 'La fecha de compra no puede ser futura',
            'costo.min' => 'El costo no puede ser negativo',
            'direccion_ip.ip' => 'La dirección IP no es válida',
            'mac_address.regex' => 'La dirección MAC debe tener el formato XX:XX:XX:XX:XX:XX',
            'tipo_equipo_id.required' => 'El tipo de equipo es obligatorio',
            'tipo_equipo_id.exists' => 'El tipo de equipo seleccionado no existe',
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
            'activo' => 'sometimes|string|min:3|max:100|unique:equipos,activo,' . $id,
            'marca' => 'sometimes|string|min:2|max:100',
            'modelo' => 'sometimes|string|min:2|max:100',
            'serial' => 'sometimes|string|min:3|max:100|unique:equipos,serial,' . $id,
            'estado' => 'sometimes|string|in:disponible,en uso,mantenimiento,dado de baja',
            'ubicacion' => 'nullable|string|max:255',
            'fecha_compra' => 'nullable|date|before_or_equal:today',
            'costo' => 'nullable|numeric|min:0|max:999999999.99',
            'direccion_ip' => 'nullable|ip',
            'mac_address' => 'nullable|regex:/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/',
            'observaciones' => 'nullable|string|max:1000',
            'tipo_equipo_id' => 'sometimes|exists:tipo_equipos,id',
        ], [
            'activo.min' => 'El código de activo debe tener al menos 3 caracteres',
            'activo.unique' => 'Este código de activo ya está registrado',
            'marca.min' => 'La marca debe tener al menos 2 caracteres',
            'modelo.min' => 'El modelo debe tener al menos 2 caracteres',
            'serial.min' => 'El serial debe tener al menos 3 caracteres',
            'serial.unique' => 'Este serial ya está registrado',
            'estado.in' => 'El estado debe ser: disponible, en uso, mantenimiento o dado de baja',
            'fecha_compra.before_or_equal' => 'La fecha de compra no puede ser futura',
            'costo.min' => 'El costo no puede ser negativo',
            'direccion_ip.ip' => 'La dirección IP no es válida',
            'mac_address.regex' => 'La dirección MAC debe tener el formato XX:XX:XX:XX:XX:XX',
            'tipo_equipo_id.exists' => 'El tipo de equipo seleccionado no existe',
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
            'disponibles' => Equipo::where('estado', 'disponible')->count(),
            'asignados' => Equipo::where('estado', 'en uso')->count(),
            'en_mantenimiento' => Equipo::where('estado', 'mantenimiento')->count(),
            'dados_de_baja' => Equipo::where('estado', 'dado de baja')->count(),
            'por_tipo' => Equipo::selectRaw('tipo_equipo_id, COUNT(*) as total')
                ->groupBy('tipo_equipo_id')
                ->with('tipoEquipo:id,nombre')
                ->get()
                ->map(function($item) {
                    return [
                        'tipo' => $item->tipoEquipo->nombre ?? 'Sin tipo',
                        'total' => $item->total
                    ];
                })
        ];

        return response()->json($stats);
    }
}
