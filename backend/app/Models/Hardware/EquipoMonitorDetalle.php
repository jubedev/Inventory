<?php

namespace App\Models\Hardware;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Inventario\Equipo;

class EquipoMonitorDetalle extends Model
{
    use HasFactory;

    protected $table = 'equipo_monitor_detalles';

    protected $fillable = [
        'tamano_pulgadas',
        'equipo_id',
    ];

    protected $casts = [
        'tamano_pulgadas' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function equipo(): BelongsTo
    {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }
}
