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
        Schema::create('equipo_impresora_detalles', function (Blueprint $table) {
            $table->id();
            $table->string('sede', 100)->nullable();
            $table->string('piso_numero', 50)->nullable();
            $table->string('ubicacion_especifica_area', 255)->nullable();
            $table->foreignId('equipos_id')->unique()->constrained('equipos')->onDelete('no action')->onUpdate('no action');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipo_impresora_detalles');
    }
};
