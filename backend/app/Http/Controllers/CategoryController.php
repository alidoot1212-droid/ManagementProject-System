<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CategoryRequest;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::latest()->get();
        return CategoryResource::collection($categories);
    }

    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all());
        return new CategoryResource($category);
    }

    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    public function update(CategoryRequest $request, Category $category)
    {
        $category->update($request->all());
        return new CategoryResource($category->fresh());
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(['message' => 'Category deleted']);
    }

    public function changeStatus(Category $category)
    {
        $category->update(['status' => !$category->status]);
        return new CategoryResource($category->fresh());
    }

    public function trash()
    {
        $trashed = Category::onlyTrashed()->get();
        return CategoryResource::collection($trashed);
    }

    public function restore($id)
    {
        $category = Category::onlyTrashed()->findOrFail($id);
        $category->restore();
        return new CategoryResource($category);
    }

    public function forceDelete($id)
    {
        Category::onlyTrashed()->findOrFail($id)->forceDelete();
        return response()->json(['message' => 'Category removed permanently']);
    }
}
