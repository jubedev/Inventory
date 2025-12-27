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
        Schema::create('inventario_toners', function (Blueprint $table) {
            $table->id();
            $table->string('toner_negro_cantidad', 100);
            $table->string('toner_cian_cantidad', 100);
            $table->string('toner_magenta_cantidad', 100);
            $table->string('toner_amarillo_cantidad', 100);
            $table->foreignId('equipos_impresoras_detalles_id')->constrained('equipos_impresoras_detalles')->onDelete('no action')->onUpdate('no action');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventario_toners');
    }
};
