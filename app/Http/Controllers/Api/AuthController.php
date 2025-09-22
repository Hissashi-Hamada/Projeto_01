<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'nome' => 'required|string|max:255',
            'telefone' => 'required|string|max:20',
            'cpf' => 'required|string|max:14|unique:banco_de_dados,cpf',
            'data_nascimento' => 'required|date',
            'senha' => 'required|string|min:6',
        ]);

        $token = bin2hex(random_bytes(30));

        $user = Usuario::create([
            'nome' => $data['nome'],
            'telefone' => $data['telefone'],
            'cpf' => $data['cpf'],
            'data_nascimento' => $data['data_nascimento'],
            'senha' => Hash::make($data['senha']),
            'api_token' => $token,
        ]);

        return response()->json(['token' => $token, 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'cpf' => 'required|string',
            'senha' => 'required|string',
        ]);

        $user = Usuario::where('cpf', $request->cpf)->first();
        if (! $user || ! Hash::check($request->senha, $user->senha)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        // Gera novo token
        $token = bin2hex(random_bytes(30));
        $user->api_token = $token;
        $user->save();

        return response()->json(['token' => $token, 'user' => $user], 200);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        if ($user) {
            $user->api_token = null;
            $user->save();
        }
        return response()->json(['message' => 'Desconectado']);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'nome' => 'sometimes|required|string|max:255',
            'telefone' => 'sometimes|required|string|max:20',
            'data_nascimento' => 'sometimes|required|date',
            'senha' => 'sometimes|nullable|string|min:6',
        ]);

        if (isset($data['senha'])) {
            $data['senha'] = Hash::make($data['senha']);
        }

        $user->update($data);

        return response()->json($user);
    }
}
