<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\Administracion\{
    RoleSeeder,
    UsuarioSistemaSeeder,
    RazonSocialSeeder,
    AreaSeeder,
    CargoSeeder,
    UsuarioSeeder
};
use Database\Seeders\Gestion\ActaSeeder;
use Database\Seeders\Inventario\{
    TipoEquipoSeeder,
    EquipoSeeder,
    TipoMovimientoSeeder,
    MovimientoInventarioSeeder
};

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Llamar a los seeders en orden (respetando foreign keys)
        $this->call([
            // Administración - tablas sin dependencias primero
            RoleSeeder::class,
            RazonSocialSeeder::class,
            AreaSeeder::class,
            CargoSeeder::class,
            
            // Administración - usuarios (depende de area, cargo, razon_social)
            UsuarioSeeder::class,
            UsuarioSistemaSeeder::class,
            
            // Gestión - actas (depende de usuarios)
            ActaSeeder::class,
            
            // Inventario
            TipoEquipoSeeder::class,
            EquipoSeeder::class,
            TipoMovimientoSeeder::class,
            MovimientoInventarioSeeder::class,
        ]);
    }
}

