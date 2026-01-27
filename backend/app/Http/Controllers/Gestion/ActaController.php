<?php

namespace App\Http\Controllers\Gestion;

use App\Http\Controllers\Controller;
use App\Models\Gestion\Acta;
use Illuminate\Http\Request;

class ActaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Acta::with('usuario');

        // Filtro por usuario_id si se proporciona
        if ($request->has('usuario_id')) {
            $query->where('usuario_id', $request->usuario_id);
        }

        $actas = $query->get();

        return response()->json([
            'data' => $actas
        ]);
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
    public function show(Acta $acta)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Acta $acta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Acta $acta)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Acta $acta)
    {
        //
    }
}
