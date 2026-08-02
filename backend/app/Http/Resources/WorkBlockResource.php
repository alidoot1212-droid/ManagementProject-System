<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use Morilog\Jalali\Jalalian;

class WorkBlockResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [

            // کد بلوک کار
            'id' => $this->id,

            // کد تیم
            'team_id' => $this->team_id,

            // نام بلوک کار
            'name' => $this->name,

            // زمان شروع
            'start_time' => $this->start_time
                ? substr($this->start_time, 0, 5)
                : null,

            // زمان پایان
            'end_time' => $this->end_time
                ? substr($this->end_time, 0, 5)
                : null,


            // کد وضعیت
            'status' => [
                'id' => $this->status?->id,
                'name' => $this->status?->name,
            ],
            // توضیحات
            'description' => $this->description,

            // تاریخ ایجاد
            'created_at' => $this->created_at
                ? Jalalian::fromCarbon($this->created_at)->format('Y/m/d H:i')
                : null,

            // تاریخ بروزرسانی
            'updated_at' => $this->updated_at
                ? Jalalian::fromCarbon($this->updated_at)->format('Y/m/d H:i')
                : null,
        ];
    }
}
