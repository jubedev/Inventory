<?php

namespace Database\Seeders\Administracion;

use App\Models\Administracion\Rol;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Rol::create([
            'nombre' => 'Administrador',
            'descripcion' => 'Usuario con acceso total al sistema'
        ]);

        Rol::create([
            'nombre' => 'Usuario',
            'descripcion' => 'Usuario con acceso limitado'
        ]);
    }
}
