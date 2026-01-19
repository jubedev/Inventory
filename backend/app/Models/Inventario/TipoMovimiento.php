<?php

namespace App\Models\Inventario;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoMovimiento extends Model
{
    /** @use HasFactory<\Database\Factories\Inventario\TipoMovimientoFactory> */
    use HasFactory;

    protected $table = 'tipo_movimientos';

    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relación: Un tipo de movimiento puede tener muchos movimientos
     */
    public function movimientos()
    {
        return $this->hasMany(MovimientoInventario::class, 'tipo_movimiento_id');
    }
}
