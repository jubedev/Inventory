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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nombres', 50);
            $table->string('apellidos', 50);
            $table->string('numero_documento', 50)->unique();
            $table->string('email', 100)->unique();
            $table->string('password', 255);
            $table->string('telefono', 20)->nullable();
            $table->string('telefono_corporativo', 20)->nullable();
            $table->string('ciudad', 50)->nullable();
            $table->foreignId('areas_id')->constrained('areas')->onDelete('cascade');
            $table->foreignId('cargos_id')->constrained('cargos')->onDelete('cascade');
            $table->foreignId('razon_social_id')->constrained('razon_social')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
