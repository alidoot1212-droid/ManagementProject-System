<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeamRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'leader_id' => [
                'required',
                'exists:team_members,id',
            ],

            'members' => [
                'required',
                'array',
                'min:1',
            ],

            'members.*.member_id' => [
                'required',
                'exists:team_members,id',
            ],

            'members.*.responsibility_id' => [
                'required',
                'integer',
            ],
        ];
    }
}
