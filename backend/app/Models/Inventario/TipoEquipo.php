<?php

namespace App\Models\Inventario;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TipoEquipo extends Model
{
    use HasFactory;

    protected $table = 'tipo_equipos';

    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relación: Un tipo de equipo puede tener muchos equipos
     */
    public function equipos(): HasMany
    {
        return $this->hasMany(Equipo::class, 'tipos_equipo_id');
    }

    /**
     * Scope: Buscar por nombre
     */
    public function scopeBuscarPorNombre($query, string $nombre)
    {
        return $query->where('nombre_tipo', 'like', "%{$nombre}%");
    }
}
