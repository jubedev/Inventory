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
        Schema::table('access_requests', function (Blueprint $table) {
            // Eliminar la FK incorrecta que referencia a un usuario que aún no existe
            $table->dropForeign(['usuario_solicitante']);
            $table->dropColumn('usuario_solicitante');
            
            // Agregar campos para almacenar la información del solicitante directamente
            $table->string('email')->after('id');
            $table->string('nombre_completo')->after('email');
            $table->text('motivo_solicitud')->nullable()->after('nombre_completo');
            
            // Modificar el estado para tener valores claros
            // Los estados serán: 'pendiente', 'aprobado', 'rechazado'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('access_requests', function (Blueprint $table) {
            // Revertir cambios
            $table->dropColumn(['email', 'nombre_completo', 'motivo_solicitud']);
            $table->foreignId('usuario_solicitante')->constrained('usuarios_sistema')->onDelete('cascade');
        });
    }
};
