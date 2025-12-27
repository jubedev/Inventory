<?php

namespace App\Models\Administracion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Gestion\Acta;
use App\Models\Inventario\{ActivoAsignado, MovimientoInventario};

class Usuario extends Model
{
    use HasFactory;

    protected $table = 'usuarios';

    protected $fillable = [
        'nombres',
        'apellidos',
        'num_doc',
        'correo_corporativo',
        'contrasena_actualizada',
        'celular_corporativo',
        'celular_personal',
        'cuenta',
        'ciudad',
        'cargos_id',
        'razon_social_id',
    ];

    protected $hidden = [
        'contrasena_actualizada',
    ];

    protected $casts = [
        'celular_corporativo' => 'integer',
        'celular_personal' => 'integer',
        'num_doc' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relación: Un usuario pertenece a un cargo
     */
    public function cargo(): BelongsTo
    {
        return $this->belongsTo(Cargo::class, 'cargos_id');
    }

    /**
     * Relación: Un usuario pertenece a una razón social
     */
    public function razonSocial(): BelongsTo
    {
        return $this->belongsTo(RazonSocial::class, 'razon_social_id');
    }

    /**
     * Relación: Un usuario puede tener muchas actas
     */
    public function actas(): HasMany
    {
        return $this->hasMany(Acta::class, 'usuarios_id');
    }

    /**
     * Relación: Un usuario puede tener muchos activos asignados
     */
    public function activosAsignados(): HasMany
    {
        return $this->hasMany(ActivoAsignado::class, 'usuarios_id');
    }

    /**
     * Relación: Un usuario puede realizar muchos movimientos de inventario
     */
    public function movimientosInventario(): HasMany
    {
        return $this->hasMany(MovimientoInventario::class, 'usuarios_id');
    }

    /**
     * Accessor: Nombre completo del usuario
     */
    public function getNombreCompletoAttribute(): string
    {
        return "{$this->nombres} {$this->apellidos}";
    }

    /**
     * Scope: Filtrar por ciudad
     */
    public function scopePorCiudad($query, string $ciudad)
    {
        return $query->where('ciudad', $ciudad);
    }
}
