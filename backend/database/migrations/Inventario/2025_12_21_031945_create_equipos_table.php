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
        Schema::create('equipos', function (Blueprint $table) {
            $table->id();
            $table->string('activo')->unique();
            $table->string('marca');
            $table->string('modelo');
            $table->string('serial')->unique();
            $table->string('estado');
            $table->string('ubicacion');
            $table->timestamp('fecha_compra')->nullable();
            $table->decimal('costo', 10, 2)->nullable();
            $table->timestamp('fecha_ultimo_estado')->nullable();
            $table->timestamp('fecha_ultimo_mantenimiento')->nullable();
            $table->string('direccion_ip')->nullable();
            $table->string('mac_address')->nullable();
            $table->string('observaciones')->nullable();
            $table->foreignId('tipo_equipo_id')->constrained('tipo_equipos')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipos');
    }
};
