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
        Schema::create('activo_asignados', function (Blueprint $table) {
            $table->id();
            $table->foreignId('usuario_id')->constrained('usuarios')->onDelete('no action')->onUpdate('no action');
            $table->foreignId('acta_id')->constrained('actas')->onDelete('no action')->onUpdate('no action');
            $table->foreignId('equipo_id')->constrained('equipos')->onDelete('no action')->onUpdate('no action');
            $table->date('fecha_asignacion');
            $table->date('fecha_devolucion')->nullable();
            $table->string('ubicacion_destino', 255)->nullable();
            $table->string('estado', 45);
            $table->text('observaciones')->nullable();
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activo_asignados');
    }
};
