<?php

namespace Database\Seeders\Administracion;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RazonSocialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $razonesSociales = [
            [
                'nombre' => 'GSA Tecnología S.A.S.',
                'direccion' => 'Calle 100 #15-45, Bogotá D.C.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'GSA Innovación Ltda.',
                'direccion' => 'Carrera 7 #71-21, Edificio Torre Central, Bogotá D.C.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'GSA Solutions S.A.',
                'direccion' => 'Avenida El Dorado #68-90, Bogotá D.C.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('razon_social')->insert($razonesSociales);
    }
}
