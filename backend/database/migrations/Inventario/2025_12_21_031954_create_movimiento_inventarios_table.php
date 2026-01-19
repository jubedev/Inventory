<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('movimientos_inventario', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_movimiento');
            $table->string('ubicacion_destino', 255)->nullable();
            $table->string('proveedor_cliente_involucrado', 255)->nullable();
            $table->text('observaciones')->nullable();
            $table->foreignId('equipo_id')->constrained('equipos')->onDelete('no action')->onUpdate('no action');
            $table->foreignId('acta_id')->nullable()->constrained('actas')->onDelete('no action')->onUpdate('no action');
            $table->foreignId('usuario_id')->nullable()->constrained('usuarios')->onDelete('no action')->onUpdate('no action');
            $table->foreignId('tipo_movimiento_id')->constrained('tipo_movimientos')->onDelete('no action')->onUpdate('no action');
            $table->boolean('activo')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movimiento_inventarios');
    }
};
