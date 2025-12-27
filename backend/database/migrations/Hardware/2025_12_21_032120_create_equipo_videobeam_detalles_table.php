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
        Schema::create('equipo_videobeam_detalles', function (Blueprint $table) {
            $table->id();
            $table->string('tipo_conexion', 100)->nullable();
            $table->foreignId('equipos_id')->unique()->constrained('equipos')->onDelete('no action')->onUpdate('no action');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipo_videobeam_detalles');
    }
};
