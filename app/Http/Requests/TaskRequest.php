<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [

            // کد بلوک کار
            'work_block_id' => [
                'sometimes',
                'exists:work_blocks,id'
            ],

            // نام وظیفه
            'name' => [
                'sometimes',
                'string',
                'max:255'
            ],

            // وزن وظیفه
            'weight' => [
                'sometimes',
                'integer',
                'between:1,5'
            ],

            // ارزش وظیفه
            'value' => [
                'sometimes',
                'integer',
                'between:1,5'
            ],

            // توضیحات
            'description' => [
                'sometimes',
                'nullable',
                'string'
            ],

            // کد اولویت
            'priority_id' => [
                'sometimes',
                'exists:priorities,id'
            ],

            // کد وضعیت
            'status_id' => [
                'sometimes',
                'exists:statuses,id'
            ],

            // کد عضو تیم مسئول
            'team_member_id' => [
                'sometimes',
                'exists:team_members,id'
            ],

            // زمان تخصیص
            'assigned_at' => [
                'sometimes',
                'nullable',
                'date'
            ],

            // موعد تحویل
            'due_date' => [
                'sometimes',
                'date'
            ],

            // زمان تحویل
            'completed_at' => [
                'sometimes',
                'nullable',
                'date'
            ],
        ];
    }
}
