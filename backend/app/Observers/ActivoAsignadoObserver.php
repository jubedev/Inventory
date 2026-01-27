<?php

namespace App\Observers;

use App\Models\Inventario\ActivoAsignado;
use App\Models\Inventario\MovimientoInventario;

class ActivoAsignadoObserver
{
    /**
     * Handle the ActivoAsignado "created" event.
     */
    public function created(ActivoAsignado $activoAsignado): void
    {
        // Actualizar estado del equipo a "en_uso"
        $activoAsignado->equipo->update(['estado' => 'en_uso']);
        
        // Registrar movimiento de inventario tipo "Asignación" (id 2)
        MovimientoInventario::create([
            'equipo_id' => $activoAsignado->equipo_id,
            'tipo_movimiento_id' => 2, // Asignación
            'usuario_id' => $activoAsignado->usuario_id,
            'acta_id' => $activoAsignado->acta_id,
            'fecha_movimiento' => $activoAsignado->fecha_asignacion,
            'ubicacion_destino' => $activoAsignado->ubicacion_destino,
            'observaciones' => $activoAsignado->observaciones ?: ('Equipo asignado a ' . $activoAsignado->usuario->nombres . ' ' . $activoAsignado->usuario->apellidos),
            'activo' => true,
        ]);
    }

    /**
     * Handle the ActivoAsignado "updated" event.
     */
    public function updated(ActivoAsignado $activoAsignado): void
    {
        // Si cambió a estado "devuelto", registrar movimiento
        if ($activoAsignado->isDirty('estado') && $activoAsignado->estado === 'devuelto') {
            // Actualizar estado del equipo a "disponible"
            $activoAsignado->equipo->update(['estado' => 'disponible']);
            
            // Registrar movimiento de inventario tipo "Devolución" (id 3)
            MovimientoInventario::create([
                'equipo_id' => $activoAsignado->equipo_id,
                'tipo_movimiento_id' => 3, // Devolución
                'usuario_id' => $activoAsignado->usuario_id,
                'acta_id' => $activoAsignado->acta_id,
                'fecha_movimiento' => $activoAsignado->fecha_devolucion,
                'ubicacion_destino' => $activoAsignado->equipo->ubicacion, // Ubicación actual del equipo
                'observaciones' => 'Equipo devuelto por ' . $activoAsignado->usuario->nombres . ' ' . $activoAsignado->usuario->apellidos,
                'activo' => true,
            ]);
        }
    }

    /**
     * Handle the ActivoAsignado "deleted" event.
     */
    public function deleted(ActivoAsignado $activoAsignado): void
    {
        // Si el equipo estaba asignado, devolverlo a disponible
        if ($activoAsignado->estado === 'asignado') {
            $activoAsignado->equipo->update(['estado' => 'disponible']);
        }
    }

    /**
     * Handle the ActivoAsignado "restored" event.
     */
    public function restored(ActivoAsignado $activoAsignado): void
    {
        //
    }

    /**
     * Handle the ActivoAsignado "force deleted" event.
     */
    public function forceDeleted(ActivoAsignado $activoAsignado): void
    {
        //
    }
}
