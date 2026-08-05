<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\WorkBlockController;
use App\Http\Controllers\TaskController;


Route::prefix('teams')->controller(TeamController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/store', 'store');
    Route::get('/show/{team}', 'show');
    Route::post('/update/{team}', 'update');
    Route::delete('/destroy/{team}', 'destroy');
    Route::get('/upsert-data', 'upsertData');
});
Route::prefix('work-blocks')->controller(WorkBlockController::class)->group(function () {

    Route::get('/', 'index');

    Route::post('/store', 'store');

    Route::get('/show/{workBlock}', 'show');

    Route::post('/update/{workBlock}', 'update');

    Route::delete('/destroy/{workBlock}', 'destroy');

    // تغییر وضعیت بلوک کار
    Route::post('/change-status/{workBlock}', 'changeStatus');
});
Route::prefix('tasks')->controller(TaskController::class)->group(function () {

    Route::get('/', 'index');

    Route::post('/store', 'store');

    Route::get('/show/{task}', 'show');

    Route::post('/update/{task}', 'update');

    Route::delete('/destroy/{task}', 'destroy');
    Route::get('/upsert-data', 'upsertData');

    // تغییر وضعیت وظیفه
    Route::post('/change-status/{task}', 'changeStatus');

    // تخصیص وظیفه به عضو تیم
    Route::post('/assign-user/{task}', 'assignUser');

    //تحویل وظیفه
    Route::post('/{task}/complete', 'complete');

    // مدیریت تگ‌های وظیفه
    Route::post('/sync-tags/{task}', 'syncTags');

    Route::get('/user/{user}/tasks', 'userTasks');
});
