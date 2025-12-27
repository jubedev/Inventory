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
        Schema::create('equipo_telefono_ip_detalles', function (Blueprint $table) {
            $table->id();
            $table->string('extension', 50)->nullable();
            $table->string('numero_parte', 100)->nullable();
            $table->foreignId('equipos_id')->unique()->constrained('equipos')->onDelete('no action')->onUpdate('no action');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipo_telefono_ip_detalles');
    }
};
