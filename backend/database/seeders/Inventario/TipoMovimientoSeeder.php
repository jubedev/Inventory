<?php

namespace Database\Seeders\Inventario;

use App\Models\Inventario\TipoMovimiento;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoMovimientoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tiposMovimiento = [
            [
                'nombre' => 'Ingreso',
                'descripcion' => 'Entrada de equipo nuevo al inventario por compra o donación'
            ],
            [
                'nombre' => 'Asignación',
                'descripcion' => 'Asignación de equipo a un usuario o área específica'
            ],
            [
                'nombre' => 'Devolución',
                'descripcion' => 'Devolución de equipo al inventario por finalización de asignación'
            ],
            [
                'nombre' => 'Traslado',
                'descripcion' => 'Cambio de ubicación del equipo entre áreas o sedes'
            ],
            [
                'nombre' => 'Mantenimiento',
                'descripcion' => 'Salida del equipo para reparación o mantenimiento preventivo'
            ],
            [
                'nombre' => 'Baja',
                'descripcion' => 'Retiro definitivo del equipo del inventario por obsolescencia o daño'
            ],
            [
                'nombre' => 'Préstamo',
                'descripcion' => 'Préstamo temporal de equipo a usuarios externos'
            ],
        ];

        foreach ($tiposMovimiento as $tipo) {
            TipoMovimiento::create($tipo);
        }
    }
}
