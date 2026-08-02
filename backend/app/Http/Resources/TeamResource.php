<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class TeamResource extends JsonResource
{

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:teams,code,' . $this->team,
            'room_id' => 'nullable|exists:rooms,id',
            'member_ids' => 'nullable|array',
            'member_ids.*' => 'exists:team_members,id',
            'leader_id' => 'nullable|exists:team_members,id',
        ];
    }
}
