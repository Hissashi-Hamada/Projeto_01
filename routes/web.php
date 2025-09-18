<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Home;
use App\Http\Controllers\UsuarioController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', function () {
    return view('home');
});

Route::post('/postform', [Home::class, 'postform']);

use App\Http\Controllers\CadastroController;

Route::get('/cadastro', [CadastroController::class, 'mostrarFormulario'])->name('cadastro.form');
Route::post('/cadastro', [CadastroController::class, 'salvarCadastro'])->name('cadastro.salvar');

Route::post('/usuario', [UsuarioController::class, 'store'])->name('usuario.store');

Route::post('/usuarios', [UsuarioController::class, 'store'])->name('usuarios.store');

// Cadastro
Route::post('/usuarios', [UsuarioController::class, 'store']);

Route::resource('usuarios', UsuarioController::class);

// Edição
Route::put('/usuarios/{id}', [UsuarioController::class, 'update']);

// Login
Route::post('/login', [UsuarioController::class, 'login']);