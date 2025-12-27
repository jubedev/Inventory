<?php

namespace App\Models\Inventario;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivoAsignado extends Model
{
    /** @use HasFactory<\Database\Factories\Inventario\ActivoAsignadoFactory> */
    use HasFactory;

    protected $table = 'activos_asignados';
    
    protected $fillable = [
        'actas_id',
        'equipos_id',
        'usuarios_id',
        'fecha_asignacion',
        'fecha_devolucion',
        'estado',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'fecha_asignacion' => 'datetime',
        'fecha_devolucion' => 'datetime',
    ];

    public function acta () {
        return $this->belongsTo(Acta::class, 'actas_id');
    }

    public function usuario () {
        return $this->belongsTo(Usuario::class, 'usuarios_id');
    }

    public function equipo () {
        return $this->belongsTo(Equipo::class, 'equipos_id');
    }
}
