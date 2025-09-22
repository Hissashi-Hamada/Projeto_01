<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Usuario;

class ApiTokenMiddleware
{
    public function handle($request, Closure $next)
    {
        $header = $request->header('Authorization');

        if (! $header) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        if (! preg_match('/Bearer\s+(.*)$/i', $header, $matches)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $token = $matches[1];

        $user = Usuario::where('api_token', $token)->first();
        if (! $user) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        // set user on request
        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        return $next($request);
    }
}
