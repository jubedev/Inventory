<?php

namespace App\Http\Controllers\Inventario;

use App\Http\Controllers\Controller;
use App\Models\Inventario\ActivoAsignado;
use Illuminate\Http\Request;

class ActivoAsignadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ActivoAsignado::with(['usuario', 'acta', 'equipo']);

        // Filtro por estado
        if ($request->has('estado')) {
            $query->where('estado', $request->estado);
        }

        // Filtro por usuario específico
        if ($request->has('usuario_id')) {
            $query->where('usuario_id', $request->usuario_id);
        }

        // Filtro por acta
        if($request->has('acta_id')) {
            $query->where('acta_id', $request->acta_id);
        }

        // Filtro por equipo
        if($request->has('equipo_id')) {
            $query->where('equipo_id', $request->equipo_id);
        }

        // Búsqueda general por equipo o usuario
        if($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                // Buscar en campos del equipo
                $q->whereHas('equipo', function ($equipoQuery) use ($search) {
                    $equipoQuery->where('activo', 'like', "%{$search}%")
                        ->orWhere('marca', 'like', "%{$search}%")
                        ->orWhere('modelo', 'like', "%{$search}%")
                        ->orWhere('serial', 'like', "%{$search}%");
                })
                // O buscar en campos del usuario
                ->orWhereHas('usuario', function ($usuarioQuery) use ($search) {
                    $usuarioQuery->where('nombres', 'like', "%{$search}%")
                        ->orWhere('apellidos', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            });
        }

        // Ordenar por fecha de asignación más reciente
        $query->orderBy('fecha_asignacion', 'desc');

        // Paginar resultados
        $perPage = $request->input('per_page', 15);
        $activosAsignados = $query->paginate($perPage);

        return response()->json($activosAsignados);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'usuario_id' => 'required|exists:usuarios,id',
            'equipo_id' => 'required|exists:equipos,id',
            'acta_id' => 'required|exists:actas,id',
            'fecha_asignacion' => 'required|date',
            'ubicacion_destino' => 'nullable|string|max:255',
            'observaciones' => 'nullable|string|max:500',
        ]);

        // Al crear una asignación, siempre es "asignado"
        $validated['estado'] = 'asignado';

        // El observer se encargará de actualizar el equipo y crear el movimiento
        $activoAsignado = ActivoAsignado::create($validated);
        $activoAsignado->load(['usuario', 'acta', 'equipo']);

        return response()->json([
            'message' => 'Activo asignado exitosamente',
            'data' => $activoAsignado
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $activoAsignado = ActivoAsignado::with(['usuario', 'acta', 'equipo'])->findOrFail($id);
        return response()->json(['data' => $activoAsignado]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ActivoAsignado $activoAsignado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $activoAsignado = ActivoAsignado::findOrFail($id);

        $validated = $request->validate([
            'usuario_id' => 'sometimes|required|exists:usuarios,id',
            'equipo_id' => 'sometimes|required|exists:equipos,id',
            'acta_id' => 'sometimes|required|exists:actas,id',
            'fecha_asignacion' => 'sometimes|required|date',
            'estado' => 'sometimes|required|in:asignado,disponible,mantenimiento,dado_de_baja,devolucion',
            'observaciones' => 'nullable|string|max:500',
        ]);

        // Si el estado cambia a "devolucion" y no tiene fecha de devolución, agregarla
        if (isset($validated['estado']) && $validated['estado'] === 'devolucion' && !$activoAsignado->fecha_devolucion) {
            $validated['fecha_devolucion'] = now()->toDateString();
        }

        $activoAsignado->update($validated);
        $activoAsignado->load(['usuario', 'acta', 'equipo']);

        return response()->json([
            'message' => 'Activo asignado actualizado exitosamente',
            'data' => $activoAsignado
        ]);
    }

    /**
     * Marcar un activo como devuelto
     */
    public function marcarDevolucion($id)
    {
        $activoAsignado = ActivoAsignado::findOrFail($id);
        
        // Verificar que esté asignado
        if ($activoAsignado->estado !== 'asignado') {
            return response()->json([
                'message' => 'Este activo no está en estado asignado'
            ], 400);
        }
        
        // El observer se encargará de actualizar el equipo y crear el movimiento
        $activoAsignado->update([
            'estado' => 'devuelto',
            'fecha_devolucion' => now()->toDateString()
        ]);
        
        $activoAsignado->load(['usuario', 'acta', 'equipo']);
        
        return response()->json([
            'message' => 'Equipo marcado como devuelto exitosamente',
            'data' => $activoAsignado
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $activoAsignado = ActivoAsignado::findOrFail($id);
        
        // El observer se encargará de actualizar el equipo si estaba asignado
        $activoAsignado->delete();

        return response()->json([
            'message' => 'Activo asignado eliminado exitosamente'
        ]);
    }
}
