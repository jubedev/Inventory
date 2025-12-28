<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Administracion\UsuarioSistema;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    /**
     * Login de usuario
     * POST /api/v1/auth/login
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $usuario = UsuarioSistema::where('email', $request->email)->first();

        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales proporcionadas son incorrectas.'],
            ]);
        }

        // Crear token de acceso
        $token = $usuario->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login exitoso',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $usuario->id,
                'email' => $usuario->email,
                'rol_id' => $usuario->rol_id,
            ]
        ], Response::HTTP_OK);
    }

    /**
     * Registro de nuevo usuario sistema
     * POST /api/v1/auth/register
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:usuarios_sistema,email',
            'password' => 'required|string|min:6|confirmed',
            'rol_id' => 'nullable|exists:roles,id',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['rol_id'] = $validated['rol_id'] ?? 2; // Rol usuario por defecto

        $usuario = UsuarioSistema::create($validated);

        // Crear token de acceso
        $token = $usuario->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Usuario registrado exitosamente',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $usuario->id,
                'email' => $usuario->email,
                'rol_id' => $usuario->rol_id,
            ]
        ], Response::HTTP_CREATED);
    }

    /**
     * Obtener usuario autenticado
     * GET /api/v1/auth/me
     */
    public function me(Request $request)
    {
        $usuario = $request->user();
        $usuario->load('rol');

        return response()->json([
            'user' => [
                'id' => $usuario->id,
                'email' => $usuario->email,
                'rol_id' => $usuario->rol_id,
                'rol' => $usuario->rol,
            ]
        ]);
    }

    /**
     * Logout de usuario
     * POST /api/v1/auth/logout
     */
    public function logout(Request $request)
    {
        // Eliminar el token actual
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout exitoso'
        ], Response::HTTP_OK);
    }
}
