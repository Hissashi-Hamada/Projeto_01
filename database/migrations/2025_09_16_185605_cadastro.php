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
    Schema::create('cadastro', function (Blueprint $table) {
        $table->id(); // Cria a coluna 'id' (auto increment, chave primária)
        $table->string('nome');
        $table->string('email')->unique();
        $table->string('telefone');
        $table->string('cpf', 14); // Ex: "000.000.000-00"
        $table->date('data_nascimento');
        $table->timestamps(); // Cria 'created_at' e 'updated_at'
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
