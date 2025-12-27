<?php

namespace App\Http\Controllers\Administracion;

use App\Http\Controllers\Controller;
use App\Models\Administracion\Usuario;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Usuario::with(['cargo', 'razonSocial']);

        if ($request->has('ciudad')) {
            $query->porCiudad($request->ciudad);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nombres', 'like', "%{$search}%")
                  ->orWhere('apellidos', 'like', "%{$search}%")
                  ->orWhere('correo_corporativo', 'like', "%{$search}%")
                  ->orWhere('num_doc', 'like', "%{$search}%");
            });
        }

        $usuarios = $query->paginate($request->get('per_page', 15));

        return response()->json($usuarios);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'num_doc' => 'required|integer|unique:usuarios,num_doc',
            'correo_corporativo' => 'required|email|max:255',
            'contrasena_actualizada' => 'required|string|max:255',
            'celular_corporativo' => 'nullable|integer',
            'celular_personal' => 'nullable|integer',
            'cuenta' => 'required|string|max:100',
            'ciudad' => 'required|string|max:100',
            'cargos_id' => 'required|exists:cargos,id',
            'razon_social_id' => 'required|exists:razon_social,id',
        ]);

        $usuario = Usuario::create($validated);
        $usuario->load(['cargo', 'razonSocial']);

        return response()->json([
            'message' => 'Usuario creado exitosamente',
            'data' => $usuario
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $usuario = Usuario::with([
            'cargo',
            'razonSocial',
            'activosAsignados.equipo',
            'actas'
        ])->findOrFail($id);

        return response()->json($usuario);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $usuario = Usuario::findOrFail($id);

        $validated = $request->validate([
            'nombres' => 'sometimes|string|max:100',
            'apellidos' => 'sometimes|string|max:100',
            'num_doc' => 'sometimes|integer|unique:usuarios,num_doc,' . $id,
            'correo_corporativo' => 'sometimes|email|max:255',
            'celular_corporativo' => 'nullable|integer',
            'celular_personal' => 'nullable|integer',
            'cuenta' => 'sometimes|string|max:100',
            'ciudad' => 'sometimes|string|max:100',
            'cargos_id' => 'sometimes|exists:cargos,id',
            'razon_social_id' => 'sometimes|exists:razon_social,id',
        ]);

        $usuario->update($validated);
        $usuario->load(['cargo', 'razonSocial']);

        return response()->json([
            'message' => 'Usuario actualizado exitosamente',
            'data' => $usuario
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $usuario = Usuario::findOrFail($id);
        $usuario->delete();

        return response()->json([
            'message' => 'Usuario eliminado exitosamente'
        ]);
    }
}
