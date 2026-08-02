<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;

Route::prefix('teams')->controller(TeamController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/store', 'store');
    Route::get('/show/{team}', 'show');
    Route::post('/update/{team}', 'update');
    Route::delete('/destroy/{team}', 'destroy');
    Route::get('/upsert-data', 'upsertData');
});