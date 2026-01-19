<?php

namespace App\Observers;

use App\Models\Inventario\Equipo;
use App\Models\Inventario\MovimientoInventario;

class EquipoObserver
{
    /**
     * Handle the Equipo "created" event.
     */
    public function created(Equipo $equipo): void
    {
        MovimientoInventario::create([
            'fecha_movimiento' => now(),
            'ubicacion_destino' => $equipo->ubicacion,
            'proveedor_cliente_involucrado' => null,
            'observaciones' => "Ingreso inicial del equipo {$equipo->activo}.",
            'equipo_id' => $equipo->id,
            'usuario_id' => null,
            'acta_id' => null,
            'tipo_movimiento_id' => 1, // Ingreso
            'activo' => true,
        ]);
    }

    /**
     * Handle the Equipo "updated" event.
     */
    public function updated(Equipo $equipo): void
    {
        // Detectar cambio de estado
        if ($equipo->isDirty('estado')) {
            $estadoAnterior = $equipo->getOriginal('estado');
            $estadoNuevo = $equipo->estado;

            // Determinar tipo de movimiento según el nuevo estado            
            $tipoMovimientoId = match($estadoNuevo) {
            'en uso' => 2,           // Asignación
            'mantenimiento' => 5,    // Mantenimiento
            'disponible' => 3,       // Devolución
            'dado de baja' => 6,     // Baja
            default => 4,            // Traslado
            };

            MovimientoInventario::create([
                'fecha_movimiento' => now(),
                'ubicacion_destino' => $equipo->ubicacion,
                'proveedor_cliente_involucrado' => null,
                'observaciones' => "Cambio de estado de '$estadoAnterior' a '$estadoNuevo'.",
                'equipo_id' => $equipo->id,
                'usuario_id' => null,
                'acta_id' => null,
                'tipo_movimiento_id' => $tipoMovimientoId,
                'activo' => true,
            ]);
        }

        // Detectar cambio de ubicación sin cambio de estado
        if ($equipo->isDirty('ubicacion') && !$equipo->isDirty('estado')) {
            $ubicacionAnterior = $equipo->getOriginal('ubicacion'); 

            MovimientoInventario::create([
                'fecha_movimiento' => now(),
                'ubicacion_destino' => $equipo->ubicacion,
                'proveedor_cliente_involucrado' => null,
                'observaciones' => "Cambio de ubicación de '$ubicacionAnterior' a '{$equipo->ubicacion}'.",
                'equipo_id' => $equipo->id,
                'usuario_id' => null,
                'acta_id' => null,
                'tipo_movimiento_id' => 4, // Traslado
                'activo' => true,
            ]);
        }
    }

        

    /**
     * Handle the Equipo "deleted" event.
     */
    public function deleted(Equipo $equipo): void
    {
        MovimientoInventario::create([
            'fecha_movimiento' => now(),
            'ubicacion_destino' => $equipo->ubicacion,
            'proveedor_cliente_involucrado' => null,
            'observaciones' => "Equipo {$equipo->activo} dado de baja.",
            'equipo_id' => $equipo->id,
            'usuario_id' => null,
            'acta_id' => null,
            'tipo_movimiento_id' => 6, // Baja
            'activo' => true,
        ]);
    }

    /**
     * Handle the Equipo "restored" event.
     */
    public function restored(Equipo $equipo): void
    {
        //
    }

    /**
     * Handle the Equipo "force deleted" event.
     */
    public function forceDeleted(Equipo $equipo): void
    {
        //
    }
}
