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
        Schema::create('movimiento_inventarios', function (Blueprint $table) {
            $table->id();
            $table->string('tipo_movimiento', 100);
            $table->date('fecha_movimiento');
            $table->integer('ubicacion_destino');
            $table->string('proveedor_cliente_involucrado', 255);
            $table->text('observaciones')->nullable();
            $table->foreignId('equipos_id')->constrained('equipos')->onDelete('no action')->onUpdate('no action');
            $table->foreignId('actas_id')->constrained('actas')->onDelete('no action')->onUpdate('no action');
            $table->foreignId('usuarios_id')->constrained('usuarios')->onDelete('no action')->onUpdate('no action');
            $table->foreignId('tipo_movimientos_id')->constrained('tipo_movimientos')->onDelete('no action')->onUpdate('no action');
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
