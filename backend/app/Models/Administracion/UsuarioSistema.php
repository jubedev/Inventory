<?php

namespace App\Models\Administracion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuarioSistema extends Model
{
    /** @use HasFactory<\Database\Factories\Administracion\UsuarioSistemaFactory> */
    use HasFactory;
    
    protected $table = 'usuarios_sistema';

    protected $fillable = [
        'email',
        'password',
        'roles_id',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public funcition rol()
    {
        return $this->belongsTo(Rol::class, 'roles_id');
    }
}
