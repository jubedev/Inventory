<?php

namespace App\Models\Gestion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Administracion\UsuarioSistema;

class AccessRequest extends Model
{
    use HasFactory;

    protected $table = 'access_requests';

    protected $fillable = [
        'email',
        'nombre_completo',
        'motivo_solicitud',
        'estado',
        'revisado_por',
        'fecha_solicitud',
        'fecha_revision',
    ];

    protected $casts = [
        'fecha_solicitud' => 'datetime',
        'fecha_revision' => 'datetime',
    ];

    /**
     * Relación: Usuario administrador que revisó la solicitud
     */
    public function revisor(): BelongsTo
    {
        return $this->belongsTo(UsuarioSistema::class, 'revisado_por');
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
