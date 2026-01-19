<?php

namespace App\Models\Inventario;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Administracion\Usuario;

class MovimientoInventario extends Model
{
    /** @use HasFactory<\Database\Factories\Inventario\MovimientoInventarioFactory> */
    use HasFactory;

    protected $table = 'movimientos_inventario';

    protected $fillable = [
        'fecha_movimiento',
        'ubicacion_destino',
        'proveedor_cliente_involucrado',
        'observaciones',
        'equipo_id',
        'usuario_id',
        'acta_id',
        'tipo_movimiento_id',
        'activo',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'fecha_movimiento' => 'datetime',
        'activo' => 'boolean',
    ];

    public function equipo () {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }

    public function usuario () {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function acta()
    {
        return $this->belongsTo(\App\Models\Gestion\Acta::class, 'acta_id');
    }

    public function tipoMovimiento()
    {
        return $this->belongsTo(TipoMovimiento::class, 'tipo_movimiento_id');
    }
}
