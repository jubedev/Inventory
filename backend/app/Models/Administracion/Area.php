<?php

namespace App\Models\Administracion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    /**
     * Tabla asociada al modelo
     */
    protected $table = 'areas';

    /**
     * Los atributos que son asignables en masa.
     */
    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    /**
     * Los atributos que deben ser casteados.
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
