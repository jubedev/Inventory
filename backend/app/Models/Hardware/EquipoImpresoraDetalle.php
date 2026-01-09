<?php

namespace App\Models\Hardware;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};
use App\Models\Inventario\{Equipo, InventarioToner};

class EquipoImpresoraDetalle extends Model
{
    use HasFactory;

    protected $table = 'equipo_impresora_detalles';

    protected $fillable = [
        'sede',
        'piso_numero',
        'ubicacion_especifica_area',
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

    public function inventariosToner(): HasMany
    {
        return $this->hasMany(InventarioToner::class, 'equipos_impresoras_detalles_id');
    }
}
