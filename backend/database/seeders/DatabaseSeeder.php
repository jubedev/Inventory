<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\Administracion\{RoleSeeder, UsuarioSistemaSeeder};
use Database\Seeders\Inventario\TipoEquipoSeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Llamar a los seeders en orden
        $this->call([
            RoleSeeder::class,
            UsuarioSistemaSeeder::class,
            TipoEquipoSeeder::class,
        ]);
    }
}
