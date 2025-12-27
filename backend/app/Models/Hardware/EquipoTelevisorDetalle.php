<?php

namespace App\Models\Hardware;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Inventario\Equipo;

class EquipoTelevisorDetalle extends Model
{
    use HasFactory;

    protected $table = 'equipo_televisor_detalles';

    protected $fillable = [
        'tipo_conexion',
        'pulgadas',
        'cc',
        'equipos_id',
    ];

    protected $casts = [
        'pulgadas' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function equipo(): BelongsTo
    {
        return $this->belongsTo(Equipo::class, 'equipos_id');
    }
}
