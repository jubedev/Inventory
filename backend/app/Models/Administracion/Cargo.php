<?php

namespace App\Models\Administracion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cargo extends Model
{
    use HasFactory;

    protected $table = 'cargos';

    protected $fillable = [
        'nombreCargo',
        'descripcion',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relación: Un cargo puede tener muchos usuarios
     */
    public function usuarios(): HasMany
    {
        return $this->hasMany(Usuario::class, 'cargos_id');
    }
}
