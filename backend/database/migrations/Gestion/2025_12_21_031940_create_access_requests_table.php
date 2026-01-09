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
        Schema::create('access_requests', function (Blueprint $table) {
            $table->id();
            
            // Datos del solicitante (AÚN NO es usuario del sistema)
            $table->string('email')->unique();
            $table->string('nombre_completo');
            $table->text('motivo_solicitud')->nullable();
            
            // Estado y auditoría
            $table->enum('estado', ['pendiente', 'aprobado', 'rechazado'])->default('pendiente');
            $table->foreignId('revisado_por')->nullable()
                  ->constrained('usuarios_sistema')
                  ->onDelete('set null');
            
            // Fechas
            $table->timestamp('fecha_solicitud')->useCurrent();
            $table->timestamp('fecha_revision')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('access_requests');
    }
};
