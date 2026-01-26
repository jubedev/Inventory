<?php

namespace Database\Seeders\Administracion;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $areas = [
            [
                'nombre' => 'Tecnología',
                'descripcion' => 'Área encargada del desarrollo y mantenimiento de sistemas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Recursos Humanos',
                'descripcion' => 'Gestión del talento humano y bienestar laboral',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Contabilidad',
                'descripcion' => 'Control financiero y contable de la organización',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Administración',
                'descripcion' => 'Gestión administrativa general',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Ventas',
                'descripcion' => 'Comercialización de productos y servicios',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Soporte Técnico',
                'descripcion' => 'Atención y soporte a clientes',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Marketing',
                'descripcion' => 'Estrategias de mercadeo y comunicación',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Logística',
                'descripcion' => 'Gestión de inventarios y distribución',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Calidad',
                'descripcion' => 'Control y aseguramiento de la calidad',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Operaciones',
                'descripcion' => 'Gestión de operaciones diarias',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('areas')->insert($areas);
    }
}

