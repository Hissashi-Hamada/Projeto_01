<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash; // Importa Hash
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validação simples dos dados recebidos
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Tenta buscar o usuário pelo email
        $user = User::where('email', $request->email)->first();

        // Se não encontrar usuário ou a senha for inválida, retorna erro
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        // Cria o token de autenticação
        $token = $user->createToken('auth_token')->plainTextToken;

        // Retorna usuário e token para o frontend
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}