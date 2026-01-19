<?php

namespace Database\Seeders\Inventario;

use App\Models\Inventario\MovimientoInventario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MovimientoInventarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $movimientos = [
            // Ingreso de equipos nuevos (Tipo 1: Ingreso)
            [
                'fecha_movimiento' => '2024-01-15',
                'ubicacion_destino' => 'Almacén Principal - Bodega A',
                'proveedor_cliente_involucrado' => 'Tech Solutions S.A.',
                'observaciones' => 'Ingreso inicial de equipo Dell Inspiron por compra',
                'equipo_id' => 1,
                'acta_id' => null,
                'usuario_id' => null,
                'tipo_movimiento_id' => 1,
                'activo' => true,
            ],
            [
                'fecha_movimiento' => '2024-03-20',
                'ubicacion_destino' => 'Almacén Principal - Bodega A',
                'proveedor_cliente_involucrado' => 'HP Colombia',
                'observaciones' => 'Ingreso de laptop HP EliteBook para gerencia',
                'equipo_id' => 2,
                'acta_id' => null,
                'usuario_id' => null,
                'tipo_movimiento_id' => 1,
                'activo' => true,
            ],
            [
                'fecha_movimiento' => '2024-05-10',
                'ubicacion_destino' => 'Almacén Principal - Bodega A',
                'proveedor_cliente_involucrado' => 'Lenovo Distribution',
                'observaciones' => 'Ingreso de equipo Lenovo ThinkPad',
                'equipo_id' => 3,
                'acta_id' => null,
                'usuario_id' => null,
                'tipo_movimiento_id' => 1,
                'activo' => true,
            ],

            // Traslados internos (Tipo 4: Traslado)
            [
                'fecha_movimiento' => '2024-01-20',
                'ubicacion_destino' => 'Oficina Central - Piso 2 - Dpto. Contabilidad',
                'proveedor_cliente_involucrado' => null,
                'observaciones' => 'Traslado a departamento de contabilidad',
                'equipo_id' => 1,
                'acta_id' => null,
                'usuario_id' => null,
                'tipo_movimiento_id' => 4,
                'activo' => true,
            ],
            [
                'fecha_movimiento' => '2024-03-25',
                'ubicacion_destino' => 'Oficina Central - Piso 3 - Gerencia TI',
                'proveedor_cliente_involucrado' => null,
                'observaciones' => 'Traslado a gerencia de sistemas',
                'equipo_id' => 2,
                'acta_id' => null,
                'usuario_id' => null,
                'tipo_movimiento_id' => 4,
                'activo' => true,
            ],

            // Mantenimiento (Tipo 5: Mantenimiento)
            [
                'fecha_movimiento' => '2024-12-15',
                'ubicacion_destino' => 'Servicio Técnico - Tech Repair Center',
                'proveedor_cliente_involucrado' => 'Tech Repair Center',
                'observaciones' => 'Mantenimiento preventivo: cambio de pasta térmica y limpieza general',
                'equipo_id' => 1,
                'acta_id' => null,
                'usuario_id' => null,
                'tipo_movimiento_id' => 5,
                'activo' => true,
            ],

            // Devolución después de mantenimiento (Tipo 3: Devolución)
            [
                'fecha_movimiento' => '2024-12-18',
                'ubicacion_destino' => 'Oficina Central - Piso 2 - Dpto. Contabilidad',
                'proveedor_cliente_involucrado' => null,
                'observaciones' => 'Devolución después de mantenimiento exitoso',
                'equipo_id' => 1,
                'acta_id' => null,
                'usuario_id' => null,
                'tipo_movimiento_id' => 3,
                'activo' => true,
            ],

            // Ejemplo de movimiento inactivo (eliminado)
            [
                'fecha_movimiento' => '2024-02-10',
                'ubicacion_destino' => 'Ubicación temporal',
                'proveedor_cliente_involucrado' => null,
                'observaciones' => 'Movimiento registrado por error y posteriormente eliminado',
                'equipo_id' => 1,
                'acta_id' => null,
                'usuario_id' => null,
                'tipo_movimiento_id' => 4,
                'activo' => false,
            ],
        ];

        foreach ($movimientos as $movimiento) {
            MovimientoInventario::create($movimiento);
        }
    }
}
