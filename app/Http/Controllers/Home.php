<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Home extends Controller
{
    public function postform(Request $request)
    {
        // Exibe todos os dados recebidos do formulário (como $_POST)
        var_dump($request);
    }

}
