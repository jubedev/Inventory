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
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function 
}
