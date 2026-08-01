<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * تبدیل اطلاعات وظیفه به خروجی API
     */
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'work_block' => [
                'id' => $this->workBlock?->id,
                'name' => $this->workBlock?->name,
            ],

            'name' => $this->name,
            'weight' => $this->weight,
            'value' => $this->value,
            'description' => $this->description,
            'priority' => [
                'id' => $this->priority?->id,
                'title' => $this->priority?->title,
            ],

            'status' => [
                'id' => $this->status?->id,
                'title' => $this->status?->title,
            ],

            'team_member_id' => $this->team_member_id,
            'assigned_at' => $this->assigned_at,
            'due_date' => $this->due_date,
            'completed_at' => $this->completed_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            // برچسب
            'tag' => [
                'id' => $this->tag?->id,
                'name' => $this->tag?->name,
                'color_code' => $this->tag?->color_code,
            ],
        ];
    }
}
