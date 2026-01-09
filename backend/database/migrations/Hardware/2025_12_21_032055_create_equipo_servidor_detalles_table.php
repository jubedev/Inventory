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
        Schema::create('equipo_servidor_detalles', function (Blueprint $table) {
            $table->id();
            $table->string('hostname', 255)->nullable();
            $table->string('tipo_servidor', 100)->nullable();
            $table->text('aplicaciones_instaladas')->nullable();
            $table->string('procesador', 255)->nullable();
            $table->string('ram', 255)->nullable();
            $table->string('disco_duro', 255)->nullable();
            $table->string('sistema_operativo', 255)->nullable();
            $table->string('version_so', 255)->nullable();
            $table->foreignId('equipo_id')->unique()->constrained('equipos')->onDelete('no action')->onUpdate('no action');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipo_servidor_detalles');
    }
};
