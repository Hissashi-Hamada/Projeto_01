<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario; // Ou App\Models\User dependendo do nome do seu modelo

class UsuarioController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|min:3',
            'email' => 'required|email|unique:usuarios,email',
            'senha' => 'required|string|min:6',
        ]);

        $usuario = new Usuario(); // ou new User() dependendo do modelo
        $usuario->nome = $validated['nome'];
        $usuario->email = $validated['email'];
        $usuario->senha = bcrypt($validated['senha']);
        $usuario->save();

        return response()->json(['mensagem' => 'Usuário cadastrado com sucesso!']);
    }
}
