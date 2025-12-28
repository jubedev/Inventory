<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Administracion\UsuarioSistema;
use App\Models\Gestion\AccessRequest;
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

        // Si el usuario no existe, password incorrecta, o está revocado: mismo mensaje genérico
        if (!$usuario || !Hash::check($request->password, $usuario->password) || $usuario->estado === 'revocado') {
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
     * Solicitud de acceso (registro)
     * POST /api/v1/auth/register
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email:rfc,dns|max:255|unique:usuarios_sistema,email|unique:access_requests,email',
            'nombre_completo' => 'required|string|min:5|max:255|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/',
            'motivo_solicitud' => 'nullable|string|max:1000',
        ], [
            'email.required' => 'El correo electrónico es obligatorio',
            'email.email' => 'Debes proporcionar un correo electrónico válido',
            'email.unique' => 'Este correo ya está registrado',
            'nombre_completo.required' => 'El nombre completo es obligatorio',
            'nombre_completo.min' => 'El nombre debe tener al menos 5 caracteres',
            'nombre_completo.regex' => 'El nombre solo puede contener letras y espacios',
            'motivo_solicitud.max' => 'El motivo no puede exceder 1000 caracteres',
        ]);

        // Crear solicitud de acceso pendiente
        $solicitud = AccessRequest::create([
            'email' => $validated['email'],
            'nombre_completo' => $validated['nombre_completo'],
            'motivo_solicitud' => $validated['motivo_solicitud'] ?? null,
            'estado' => 'pendiente',
            'fecha_solicitud' => now(),
        ]);

        return response()->json([
            'message' => 'Solicitud de acceso enviada correctamente. Un administrador la revisará pronto.',
            'solicitud' => [
                'id' => $solicitud->id,
                'email' => $solicitud->email,
                'estado' => $solicitud->estado,
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
