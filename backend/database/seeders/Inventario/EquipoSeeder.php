<?php

namespace Database\Seeders\Inventario;

use App\Models\Inventario\Equipo;
use App\Models\Inventario\TipoEquipo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $equipos = [
            // Computadores
            [
                'activo' => 'GSCO0001',
                'marca' => 'Dell',
                'modelo' => 'Inspiron 15 3000',
                'serial' => 'SN123456789',
                'estado' => 'En uso',
                'ubicacion' => 'Oficina Central - Piso 2',
                'fecha_compra' => '2022-01-15',
                'costo' => 750.00,
                'fecha_ultimo_estado' => '2025-01-10',
                'fecha_ultimo_mantenimiento' => '2024-12-15',
                'direccion_ip' => '192.168.1.101',
                'mac_address' => '00:1B:44:11:3A:B7',
                'observaciones' => 'Equipo asignado al departamento de contabilidad',
                'tipo_equipo_id' => 1, // Computador
            ],
            [
                'activo' => 'GSCO0002',
                'marca' => 'HP',
                'modelo' => 'EliteBook 840 G8',
                'serial' => 'HP456789012',
                'estado' => 'En uso',
                'ubicacion' => 'Oficina Central - Piso 3',
                'fecha_compra' => '2023-03-20',
                'costo' => 1200.00,
                'fecha_ultimo_estado' => '2025-01-05',
                'fecha_ultimo_mantenimiento' => '2024-11-20',
                'direccion_ip' => '192.168.1.102',
                'mac_address' => '00:1B:44:11:3A:C8',
                'observaciones' => 'Equipo gerencia de sistemas',
                'tipo_equipo_id' => 1,
            ],
            [
                'activo' => 'GSCO0003',
                'marca' => 'Lenovo',
                'modelo' => 'ThinkPad T14',
                'serial' => 'LN789012345',
                'estado' => 'Mantenimiento',
                'ubicacion' => 'Taller de TI',
                'fecha_compra' => '2021-08-10',
                'costo' => 950.00,
                'fecha_ultimo_estado' => '2024-12-20',
                'fecha_ultimo_mantenimiento' => '2024-12-20',
                'direccion_ip' => null,
                'mac_address' => '00:1B:44:11:3A:D9',
                'observaciones' => 'En reparación por problema de teclado',
                'tipo_equipo_id' => 1,
            ],
            
            // Monitores
            [
                'activo' => 'GSMO0001',
                'marca' => 'Samsung',
                'modelo' => 'S24F350',
                'serial' => 'SM234567890',
                'estado' => 'En uso',
                'ubicacion' => 'Oficina Central - Piso 2',
                'fecha_compra' => '2022-01-15',
                'costo' => 180.00,
                'fecha_ultimo_estado' => '2025-01-10',
                'observaciones' => 'Monitor adicional para contabilidad',
                'tipo_equipo_id' => 2, // Monitor
            ],
            [
                'activo' => 'GSMO0002',
                'marca' => 'LG',
                'modelo' => '27UK650-W',
                'serial' => 'LG345678901',
                'estado' => 'En uso',
                'ubicacion' => 'Oficina Central - Piso 3',
                'fecha_compra' => '2023-05-12',
                'costo' => 320.00,
                'fecha_ultimo_estado' => '2025-01-08',
                'observaciones' => 'Monitor 4K para diseño gráfico',
                'tipo_equipo_id' => 2,
            ],
            
            // Impresoras
            [
                'activo' => 'GSIM0001',
                'marca' => 'HP',
                'modelo' => 'LaserJet Pro M404dn',
                'serial' => 'HP987654321',
                'estado' => 'En uso',
                'ubicacion' => 'Oficina Central - Piso 1',
                'fecha_compra' => '2022-06-10',
                'costo' => 450.00,
                'fecha_ultimo_estado' => '2025-01-12',
                'fecha_ultimo_mantenimiento' => '2024-12-01',
                'direccion_ip' => '192.168.1.201',
                'mac_address' => '00:1B:44:11:3A:E1',
                'observaciones' => 'Impresora principal del piso 1',
                'tipo_equipo_id' => 3, // Impresora
            ],
            [
                'activo' => 'GSIM0002',
                'marca' => 'Epson',
                'modelo' => 'EcoTank L3210',
                'serial' => 'EP123456789',
                'estado' => 'En uso',
                'ubicacion' => 'Oficina Central - Piso 2',
                'fecha_compra' => '2023-02-20',
                'costo' => 280.00,
                'fecha_ultimo_estado' => '2025-01-05',
                'fecha_ultimo_mantenimiento' => '2024-11-15',
                'direccion_ip' => '192.168.1.202',
                'mac_address' => '00:1B:44:11:3A:F2',
                'observaciones' => 'Multifuncional para área administrativa',
                'tipo_equipo_id' => 3,
            ],
            
            // Celulares
            [
                'activo' => 'GSCE0001',
                'marca' => 'Samsung',
                'modelo' => 'Galaxy A54',
                'serial' => 'SM567890123',
                'estado' => 'En uso',
                'ubicacion' => 'Asignado - Gerencia',
                'fecha_compra' => '2023-08-15',
                'costo' => 450.00,
                'fecha_ultimo_estado' => '2025-01-01',
                'observaciones' => 'Celular corporativo gerente general',
                'tipo_equipo_id' => 4, // Celular
            ],
            [
                'activo' => 'GSCE0002',
                'marca' => 'Apple',
                'modelo' => 'iPhone 14',
                'serial' => 'AP678901234',
                'estado' => 'En uso',
                'ubicacion' => 'Asignado - Ventas',
                'fecha_compra' => '2023-10-01',
                'costo' => 999.00,
                'fecha_ultimo_estado' => '2024-12-28',
                'observaciones' => 'Celular corporativo director de ventas',
                'tipo_equipo_id' => 4,
            ],
            
            // Switch
            [
                'activo' => 'GSSW0001',
                'marca' => 'Cisco',
                'modelo' => 'Catalyst 2960-24TT-L',
                'serial' => 'CS123456789',
                'estado' => 'En uso',
                'ubicacion' => 'Cuarto de Servidores',
                'fecha_compra' => '2021-05-20',
                'costo' => 850.00,
                'fecha_ultimo_estado' => '2025-01-10',
                'fecha_ultimo_mantenimiento' => '2024-09-15',
                'direccion_ip' => '192.168.1.1',
                'mac_address' => '00:1B:44:11:3B:A1',
                'observaciones' => 'Switch principal del edificio',
                'tipo_equipo_id' => 7, // Switch
            ],
            
            // Router
            [
                'activo' => 'GSRT0001',
                'marca' => 'Cisco',
                'modelo' => 'ISR 4331',
                'serial' => 'CR987654321',
                'estado' => 'En uso',
                'ubicacion' => 'Cuarto de Servidores',
                'fecha_compra' => '2021-05-20',
                'costo' => 1500.00,
                'fecha_ultimo_estado' => '2025-01-10',
                'fecha_ultimo_mantenimiento' => '2024-09-15',
                'direccion_ip' => '192.168.1.254',
                'mac_address' => '00:1B:44:11:3B:B2',
                'observaciones' => 'Router principal - conexión a internet',
                'tipo_equipo_id' => 8, // Router
            ],
            
            // UPS
            [
                'activo' => 'GSUP0001',
                'marca' => 'APC',
                'modelo' => 'Smart-UPS 1500VA',
                'serial' => 'APC123456789',
                'estado' => 'En uso',
                'ubicacion' => 'Cuarto de Servidores',
                'fecha_compra' => '2021-05-20',
                'costo' => 680.00,
                'fecha_ultimo_estado' => '2025-01-10',
                'fecha_ultimo_mantenimiento' => '2024-10-01',
                'observaciones' => 'UPS para servidores principales',
                'tipo_equipo_id' => 9, // UPS
            ],
            [
                'activo' => 'GSUP0002',
                'marca' => 'Tripp Lite',
                'modelo' => 'SMART1500LCDT',
                'serial' => 'TL234567890',
                'estado' => 'En uso',
                'ubicacion' => 'Oficina Central - Piso 2',
                'fecha_compra' => '2022-09-15',
                'costo' => 420.00,
                'fecha_ultimo_estado' => '2025-01-08',
                'fecha_ultimo_mantenimiento' => '2024-11-10',
                'observaciones' => 'UPS para equipos de red piso 2',
                'tipo_equipo_id' => 9,
            ],
            
            // Servidor
            [
                'activo' => 'GSSV0001',
                'marca' => 'Dell',
                'modelo' => 'PowerEdge R740',
                'serial' => 'DL456789012',
                'estado' => 'En uso',
                'ubicacion' => 'Cuarto de Servidores',
                'fecha_compra' => '2021-06-01',
                'costo' => 4500.00,
                'fecha_ultimo_estado' => '2025-01-10',
                'fecha_ultimo_mantenimiento' => '2024-12-01',
                'direccion_ip' => '192.168.1.10',
                'mac_address' => '00:1B:44:11:3C:A1',
                'observaciones' => 'Servidor principal de aplicaciones',
                'tipo_equipo_id' => 6, // Servidor
            ],
        ];

        foreach ($equipos as $equipo) {
            Equipo::create($equipo);
        }
    }
}
