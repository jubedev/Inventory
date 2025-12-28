<?php

namespace Database\Seeders\Inventario;

use App\Models\Inventario\TipoEquipo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoEquipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tipos = [
            ['nombre' => 'Computador', 'descripcion' => 'Equipos de cómputo de escritorio y portátiles'],
            ['nombre' => 'Monitor', 'descripcion' => 'Pantallas y monitores'],
            ['nombre' => 'Impresora', 'descripcion' => 'Impresoras y multifuncionales'],
            ['nombre' => 'Celular', 'descripcion' => 'Dispositivos móviles corporativos'],
            ['nombre' => 'Tablet', 'descripcion' => 'Tabletas y dispositivos táctiles'],
            ['nombre' => 'Servidor', 'descripcion' => 'Servidores físicos y virtuales'],
            ['nombre' => 'Switch', 'descripcion' => 'Equipos de red y switching'],
            ['nombre' => 'Router', 'descripcion' => 'Enrutadores de red'],
            ['nombre' => 'UPS', 'descripcion' => 'Sistemas de alimentación ininterrumpida'],
            ['nombre' => 'Accesorio', 'descripcion' => 'Teclados, mouse, audífonos, etc'],
        ];

        foreach ($tipos as $tipo) {
            TipoEquipo::create($tipo);
        }
    }
}
