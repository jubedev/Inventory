<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Inventario\{EquipoController, TipoEquipoController, ActivoAsignadoController, MovimientoInventarioController};
use App\Http\Controllers\Administracion\{UsuarioController, CargoController, RazonSocialController, AreaController};
use App\Http\Controllers\Gestion\{ActaController, AccessRequestController};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas públicas de autenticación
Route::prefix('v1/auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    
    // Rutas protegidas de autenticación
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

// Rutas públicas (sin autenticación)
Route::prefix('v1')->group(function () {
    
    // ============== MÓDULO INVENTARIO ==============
    // Equipos
    Route::get('equipos/stats', [EquipoController::class, 'stats']); // Stats antes del resource
    Route::apiResource('equipos', EquipoController::class);
    
    // Tipos de Equipo
    Route::apiResource('tipos-equipo', TipoEquipoController::class);
    
    // Activos Asignados
    Route::apiResource('activos-asignados', ActivoAsignadoController::class);
    
    // Movimientos de Inventario
    Route::apiResource('movimientos-inventario', MovimientoInventarioController::class);
    
    // ============== MÓDULO ADMINISTRACIÓN ==============
    // Usuarios
    Route::apiResource('usuarios', UsuarioController::class);
    
    // Cargos
    Route::apiResource('cargos', CargoController::class);
    
    // Razones Sociales
    Route::apiResource('razones-sociales', RazonSocialController::class);
    
    // Áreas
    Route::apiResource('areas', AreaController::class);
    
    // ============== MÓDULO GESTIÓN ==============
    // Actas
    Route::apiResource('actas', ActaController::class);
    
    // Access Requests (protegidas con autenticación para admin)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('access-requests', [AccessRequestController::class, 'index']);
        Route::get('access-requests/{id}', [AccessRequestController::class, 'show']);
        Route::post('access-requests/{id}/approve', [AccessRequestController::class, 'approve']);
        Route::post('access-requests/{id}/reject', [AccessRequestController::class, 'reject']);
        Route::delete('access-requests/{id}', [AccessRequestController::class, 'destroy']);
    });
});

/*
Rutas generadas automáticamente por apiResource:

GET    /api/v1/equipos              -> index()   (listar todos)
POST   /api/v1/equipos              -> store()   (crear nuevo)
GET    /api/v1/equipos/{id}         -> show()    (ver uno)
PUT    /api/v1/equipos/{id}         -> update()  (actualizar)
DELETE /api/v1/equipos/{id}         -> destroy() (eliminar)

Ejemplo de uso:
- GET  http://localhost/api/v1/equipos?search=Dell&estado=Disponible
- POST http://localhost/api/v1/equipos (con body JSON)
*/
