<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Recette;
use Illuminate\Http\Request;

class RecetteController extends Controller
{
    public function index(Request $request)
    {
        $query = Recette::query();

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('saison')) {
            $query->where('saison', $request->saison);
        }

        if ($request->has('difficulte')) {
            $query->where('difficulte', $request->difficulte);
        }

        $recettes = $query->with('ingredients')->paginate(15);

        return response()->json([
            'status' => 'success',
            'data' => $recettes
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'description' => 'required|string',
            'type' => 'required|string',
            'saison' => 'required|string',
            'temps_preparation' => 'required|integer',
            'temps_cuisson' => 'required|integer',
            'instructions' => 'required|string',
            'difficulte' => 'required|string',
            'image_url' => 'nullable|string',
            'ingredients' => 'required|array',
            'ingredients.*.produit_id' => 'required|exists:produits,id',
            'ingredients.*.quantite' => 'required|string',
            'ingredients.*.unite' => 'required|string',
            'translations' => 'array'
        ]);

        $recette = Recette::create($validated);

        foreach ($validated['ingredients'] as $ingredient) {
            $recette->ingredients()->attach($ingredient['produit_id'], [
                'quantite' => $ingredient['quantite'],
                'unite' => $ingredient['unite']
            ]);
        }

        if (isset($validated['translations'])) {
            foreach ($validated['translations'] as $locale => $fields) {
                foreach ($fields as $field => $value) {
                    $recette->setTranslation($field, $locale, $value);
                }
            }
        }

        return response()->json([
            'status' => 'success',
            'data' => $recette->load('ingredients', 'translations')
        ], 201);
    }

    public function show(Recette $recette)
    {
        return response()->json([
            'status' => 'success',
            'data' => $recette->load('ingredients', 'translations')
        ]);
    }

    public function update(Request $request, Recette $recette)
    {
        $validated = $request->validate([
            'nom' => 'string',
            'description' => 'string',
            'type' => 'string',
            'saison' => 'string',
            'temps_preparation' => 'integer',
            'temps_cuisson' => 'integer',
            'instructions' => 'string',
            'difficulte' => 'string',
            'image_url' => 'nullable|string',
            'ingredients' => 'array',
            'ingredients.*.produit_id' => 'exists:produits,id',
            'ingredients.*.quantite' => 'string',
            'ingredients.*.unite' => 'string',
            'translations' => 'array'
        ]);

        $recette->update($validated);

        if (isset($validated['ingredients'])) {
            $recette->ingredients()->sync(collect($validated['ingredients'])->mapWithKeys(function ($ingredient) {
                return [$ingredient['produit_id'] => [
                    'quantite' => $ingredient['quantite'],
                    'unite' => $ingredient['unite']
                ]];
            }));
        }

        if (isset($validated['translations'])) {
            foreach ($validated['translations'] as $locale => $fields) {
                foreach ($fields as $field => $value) {
                    $recette->setTranslation($field, $locale, $value);
                }
            }
        }

        return response()->json([
            'status' => 'success',
            'data' => $recette->load('ingredients', 'translations')
        ]);
    }

    public function destroy(Recette $recette)
    {
        $recette->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Recette supprimée avec succès'
        ]);
    }
}
