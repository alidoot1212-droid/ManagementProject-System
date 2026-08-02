<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::with([
            'workBlock',
            'priority',
            'status',
            'user',
            'tags'
        ])->get();

        return TaskResource::collection($tasks);
    }

    public function userTasks(int $userId)
    {
        $tasks = Task::with([
            'workBlock',
            'priority',
            'status',
            'user',
            'tags',
        ])
            ->where('user_id', $userId)
            ->latest()
            ->get();

        return TaskResource::collection($tasks);
    }


    // ایجاد وظیفه
    public function store(TaskRequest $request)
    {
        $task = Task::create(
            $request->validated()
        );

        return new TaskResource($task);
    }


    // نمایش یک وظیفه
    public function show(Task $task)
    {
        $task->load([
            'workBlock',
            'priority',
            'status',
            'user',
            'tags'
        ]);

        return new TaskResource($task);
    }


    // ویرایش وظیفه
    public function update(
        TaskRequest $request,
        Task $task
    ) {
        $task->update(
            $request->validated()
        );

        return new TaskResource($task);
    }


    // حذف وظیفه
    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json([
            'message' => 'وظیفه با موفقیت حذف شد'
        ]);
    }


    // تغییر وضعیت وظیفه
    public function changeStatus(
        Request $request,
        Task $task
    ) {
        $request->validate([
            'status_id' => 'required|exists:statuses,id'
        ]);

        $task->update([
            'status_id' => $request->status_id
        ]);

        return new TaskResource($task);
    }


    // تخصیص وظیفه به عضو تیم
    public function assignUser(
        Request $request,
        Task $task
    ) {
        $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        $task->update([
            'user_id' => $request->user_id,
            'assigned_at' => now()
        ]);

        return new TaskResource($task);
    }


    // اتصال تگ‌ها به وظیفه
    public function syncTags(
        Request $request,
        Task $task
    ) {
        $request->validate([
            'tags' => 'array',
            'tags.*' => 'exists:tags,id'
        ]);

        $task->tags()->sync($request->tags);

        return new TaskResource(
            $task->load('tags')
        );
    }
}
