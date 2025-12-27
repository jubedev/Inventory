<?php

namespace App\Models\Gestion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acta extends Model
{
    /** @use HasFactory<\Database\Factories\Gestion\ActaFactory> */
    use HasFactory;

    protected $table = 'actas';
    
    protected $fillable = [
        'numero_acta',
        'fecha',
        'descripcion',
        'usuarios_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function usuario () {
        return $this->belongsTo(Usuario::class, 'usuarios_id');
    }

    public function activoAsignado () {
        return $this->hasMany(ActivoAsignado::class, 'actas_id');
    }

    public function movimientoInventario () {
        return $this->hasMany(MovimientoInventario::class, 'actas_id');
    }
}
