<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'leader_id' => $this->leader_id,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'members' => $this->whenLoaded('members', function () {
                return $this->members->map(function ($member) {
                    return [
                        'id' => $member->id,
                        'name' => $member->name,
                        'mobile' => $member->mobile,
                        'responsibility' => $member->responsibility,

                        'responsibility_id' =>
                        $member->pivot->responsibility_id ?? null,
                    ];
                });
            }),

            'leader' => $this->whenLoaded('leader', function () {
                if (!$this->leader) {
                    return null;
                }

                return [
                    'id' => $this->leader->id,
                    'name' => $this->leader->name,
                    'mobile' => $this->leader->mobile,
                    'responsibility' => $this->leader->responsibility,
                ];
            }),
        ];
    }
}
