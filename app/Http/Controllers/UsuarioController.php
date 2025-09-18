<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UsuarioController extends Controller
{
    // Cadastro
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'telefone' => 'required|string|max:20',
            'cpf' => 'required|string|max:14',
            'data_nascimento' => 'required|string', // string, pois vem no formato DD/MM/YYYY
        ]);

        $data = $request->all();

        // Converte data para MySQL (YYYY-MM-DD)
        $data['data_nascimento'] = Carbon::createFromFormat('d/m/Y', $request->data_nascimento)
                                        ->format('Y-m-d');

        Usuario::create($data);

        return redirect()->back()->with('success', 'Cadastro realizado!');
    }

    // Edição
    public function update(Request $request, $id)
    {
        $usuario = Usuario::findOrFail($id);

        $request->validate([
            'nome' => 'required|string|max:255',
            'telefone' => 'required|string|max:20',
            'cpf' => 'required|string|max:14',
            'data_nascimento' => 'required|string',
        ]);

        $data = $request->all();
        $data['data_nascimento'] = Carbon::createFromFormat('d/m/Y', $request->data_nascimento)
                                        ->format('Y-m-d');

        $usuario->update($data);

        return redirect()->back()->with('success', 'Usuário atualizado!');
    }

    // Login (exemplo simples pelo CPF)
    public function login(Request $request)
    {
        $usuario = Usuario::where('cpf', $request->cpf)->first();
        if ($usuario) {
            // Aqui você poderia iniciar sessão
            return redirect()->back()->with('success', 'Login realizado!');
        }
        return redirect()->back()->with('error', 'Usuário não encontrado!');
    }
}
