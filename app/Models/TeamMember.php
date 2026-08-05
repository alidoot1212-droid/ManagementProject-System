<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name',
        'mobile',
        'team_code',
        'responsibility',
    ];

    public function teams()
    {
        return $this->belongsToMany(
            Team::class,
            'team_member',
            'team_member_id',
            'team_id'
        );
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'team_member_id');
    }
}
