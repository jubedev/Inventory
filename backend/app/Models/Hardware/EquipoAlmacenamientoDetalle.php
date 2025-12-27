<?php

namespace App\Models\Hardware;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Inventario\Equipo;

class EquipoAlmacenamientoDetalle extends Model
{
    use HasFactory;

    protected $table = 'equipo_almacenamiento_detalles';

    protected $fillable = [
        'capacidad',
        'tipo_interfaz',
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
