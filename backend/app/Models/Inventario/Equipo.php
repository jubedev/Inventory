<?php

namespace App\Models\Inventario;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasOne, HasMany};
use App\Models\Hardware\{
    EquipoAccesorioDetalle,
    EquipoAlmacenamientoDetalle,
    EquipoCelularDetalle,
    EquipoComputadorDetalle,
    EquipoComunicacionDetalle,
    EquipoImpresoraDetalle,
    EquipoMonitorDetalle,
    EquipoServidorDetalle,
    EquipoSimCardDetalle,
    EquipoTelefonoIpDetalle,
    EquipoTelevisorDetalle,
    EquipoUpsDetalle,
    EquipoVideobeamDetalle
};

class Equipo extends Model
{
    use HasFactory;

    protected $table = 'equipos';

    protected $fillable = [
        'activo',
        'marca',
        'modelo',
        'serial',
        'estado',
        'ubicacion',
        'fecha_compra',
        'costo',
        'fecha_ultimo_estado',
        'fecha_ultimo_mantenimiento',
        'direccion_ip',
        'mac_address',
        'observaciones',
        'tipo_equipo_id',
    ];

    protected $casts = [
        'fecha_compra' => 'datetime',
        'fecha_ultimo_estado' => 'datetime',
        'fecha_ultimo_mantenimiento' => 'datetime',
        'costo' => 'decimal:2',
    ];

    // ============== RELACIONES ==============

    /**
     * Un equipo pertenece a un tipo de equipo
     */
    public function tipoEquipo(): BelongsTo
    {
        return $this->belongsTo(TipoEquipo::class, 'tipo_equipo_id');
    }

    /**
     * Un equipo puede tener muchos movimientos
     */
    public function movimientos(): HasMany
    {
        return $this->hasMany(MovimientoInventario::class, 'equipo_id');
    }

    /**
     * Un equipo puede estar asignado (relación 1:1)
     */
    public function activoAsignado(): HasOne
    {
        return $this->hasOne(ActivoAsignado::class, 'equipo_id');
    }

    // ============== RELACIONES CON DETALLES ESPECÍFICOS ==============

    public function detalleAccesorio(): HasOne
    {
        return $this->hasOne(EquipoAccesorioDetalle::class, 'equipo_id');
    }

    public function detalleAlmacenamiento(): HasOne
    {
        return $this->hasOne(EquipoAlmacenamientoDetalle::class, 'equipo_id');
    }

    public function detalleCelular(): HasOne
    {
        return $this->hasOne(EquipoCelularDetalle::class, 'equipo_id');
    }

    public function detalleComputador(): HasOne
    {
        return $this->hasOne(EquipoComputadorDetalle::class, 'equipo_id');
    }

    public function detalleComunicacion(): HasOne
    {
        return $this->hasOne(EquipoComunicacionDetalle::class, 'equipo_id');
    }

    public function detalleImpresora(): HasOne
    {
        return $this->hasOne(EquipoImpresoraDetalle::class, 'equipo_id');
    }

    public function detalleMonitor(): HasOne
    {
        return $this->hasOne(EquipoMonitorDetalle::class, 'equipo_id');
    }

    public function detalleServidor(): HasOne
    {
        return $this->hasOne(EquipoServidorDetalle::class, 'equipo_id');
    }

    public function detalleSimCard(): HasOne
    {
        return $this->hasOne(EquipoSimCardDetalle::class, 'equipo_id');
    }

    public function detalleTelefonoIp(): HasOne
    {
        return $this->hasOne(EquipoTelefonoIpDetalle::class, 'equipo_id');
    }

    public function detalleTelevisor(): HasOne
    {
        return $this->hasOne(EquipoTelevisorDetalle::class, 'equipo_id');
    }

    public function detalleUps(): HasOne
    {
        return $this->hasOne(EquipoUpsDetalle::class, 'equipo_id');
    }

    public function detalleVideobeam(): HasOne
    {
        return $this->hasOne(EquipoVideobeamDetalle::class, 'equipo_id');
    }

    // ============== MÉTODOS DE UTILIDAD ==============

    /**
     * Obtiene el detalle específico según el tipo de equipo
     */
    public function getDetalleEspecifico()
    {
        $tipoNombre = $this->tipoEquipo?->nombre_tipo;

        return match (strtolower($tipoNombre)) {
            'computador', 'laptop', 'portatil' => $this->detalleComputador,
            'impresora' => $this->detalleImpresora,
            'monitor' => $this->detalleMonitor,
            'celular' => $this->detalleCelular,
            'servidor' => $this->detalleServidor,
            'sim card' => $this->detalleSimCard,
            'telefono ip' => $this->detalleTelefonoIp,
            'televisor' => $this->detalleTelevisor,
            'ups' => $this->detalleUps,
            'videobeam' => $this->detalleVideobeam,
            'almacenamiento' => $this->detalleAlmacenamiento,
            'comunicacion' => $this->detalleComunicacion,
            'accesorio' => $this->detalleAccesorio,
            default => null,
        };
    }

    /**
     * Scope: Equipos disponibles
     */
    public function scopeDisponibles($query)
    {
        return $query->where('estado', 'Disponible');
    }

    /**
     * Scope: Equipos asignados
     */
    public function scopeAsignados($query)
    {
        return $query->where('estado', 'Asignado');
    }

    /**
     * Accessor: Verifica si la garantía está vigente
     */
    public function getGarantiaVigenteAttribute(): bool
    {
        if (!$this->fecha_fin_garantia) {
            return false;
        }
        return $this->fecha_fin_garantia->isFuture();
    }
}
