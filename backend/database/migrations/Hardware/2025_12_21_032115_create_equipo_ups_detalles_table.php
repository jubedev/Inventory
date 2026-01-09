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
        Schema::create('equipo_ups_detalles', function (Blueprint $table) {
            $table->id();
            $table->string('potencia', 50)->nullable();
            $table->string('input_voltaje', 50)->nullable();
            $table->string('output_voltaje', 50)->nullable();
            $table->foreignId('equipo_id')->unique()->constrained('equipos')->onDelete('no action')->onUpdate('no action');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipo_ups_detalles');
    }
};
