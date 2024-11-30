<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('seasonal')) {
            $query->where('is_seasonal', $request->boolean('seasonal'));
        }

        if ($request->has('season')) {
            $query->whereJsonContains('seasons', $request->season);
        }

        return response()->json([
            'success' => true,
            'data' => $query->paginate(12)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_translations' => 'nullable|array',
            'description' => 'required|string',
            'description_translations' => 'nullable|array',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048',
            'is_seasonal' => 'boolean',
            'seasons' => 'nullable|array',
            'stock' => 'required|integer|min:0'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        }

        $product = Product::create($validated);

        return response()->json([
            'success' => true,
            'data' => $product
        ], 201);
    }

    public function show(Product $product)
    {
        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'name_translations' => 'nullable|array',
            'description' => 'string',
            'description_translations' => 'nullable|array',
            'price' => 'numeric|min:0',
            'image' => 'nullable|image|max:2048',
            'is_seasonal' => 'boolean',
            'seasons' => 'nullable|array',
            'stock' => 'integer|min:0'
        ]);

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        }

        $product->update($validated);

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ]);
    }
}
