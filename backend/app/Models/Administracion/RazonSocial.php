<?php

namespace App\Models\Administracion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RazonSocial extends Model
{
    /** @use HasFactory<\Database\Factories\Administracion\RazonSocialFactory> */
    use HasFactory;

    protected $table = 'razones_sociales';

    protected $fillable = [
        'nombre',
        'nit',
        'direccion',
        'telefono',
        'ciudad',
    ];

    protected $casts = [
        'telefono' => 'integer',
        'nit' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function usuarios()
    {
        return $this->hasMany(Usuario::class, 'razon_social_id');
    }
}
