<?php

namespace App\Models\Hardware;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Inventario\Equipo;

class EquipoUpsDetalle extends Model
{
    use HasFactory;

    protected $table = 'equipo_ups_detalles';

    protected $fillable = [
        'potencia',
        'input_voltaje',
        'output_voltaje',
        'equipos_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function equipo(): BelongsTo
    {
        return $this->belongsTo(Equipo::class, 'equipos_id');
    }
}
