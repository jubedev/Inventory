<?php

namespace Database\Seeders\Gestion;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Gestion\Acta;
use App\Models\Administracion\Usuario;

class ActaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener todos los usuarios
        $usuarios = Usuario::all();

        // Crear un acta para cada usuario
        foreach ($usuarios as $usuario) {
            Acta::create([
                'numero_acta' => 'ACTA-' . str_pad($usuario->id, 5, '0', STR_PAD_LEFT),
                'ruta_archivo' => 'actas/acta_' . $usuario->numero_documento . '.pdf',
                'usuario_id' => $usuario->id,
            ]);
        }
    }
}
