<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Home;
use App\Http\Controllers\CadastroController;
use App\Http\Controllers\UsuarioController;

// Página inicial
Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', [Home::class, 'index']);

// Formulário e envio
Route::post('/postform', [Home::class, 'postform']);

// Cadastro via Web
Route::get('/cadastro', [CadastroController::class, 'mostrarFormulario'])->name('cadastro.form');
Route::post('/cadastro', [CadastroController::class, 'salvarCadastro'])->name('cadastro.salvar');

// Usuários
Route::resource('usuarios', UsuarioController::class);

// Login via Web
Route::get('/login', function() {
    return view('login');
})->name('login.form');

Route::post('/login', [UsuarioController::class, 'login'])->name('login.submit');

Route::post('/logout', [UsuarioController::class, 'logout'])->name('logout');
