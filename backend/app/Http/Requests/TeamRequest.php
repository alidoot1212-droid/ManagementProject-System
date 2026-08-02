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
            'name' => 'required|string|max:255',
            'member_ids' => 'nullable|array',
            'member_ids.*' => 'exists:team_members,id',
            'leader_id' => 'nullable|exists:team_members,id',
        ];
    }
}
