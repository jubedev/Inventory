<?php

namespace App\Models\Hardware;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Inventario\Equipo;

class EquipoCelularDetalle extends Model
{
    use HasFactory;

    protected $table = 'equipo_celular_detalles';

    protected $fillable = [
        'memoria_ram',
        'almacenamiento',
        'imei_1',
        'imei_2',
        'numero_linea',
        'cuenta_celular',
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
