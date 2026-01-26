<?php

namespace Database\Seeders\Administracion;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CargoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cargos = [
            [
                'nombre' => 'Gerente General',
                'descripcion' => 'Máximo responsable de la organización',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Gerente de Área',
                'descripcion' => 'Responsable de la gestión de un área específica',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Coordinador',
                'descripcion' => 'Coordinador de equipos de trabajo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Desarrollador Senior',
                'descripcion' => 'Desarrollador de software con experiencia avanzada',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Desarrollador Junior',
                'descripcion' => 'Desarrollador de software en etapa inicial',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Analista',
                'descripcion' => 'Analista de procesos y sistemas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Asistente',
                'descripcion' => 'Asistente administrativo o de área',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Contador',
                'descripcion' => 'Profesional contable',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Auxiliar Contable',
                'descripcion' => 'Apoyo en tareas contables',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Vendedor',
                'descripcion' => 'Asesor comercial y de ventas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Diseñador Gráfico',
                'descripcion' => 'Profesional en diseño y comunicación visual',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Community Manager',
                'descripcion' => 'Gestor de redes sociales y comunidades',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('cargos')->insert($cargos);
    }
}
