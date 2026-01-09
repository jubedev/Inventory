<?php

namespace App\Models\Hardware;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Inventario\Equipo;

class EquipoTelefonoIpDetalle extends Model
{
    use HasFactory;

    protected $table = 'equipo_telefono_ip_detalles';

    protected $fillable = [
        'extension',
        'numero_parte',
        'equipo_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function equipo(): BelongsTo
    {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }
}
