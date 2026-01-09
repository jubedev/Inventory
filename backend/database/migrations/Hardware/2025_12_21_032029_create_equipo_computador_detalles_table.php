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
        Schema::create('equipo_computador_detalles', function (Blueprint $table) {
            $table->id();
            $table->string('procesador', 255)->nullable();
            $table->string('ram', 255)->nullable();
            $table->string('disco_duro', 255)->nullable();
            $table->string('sistema_operativo', 255)->nullable();
            $table->string('version_so', 255)->nullable();
            $table->string('mac_wifi', 255)->nullable();
            $table->string('mac_lan', 255)->nullable();
            $table->smallInteger('cantidad_mouse')->nullable();
            $table->smallInteger('cantidad_teclados')->nullable();
            $table->smallInteger('cantidad_multipuertos')->nullable();
            $table->smallInteger('cantidad_adaptadores')->nullable();
            $table->smallInteger('cantidad_cables_red')->nullable();
            $table->foreignId('equipo_id')->unique()->constrained('equipos')->onDelete('no action')->onUpdate('no action');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipo_computador_detalles');
    }
};
