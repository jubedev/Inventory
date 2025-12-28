<?php

namespace App\Http\Controllers\Inventario;

use App\Http\Controllers\Controller;
use App\Models\Inventario\TipoEquipo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TipoEquipoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tipos = TipoEquipo::withCount('equipos')->get();
        return response()->json($tipos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|min:3|max:100|unique:tipo_equipos,nombre',
            'descripcion' => 'nullable|string|max:500',
        ], [
            'nombre.required' => 'El nombre del tipo de equipo es obligatorio',
            'nombre.min' => 'El nombre debe tener al menos 3 caracteres',
            'nombre.max' => 'El nombre no puede exceder 100 caracteres',
            'nombre.unique' => 'Este tipo de equipo ya existe',
            'descripcion.max' => 'La descripción no puede exceder 500 caracteres',
        ]);

        $tipo = TipoEquipo::create($validated);

        return response()->json([
            'message' => 'Tipo de equipo creado exitosamente',
            'data' => $tipo
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tipo = TipoEquipo::with('equipos')->findOrFail($id);
        return response()->json($tipo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tipo = TipoEquipo::findOrFail($id);

        $validated = $request->validate([
            'nombre' => 'sometimes|string|min:3|max:100|unique:tipo_equipos,nombre,' . $id,
            'descripcion' => 'nullable|string|max:500',
        ], [
            'nombre.min' => 'El nombre debe tener al menos 3 caracteres',
            'nombre.max' => 'El nombre no puede exceder 100 caracteres',
            'nombre.unique' => 'Este tipo de equipo ya existe',
            'descripcion.max' => 'La descripción no puede exceder 500 caracteres',
        ]);

        $tipo->update($validated);

        return response()->json([
            'message' => 'Tipo de equipo actualizado exitosamente',
            'data' => $tipo
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tipo = TipoEquipo::findOrFail($id);
        $tipo->delete();

        return response()->json([
            'message' => 'Tipo de equipo eliminado exitosamente'
        ]);
    }
}
