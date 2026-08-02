<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'name',
        'leader_id',
    ];

    public function members()
    {
        return $this->belongsToMany(
            TeamMember::class,
            'team_member',
            'team_id',
            'team_member_id'
        )->withPivot('responsibility_id');
    }

    public function leader()
    {
        return $this->belongsTo(
            TeamMember::class,
            'leader_id'
        );
    }

    public function meetings()
    {
        return $this->hasMany(Meeting::class);
    }
}
