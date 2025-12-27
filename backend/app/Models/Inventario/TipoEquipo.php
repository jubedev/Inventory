<?php

namespace App\Models\Inventario;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TipoEquipo extends Model
{
    use HasFactory;

    protected $table = 'tipos_equipo';

    protected $fillable = [
        'nombre_tipo',
        'descripcion',
    ];

    protected $casts = [
        'fecha_creacion' => 'datetime',
        'ultima_actualizacion' => 'datetime',
    ];

    // Laravel busca created_at/updated_at por defecto
    // Mapear a los nombres personalizados
    const CREATED_AT = 'fecha_creacion';
    const UPDATED_AT = 'ultima_actualizacion';

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
