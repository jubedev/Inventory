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
            $table->string('estado');
            $table->foreignId('revisado_por')->constrained('usuarios_sistema')->onDelete('cascade')->nullable();
            $table->timestamp('fecha_solicitud');
            $table->timestamp('fecha_revision')->nullable();
            $table->foreignId('usuario_solicitante')->constrained('usuarios_sistema')->onDelete('cascade');
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
