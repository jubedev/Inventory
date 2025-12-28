<?php

namespace App\Http\Controllers\Administracion;

use App\Http\Controllers\Controller;
use App\Models\Administracion\UsuarioSistema;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UsuarioSistemaController extends Controller
{
    /**
     * Listar todos los usuarios del sistema
     * GET /api/v1/usuarios-sistema
     */
    public function index()
    {
        $usuarios = UsuarioSistema::with('rol')->orderBy('created_at', 'desc')->get();
        return response()->json($usuarios);
    }

    /**
     * Ver detalle de un usuario
     * GET /api/v1/usuarios-sistema/{id}
     */
    public function show($id)
    {
        $usuario = UsuarioSistema::with('rol')->findOrFail($id);
        return response()->json($usuario);
    }

    /**
     * Revocar acceso a un usuario
     * POST /api/v1/usuarios-sistema/{id}/revoke
     */
    public function revoke($id)
    {
        $usuario = UsuarioSistema::findOrFail($id);

        if ($usuario->estado === 'revocado') {
            return response()->json([
                'message' => 'Este usuario ya tiene el acceso revocado'
            ], Response::HTTP_BAD_REQUEST);
        }

        $usuario->update(['estado' => 'revocado']);

        // Eliminar todos los tokens de acceso del usuario
        $usuario->tokens()->delete();

        return response()->json([
            'message' => 'Acceso revocado correctamente',
            'usuario' => $usuario,
        ]);
    }

    /**
     * Restaurar acceso a un usuario
     * POST /api/v1/usuarios-sistema/{id}/restore
     */
    public function restore($id)
    {
        $usuario = UsuarioSistema::findOrFail($id);

        if ($usuario->estado === 'activo') {
            return response()->json([
                'message' => 'Este usuario ya tiene acceso activo'
            ], Response::HTTP_BAD_REQUEST);
        }

        $usuario->update(['estado' => 'activo']);

        return response()->json([
            'message' => 'Acceso restaurado correctamente',
            'usuario' => $usuario,
        ]);
    }
}
