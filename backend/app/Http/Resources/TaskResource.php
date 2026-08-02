<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Morilog\Jalali\Jalalian;

class TaskResource extends JsonResource
{
    /**
     * تبدیل اطلاعات وظیفه به خروجی API
     */
    public function toArray(Request $request): array
    {
        return [

            // کد وظیفه
            'id' => $this->id,

            // کد بلوک کار
            'work_block_id' => $this->work_block_id,

            // نام وظیفه
            'name' => $this->name,

            // وزن
            'weight' => $this->weight,

            // ارزش
            'value' => $this->value,

            // توضیحات
            'description' => $this->description,

            // اولویت
            'priority' => [
                'id' => $this->priority?->id,
                'name' => $this->priority?->name,
            ],

            // وضعیت
            'status' => [
                'id' => $this->status?->id,
                'name' => $this->status?->name,
            ],

            // عضو مسئول
            'user' => [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
            ],

            // زمان تخصیص
            'assigned_at' => $this->assigned_at
                ? Jalalian::fromDateTime($this->assigned_at)->format('Y/m/d H:i')
                : null,

            // موعد تحویل
            'due_date' => $this->due_date
                ? Jalalian::fromDateTime($this->due_date)->format('Y/m/d H:i')
                : null,

            // زمان تحویل
            'completed_at' => $this->completed_at
                ? Jalalian::fromDateTime($this->completed_at)->format('Y/m/d H:i')
                : null,

            // برچسب‌ها
            'tags' => $this->tags->map(function ($tag) {
                return [
                    'id' => $tag->id,
                    'name' => $tag->name,
                    'color_code' => $tag->color_code,
                ];
            }),
            // تاریخ‌ها
            'created_at' => $this->created_at
                ? Jalalian::fromCarbon($this->created_at)->format('Y/m/d H:i')
                : null,

            'updated_at' => $this->updated_at
                ? Jalalian::fromCarbon($this->updated_at)->format('Y/m/d H:i')
                : null,

        ];
    }
}
