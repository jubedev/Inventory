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
        'usuario_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function usuario () {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function activoAsignado () {
        return $this->hasMany(ActivoAsignado::class, 'acta_id');
    }

    public function movimientoInventario () {
        return $this->hasMany(MovimientoInventario::class, 'acta_id');
    }
}
