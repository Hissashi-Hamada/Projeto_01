<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $table = 'banco_de_dados';

    protected $fillable = [
        'nome', 'telefone', 'cpf', 'data_nascimento', 'senha', 'api_token'
    ];

    protected $hidden = [
        'senha', 'api_token'
    ];
}