<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WorkBlockRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        // return [

        //     // کد تیم
        //     'team_id' => [
        //         'required',
        //         'exists:teams,id'
        //     ],

        //     // نام بلوک کار
        //     'name' => [
        //         'required',
        //         'string',
        //         'max:255'
        //     ],

        //     // زمان شروع
        //     'start_date' => [
        //         'required',
        //         'date'
        //     ],

        //     // زمان پایان
        //     'end_date' => [
        //         'required',
        //         'date',
        //         'after_or_equal:start_date'
        //     ],

        //     // کد وضعیت
        //     'status_id' => [
        //         'required',
        //         'exists:statuses,id'
        //     ],

        //     // توضیحات
        //     'description' => [
        //         'nullable',
        //         'string'
        //     ],
        // ];
        return [
            'team_id' => 'sometimes|exists:teams,id',
            'name' => 'sometimes|string',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'status_id' => 'sometimes|exists:statuses,id',
            'description' => 'nullable|string',
        ];
    }
}
