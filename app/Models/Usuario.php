<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $table = 'banco_de_dados'; // nova tabela
    protected $fillable = ['nome', 'telefone', 'cpf', 'data_nascimento'];
}
