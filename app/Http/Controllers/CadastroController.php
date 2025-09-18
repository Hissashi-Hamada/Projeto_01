<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CadastroController extends Controller
{
    public function mostrarFormulario()
    {
        return view('cadastro');
    }

    public function salvarCadastro(Request $request)
    {
        // Validação básica
        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'senha' => 'required|min:6',
        ]);

        // Aqui você pode salvar no banco, por exemplo:
        // User::create([
        //     'name' => $request->nome,
        //     'email' => $request->email,
        //     'password' => Hash::make($request->senha),
        // ]);

        return redirect()->back()->with('sucesso', 'Cadastro realizado com sucesso!');
    }
}

