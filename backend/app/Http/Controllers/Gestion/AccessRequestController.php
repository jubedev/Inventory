<?php

namespace App\Http\Controllers\Gestion;

use App\Http\Controllers\Controller;
use App\Models\Gestion\AccessRequest;
use App\Models\Administracion\UsuarioSistema;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AccessRequestController extends Controller
{
    /**
     * Listar todas las solicitudes de acceso
     * GET /api/v1/access-requests
     */
    public function index(Request $request)
    {
        $query = AccessRequest::query()->with('revisor');

        // Filtrar por estado si se proporciona
        if ($request->has('estado')) {
            $query->where('estado', $request->estado);
        }

        $solicitudes = $query->orderBy('fecha_solicitud', 'desc')->get();

        return response()->json($solicitudes);
    }

    /**
     * Ver detalle de una solicitud
     * GET /api/v1/access-requests/{id}
     */
    public function show($id)
    {
        $solicitud = AccessRequest::with('revisor')->findOrFail($id);
        return response()->json($solicitud);
    }

    /**
     * Aprobar solicitud de acceso
     * POST /api/v1/access-requests/{id}/approve
     */
    public function approve(Request $request, $id)
    {
        $solicitud = AccessRequest::findOrFail($id);

        if ($solicitud->estado !== 'pendiente') {
            return response()->json([
                'message' => 'Esta solicitud ya fue procesada'
            ], Response::HTTP_BAD_REQUEST);
        }

        $validated = $request->validate([
            'password' => 'required|string|min:6',
            'rol_id' => 'nullable|exists:roles,id',
        ]);

        // Crear usuario del sistema
        $usuario = UsuarioSistema::create([
            'email' => $solicitud->email,
            'password' => Hash::make($validated['password']),
            'rol_id' => $validated['rol_id'] ?? 2, // Rol Usuario por defecto
        ]);

        // Actualizar solicitud
        $solicitud->update([
            'estado' => 'aprobado',
            'revisado_por' => $request->user()->id,
            'fecha_revision' => now(),
        ]);

        return response()->json([
            'message' => 'Solicitud aprobada y usuario creado exitosamente',
            'usuario' => $usuario,
            'solicitud' => $solicitud,
        ]);
    }

    /**
     * Rechazar solicitud de acceso
     * POST /api/v1/access-requests/{id}/reject
     */
    public function reject(Request $request, $id)
    {
        $solicitud = AccessRequest::findOrFail($id);

        if ($solicitud->estado !== 'pendiente') {
            return response()->json([
                'message' => 'Esta solicitud ya fue procesada'
            ], Response::HTTP_BAD_REQUEST);
        }

        $solicitud->update([
            'estado' => 'rechazado',
            'revisado_por' => $request->user()->id,
            'fecha_revision' => now(),
        ]);

        return response()->json([
            'message' => 'Solicitud rechazada',
            'solicitud' => $solicitud,
        ]);
    }

    /**
     * Eliminar solicitud
     * DELETE /api/v1/access-requests/{id}
     */
    public function destroy($id)
    {
        $solicitud = AccessRequest::findOrFail($id);
        $solicitud->delete();

        return response()->json([
            'message' => 'Solicitud eliminada correctamente'
        ]);
    }
}
