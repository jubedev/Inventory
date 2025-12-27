<?php

namespace App\Models\Gestion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Administracion\UsuarioSistema;

class AccessRequest extends Model
{
    use HasFactory;

    protected $table = 'acs_req';

    protected $fillable = [
        'estado',
        'revisado_por',
        'fecha_solicitud',
        'fecha_revision',
        'usuarios_sistema_id',
    ];

    protected $casts = [
        'fecha_solicitud' => 'datetime',
        'fecha_revision' => 'datetime',
    ];

    /**
     * Relación: Una solicitud pertenece a un usuario del sistema
     */
    public function usuarioSistema(): BelongsTo
    {
        return $this->belongsTo(UsuarioSistema::class, 'usuarios_sistema_id');
    }

    /**
     * Scope: Solicitudes pendientes
     */
    public function scopePendientes($query)
    {
        return $query->where('estado', 'pendiente');
    }

    /**
     * Scope: Solicitudes activas
     */
    public function scopeActivas($query)
    {
        return $query->where('estado', 'activo');
    }
}
