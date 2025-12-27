<?php

namespace App\Models\Inventario;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Hardware\EquipoImpresoraDetalle;

class InventarioToner extends Model
{
    use HasFactory;

    protected $table = 'inventario_toners';

    protected $fillable = [
        'fecha_registro',
        'toner_negro_cantidad',
        'toner_magenta_cantidad',
        'toner_cyan_cantidad',
        'toner_amarillo_cantidad',
        'equipos_impresoras_detalles_id',
    ];

    protected $casts = [
        'fecha_registro' => 'datetime',
        'toner_negro_cantidad' => 'integer',
        'toner_magenta_cantidad' => 'integer',
        'toner_cyan_cantidad' => 'integer',
        'toner_amarillo_cantidad' => 'integer',
    ];

    public $timestamps = false;

    /**
     * Relación: Pertenece a un detalle de impresora
     */
    public function impresoraDetalle(): BelongsTo
    {
        return $this->belongsTo(EquipoImpresoraDetalle::class, 'equipos_impresoras_detalles_id');
    }

    /**
     * Accessor: Total de toners
     */
    public function getTotalTonersAttribute(): int
    {
        return ($this->toner_negro_cantidad ?? 0) +
               ($this->toner_magenta_cantidad ?? 0) +
               ($this->toner_cyan_cantidad ?? 0) +
               ($this->toner_amarillo_cantidad ?? 0);
    }

    /**
     * Scope: Inventarios con stock bajo
     */
    public function scopeStockBajo($query, int $cantidad = 5)
    {
        return $query->where(function ($q) use ($cantidad) {
            $q->where('toner_negro_cantidad', '<', $cantidad)
              ->orWhere('toner_magenta_cantidad', '<', $cantidad)
              ->orWhere('toner_cyan_cantidad', '<', $cantidad)
              ->orWhere('toner_amarillo_cantidad', '<', $cantidad);
        });
    }
}
