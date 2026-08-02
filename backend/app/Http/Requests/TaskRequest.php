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
                'required',
                'exists:work_blocks,id'
            ],

            // نام وظیفه
            'name' => [
                'required',
                'string',
                'max:255'
            ],

            // وزن وظیفه (۱ تا ۵)
            'weight' => [
                'required',
                'integer',
                'between:1,5'
            ],

            // ارزش وظیفه (۱ تا ۵)
            'value' => [
                'required',
                'integer',
                'between:1,5'
            ],

            // توضیحات
            'description' => [
                'nullable',
                'string'
            ],

            // کد اولویت
            'priority_id' => [
                'required',
                'exists:priorities,id'
            ],

            // کد وضعیت
            'status_id' => [
                'required',
                'exists:statuses,id'
            ],

            // کد عضو تیم مسئول
            'user_id' => [
                'required',
                'exists:users,id'
            ],

            // زمان تخصیص
            'assigned_at' => [
                'nullable',
                'date'
            ],

            // موعد تحویل
            'due_date' => [
                'required',
                'date'
            ],

            // زمان تحویل
            'completed_at' => [
                'nullable',
                'date'
            ],
        ];
    }
}
