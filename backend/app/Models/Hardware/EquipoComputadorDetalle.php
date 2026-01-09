<?php

namespace App\Models\Hardware;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Inventario\Equipo;

class EquipoComputadorDetalle extends Model
{
    use HasFactory;

    protected $table = 'equipo_computador_detalles';

    protected $fillable = [
        'procesador',
        'ram',
        'disco_duro',
        'sistema_operativo',
        'version_so',
        'mac_wifi',
        'mac_lan',
        'cantidad_mouse',
        'cantidad_teclados',
        'cantidad_multipuertos',
        'cantidad_adaptadores',
        'cantidad_cables_red',
        'equipo_id',
    ];

    protected $casts = [
        'cantidad_mouse' => 'integer',
        'cantidad_teclados' => 'integer',
        'cantidad_multipuertos' => 'integer',
        'cantidad_adaptadores' => 'integer',
        'cantidad_cables_red' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relación: El detalle pertenece a un equipo (1:1)
     */
    public function equipo(): BelongsTo
    {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }

    /**
     * Accessor: Total de periféricos
     */
    public function getTotalPerifericosAttribute(): int
    {
        return ($this->cantidad_mouse ?? 0) +
               ($this->cantidad_teclados ?? 0) +
               ($this->cantidad_multipuertos ?? 0) +
               ($this->cantidad_adaptadores ?? 0) +
               ($this->cantidad_cables_red ?? 0);
    }

    /**
     * Accessor: Información resumida de especificaciones
     */
    public function getEspecificacionesResumenAttribute(): string
    {
        return "{$this->procesador} | RAM: {$this->ram} | HDD: {$this->disco_duro}";
    }
}
