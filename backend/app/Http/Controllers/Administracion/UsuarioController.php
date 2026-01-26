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
        $query = Usuario::with(['area', 'cargo', 'razonSocial']);

        if ($request->has('ciudad')) {
            $query->porCiudad($request->ciudad);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nombres', 'like', "%{$search}%")
                  ->orWhere('apellidos', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('numero_documento', 'like', "%{$search}%");
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
            'nombres' => 'required|string|max:50',
            'apellidos' => 'required|string|max:50',
            'numero_documento' => 'required|string|max:50|unique:usuarios,numero_documento',
            'email' => 'required|email|max:100|unique:usuarios,email',
            'telefono' => 'nullable|string|max:20',
            'telefono_corporativo' => 'nullable|string|max:20',
            'ciudad' => 'nullable|string|max:50',
            'estado' => 'nullable|in:Activo,Inactivo,Suspendido',
            'area_id' => 'required|exists:areas,id',
            'cargo_id' => 'required|exists:cargos,id',
            'razon_social_id' => 'required|exists:razon_social,id',
        ]);

        $usuario = Usuario::create($validated);
        $usuario->load(['area', 'cargo', 'razonSocial']);

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
            'nombres' => 'sometimes|string|max:50',
            'apellidos' => 'sometimes|string|max:50',
            'numero_documento' => 'sometimes|string|max:50|unique:usuarios,numero_documento,' . $id,
            'email' => 'sometimes|email|max:100|unique:usuarios,email,' . $id,
            'telefono' => 'nullable|string|max:20',
            'telefono_corporativo' => 'nullable|string|max:20',
            'ciudad' => 'nullable|string|max:50',
            'estado' => 'nullable|in:Activo,Inactivo,Suspendido',
            'area_id' => 'sometimes|exists:areas,id',
            'cargo_id' => 'sometimes|exists:cargos,id',
            'razon_social_id' => 'sometimes|exists:razon_social,id',
        ]);

        $usuario->update($validated);
        $usuario->load(['area', 'cargo', 'razonSocial']);

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
