<?php

namespace Database\Seeders\Administracion;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usuarios = [
            [
                'nombres' => 'Carlos',
                'apellidos' => 'Martínez García',
                'numero_documento' => '1234567890',
                'email' => 'carlos.martinez@gsatecnologia.com',
                'telefono' => '3001234567',
                'telefono_corporativo' => '6012345678',
                'ciudad' => 'Bogotá',
                'area_id' => 1, // Tecnología
                'cargo_id' => 4, // Desarrollador Senior
                'razon_social_id' => 1,
                'estado' => 'activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombres' => 'María',
                'apellidos' => 'López Rodríguez',
                'numero_documento' => '1234567891',
                'email' => 'maria.lopez@gsatecnologia.com',
                'telefono' => '3009876543',
                'telefono_corporativo' => '6012345679',
                'ciudad' => 'Medellín',
                'area_id' => 2, // Recursos Humanos
                'cargo_id' => 2, // Gerente de Área
                'razon_social_id' => 1,
                'estado' => 'activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombres' => 'Juan',
                'apellidos' => 'Pérez Sánchez',
                'numero_documento' => '1234567892',
                'email' => 'juan.perez@gsatecnologia.com',
                'telefono' => '3101234567',
                'telefono_corporativo' => '6012345680',
                'ciudad' => 'Cali',
                'area_id' => 3, // Contabilidad
                'cargo_id' => 8, // Contador
                'razon_social_id' => 1,
                'estado' => 'activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombres' => 'Ana',
                'apellidos' => 'Gómez Torres',
                'numero_documento' => '1234567893',
                'email' => 'ana.gomez@gsatecnologia.com',
                'telefono' => '3201234567',
                'telefono_corporativo' => '6012345681',
                'ciudad' => 'Bogotá',
                'area_id' => 1, // Tecnología
                'cargo_id' => 5, // Desarrollador Junior
                'razon_social_id' => 1,
                'estado' => 'activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombres' => 'Luis',
                'apellidos' => 'Ramírez Castro',
                'numero_documento' => '1234567894',
                'email' => 'luis.ramirez@gsatecnologia.com',
                'telefono' => '3151234567',
                'telefono_corporativo' => '6012345682',
                'ciudad' => 'Barranquilla',
                'area_id' => 5, // Ventas
                'cargo_id' => 10, // Vendedor
                'razon_social_id' => 2,
                'estado' => 'activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombres' => 'Patricia',
                'apellidos' => 'Hernández Díaz',
                'numero_documento' => '1234567895',
                'email' => 'patricia.hernandez@gsatecnologia.com',
                'telefono' => '3051234567',
                'telefono_corporativo' => '6012345683',
                'ciudad' => 'Cartagena',
                'area_id' => 7, // Marketing
                'cargo_id' => 12, // Community Manager
                'razon_social_id' => 2,
                'estado' => 'activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombres' => 'Roberto',
                'apellidos' => 'Vargas Moreno',
                'numero_documento' => '1234567896',
                'email' => 'roberto.vargas@gsatecnologia.com',
                'telefono' => '3161234567',
                'telefono_corporativo' => '6012345684',
                'ciudad' => 'Bucaramanga',
                'area_id' => 6, // Logística
                'cargo_id' => 3, // Coordinador
                'razon_social_id' => 2,
                'estado' => 'activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombres' => 'Sandra',
                'apellidos' => 'Jiménez Ruiz',
                'numero_documento' => '1234567897',
                'email' => 'sandra.jimenez@gsatecnologia.com',
                'telefono' => '3121234567',
                'telefono_corporativo' => '6012345685',
                'ciudad' => 'Pereira',
                'area_id' => 4, // Administración
                'cargo_id' => 7, // Asistente
                'razon_social_id' => 3,
                'estado' => 'activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombres' => 'Diego',
                'apellidos' => 'Mendoza Silva',
                'numero_documento' => '1234567898',
                'email' => 'diego.mendoza@gsatecnologia.com',
                'telefono' => '3181234567',
                'telefono_corporativo' => '6012345686',
                'ciudad' => 'Manizales',
                'area_id' => 1, // Tecnología
                'cargo_id' => 6, // Analista
                'razon_social_id' => 3,
                'estado' => 'activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombres' => 'Laura',
                'apellidos' => 'Castro Ortiz',
                'numero_documento' => '1234567899',
                'email' => 'laura.castro@gsatecnologia.com',
                'telefono' => '3191234567',
                'telefono_corporativo' => '6012345687',
                'ciudad' => 'Ibagué',
                'area_id' => 7, // Marketing
                'cargo_id' => 11, // Diseñador Gráfico
                'razon_social_id' => 3,
                'estado' => 'activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombres' => 'Fernando',
                'apellidos' => 'Rojas Vega',
                'numero_documento' => '1234567800',
                'email' => 'fernando.rojas@gsatecnologia.com',
                'telefono' => '3131234567',
                'telefono_corporativo' => '6012345688',
                'ciudad' => 'Bogotá',
                'area_id' => 3, // Contabilidad
                'cargo_id' => 9, // Auxiliar Contable
                'razon_social_id' => 1,
                'estado' => 'activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombres' => 'Camila',
                'apellidos' => 'Suárez Pineda',
                'numero_documento' => '1234567801',
                'email' => 'camila.suarez@gsatecnologia.com',
                'telefono' => '3141234567',
                'telefono_corporativo' => '6012345689',
                'ciudad' => 'Cali',
                'area_id' => 5, // Ventas
                'cargo_id' => 10, // Vendedor
                'razon_social_id' => 1,
                'estado' => 'activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('usuarios')->insert($usuarios);
    }
}
