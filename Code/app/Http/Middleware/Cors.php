<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
        // ->header('Access-Control-Allow-Origin', '*')
        // ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        // ->header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Authorization, Origin, X-Requested-With, Accept, Access-Control-Request-Method, Access-Control-Request-Headers');
    }
}