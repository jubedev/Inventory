<?php

namespace App\Models\Hardware;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Inventario\Equipo;

class EquipoServidorDetalle extends Model
{
    use HasFactory;

    protected $table = 'equipo_servidor_detalles';

    protected $fillable = [
        'hostname',
        'tipo_servidor',
        'aplicaciones_instaladas',
        'procesador',
        'ram',
        'disco_duro',
        'sistema_operativo',
        'version_so',
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
