<?php

namespace App\Http\Controllers;

use App\Models\WorkBlock;
use App\Http\Requests\WorkBlockRequest;
use App\Http\Resources\WorkBlockResource;

class WorkBlockController extends Controller
{

    // نمایش لیست بلوک‌های کار
    public function index()
    {
        $workBlocks = WorkBlock::with([
            'team',
            'status'
        ])->get();

        return WorkBlockResource::collection($workBlocks);
    }


    // ایجاد بلوک کار جدید
    public function store(WorkBlockRequest $request)
    {
        $workBlock = WorkBlock::create(
            $request->validated()
        );

        return new WorkBlockResource($workBlock);
    }


    // نمایش یک بلوک کار
    public function show(WorkBlock $workBlock)
    {
        $workBlock->load([
            'team',
            'status'
        ]);

        return new WorkBlockResource($workBlock);
    }


    // ویرایش بلوک کار
    public function update(
        WorkBlockRequest $request,
        WorkBlock $workBlock
    ) {
        $workBlock->update(
            $request->validated()
        );

        return new WorkBlockResource($workBlock);
    }


    // حذف بلوک کار
    public function destroy(WorkBlock $workBlock)
    {
        $workBlock->delete();

        return response()->json([
            'message' => 'بلوک کار با موفقیت حذف شد'
        ]);
    }


    // اکشن تغییر وضعیت بلوک کار
    public function changeStatus(
        WorkBlock $workBlock,
        WorkBlockRequest $request
    ) {
        $workBlock->update([
            'status_id' => $request->status_id
        ]);

        $workBlock->load('status');

        return new WorkBlockResource($workBlock);
    }
}
