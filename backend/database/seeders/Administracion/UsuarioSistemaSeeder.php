<?php

namespace Database\Seeders\Administracion;

use App\Models\Administracion\UsuarioSistema;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuarioSistemaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UsuarioSistema::create([
            'email' => 'admin@gsa.com',
            'password' => Hash::make('admin123'),
            'rol_id' => 1, // Administrador
        ]);

        UsuarioSistema::create([
            'email' => 'usuario@gsa.com',
            'password' => Hash::make('usuario123'),
            'rol_id' => 2, // Usuario
        ]);
    }
}
