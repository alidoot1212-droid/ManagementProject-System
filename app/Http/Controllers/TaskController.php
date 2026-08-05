<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Http\Request;
use App\Models\WorkBlock;
use App\Models\Status;
use App\Models\Priority;
use App\Models\TeamMember;
use App\Models\Team;

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
            'teamMember',
            'tags'
        ])->get();

        return TaskResource::collection($tasks);
    }
    public function userTasks(int $teamMemberId)
    {
        $tasks = Task::with([
            'workBlock',
            'priority',
            'status',
            'teamMember',
            'tags',
        ])
            ->where('team_member_id', $teamMemberId)
            ->latest()
            ->get();

        return TaskResource::collection($tasks);
    }

    // ایجاد وظیفه
    public function store(TaskRequest $request)
    {

        $data = $request->validated();

        $data['assigned_at'] = now();

        $task = Task::create($data);

        return new TaskResource($task);
    }


    // نمایش یک وظیفه
    public function show(Task $task)
    {
        $task->load([
            'workBlock',
            'priority',
            'status',
            'teamMember',
            'tags'
        ]);

        return new TaskResource($task);
    }


    // ویرایش وظیفه
    public function update(TaskRequest $request, Task $task)
    {
        $data = $request->validated();

        $task->update($data);

        $task->refresh();

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
            'team_member_id' => 'required|exists:team_members,id',
            'due_date' => 'required|date',
        ]);

        $task->update([
            'team_member_id' => $request->team_member_id,
            'assigned_at' => now(),
            'due_date' => $request->due_date,
        ]);

        return new TaskResource($task->load('teamMember'));
    }
    // public function assignUser(
    //     Request $request,
    //     Task $task
    // ) {
    //     dd('reached assignUser');

    //     $request->validate([
    //         'team_member_id' => 'required|exists:team_members,id',
    //         'due_date' => 'required|date',
    //     ]);
    // }

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

    //دکمه تحویل وظیفه
    public function complete(Task $task)
    {
        $task->update([
            'completed_at' => now(),
            'status_id' => 4, // تکمیل شده
        ]);

        return new TaskResource($task->load([
            'workBlock',
            'priority',
            'status',
            'teamMember'
        ]));
    }
    public function upsertData()
    {
        return response()->json([
            'work_blocks' => WorkBlock::select('id', 'name')->get(),

            'statuses' => Status::select('id', 'name')->get(),

            'priorities' => Priority::select('id', 'name')->get(),

            'team_members' => TeamMember::select('id', 'name')->get(),

            'teams' => Team::select('id', 'name')->get(),
        ]);
    }
}
