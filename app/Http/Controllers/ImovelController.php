<?php

namespace App\Http\Controllers;

use App\Models\Imovel;

class ImovelController extends Controller
{
    public function index()
    {
        $casas = Imovel::where('tipo', 'casa')->get();
        $terrenos = Imovel::where('tipo', 'terreno')->get();

        return view('menu', compact('casas', 'terrenos'));
    }
}