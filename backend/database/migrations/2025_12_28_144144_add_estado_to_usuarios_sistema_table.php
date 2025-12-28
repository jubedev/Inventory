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
        Schema::table('usuarios_sistema', function (Blueprint $table) {
            $table->string('estado')->default('activo')->after('rol_id');
            // Estados: 'activo', 'revocado'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('usuarios_sistema', function (Blueprint $table) {
            $table->dropColumn('estado');
        });
    }
};
