<?php

namespace App\Http\Controllers\Administracion;

use App\Http\Controllers\Controller;
use App\Models\Administracion\RazonSocial;
use Illuminate\Http\Request;

class RazonSocialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $razones_sociales = RazonSocial::all();
        return response()->json($razones_sociales);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(RazonSocial $razonSocial)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RazonSocial $razonSocial)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RazonSocial $razonSocial)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RazonSocial $razonSocial)
    {
        //
    }
}
