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
        Schema::create('equipo_celular_detalles', function (Blueprint $table) {
            $table->id();
            $table->string('memoria_ram', 255)->nullable();
            $table->string('almacenamiento', 255)->nullable();
            $table->string('imei_1', 50)->nullable();
            $table->string('imei_2', 50)->nullable();
            $table->string('numero_linea', 50)->nullable();
            $table->string('cuenta_celular', 100)->nullable();
            $table->foreignId('equipo_id')->unique()->constrained('equipos')->onDelete('no action')->onUpdate('no action');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipo_celular_detalles');
    }
};
